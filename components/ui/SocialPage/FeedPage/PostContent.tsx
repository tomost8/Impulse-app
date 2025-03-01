import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface PostContentProps {
  imageUrl?: string;
  caption: string;
}

const PostContent: React.FC<PostContentProps> = ({ imageUrl, caption }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 7,
  },
  image: {
    width: "100%",
    height: 239,
    borderRadius: 5,
  },
  caption: {
    fontSize: 12,
    fontFamily: "Lato",
    color: "#5E6676",
    lineHeight: 17,
  },
});

export default PostContent;