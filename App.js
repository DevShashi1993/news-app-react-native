import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text, View, FlatList } from "react-native";
import NewsCards from "./components/NewsCards";
import Colors from "./constants/Colors";
import env from "./env";

const App = () => {
  const [newsData, setNewsData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const load = async () => {
    try {
      const newsApi = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${env.NEWS_API_KEY}`;
      const response = await fetch(newsApi);
      const responseJson = await response.json();

      if (response.ok) {
        setNewsData(responseJson.articles);
      } else setErrorMessage(responseJson.message);
    } catch (error) {
      console.log("Error", error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const renderItem = ({ item }) => (
    <NewsCards
      srcName={item.source.name}
      author={item.author}
      title={item.title}
      description={item.description}
      urlToImage={item.urlToImage}
      url={item.url}
      publishedAt={item.publishedAt}
    />
  );

  let allNewsCards = (
    <FlatList
      data={newsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.publishedAt}
    />
  );

  let errorMessageComp = (
    <Text style={styles.errMsg}>Error: {errorMessage}</Text>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="default" />
      <View style={styles.header}>
        <Text style={styles.title}>Top Headlines</Text>
      </View>
      {newsData ? allNewsCards : errorMessage && errorMessageComp}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 50,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginTop: 10,
    marginHorizontal: 10,
  },
  errMsg: {
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});

export default App;
