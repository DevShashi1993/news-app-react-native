import React, { useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} />

const openSrcInBrowser = (url) => {
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const NewsCards = ({srcName, author, title, description, urlToImage, url, publishedAt}) => {
  var d = new Date(publishedAt);
  
  let year = d.getFullYear();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let hours = d.getHours();
  let mins = d.getMinutes();
  let publisgTimeFormated = `${month} ${date}, ${year} - ${hours}:${mins}`;
  return (
    <>
      <Card style={styles.newsCards}>
        <Card.Title
          title={srcName}
          subtitle={publisgTimeFormated}
          left={LeftContent}
        />
        <Card.Cover
          source={{ uri: urlToImage }}
        />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => openSrcInBrowser(url)}>Read Source</Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
    newsCards: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 25
    }
});

export default NewsCards;
