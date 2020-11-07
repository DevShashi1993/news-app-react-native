import React from "react";
import { Animated, Dimensions, StyleSheet, View, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} />;

const openSrcInBrowser = (url) => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

const { width } = Dimensions.get("window");
// const ratio = 228 / 362; //  actual height / actual width
const ratio = 500 / 362; //  actual height / actual width
const CARD_WIDTH = width * 0.95; // width is equal to 95% of the screen
const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;

const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight;

const EachCard = ({
  srcName,
  author,
  title,
  description,
  urlToImage,
  url,
  publishedAt,
}) => {
  var d = new Date(publishedAt);

  let year = d.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let hours = d.getHours();
  let mins = d.getMinutes();
  let publisgTimeFormated = `${month} ${date}, ${year} - ${hours}:${mins}`;
  return (
    <>
    <View style={styles.card}>
      <Card style={styles.newsCards}>
        <Card.Title
          title={srcName}
          subtitle={publisgTimeFormated}
          left={LeftContent}
        />
        <Card.Cover source={{ uri: urlToImage }} />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => openSrcInBrowser(url)}>Read Source</Button>
        </Card.Actions>
      </Card>
      </View>
    </>
  );
};

const NewsCard = ({ y, index, item }) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[
        styles.cardlist,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
      key={index}
    >
      <EachCard
        srcName={item.source.name}
        author={item.author}
        title={item.title}
        description={item.description}
        urlToImage={item.urlToImage}
        url={item.url}
        publishedAt={item.publishedAt}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: DEFAULT_CARD_HEIGHT,
    borderRadius: 15,
  },
  cardlist: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },
  newsCards: {
    borderRadius: 25,
  },
});

export default NewsCard;
