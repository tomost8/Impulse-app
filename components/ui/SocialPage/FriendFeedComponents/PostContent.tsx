import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface PostContentProps {
  imageUrl?: string; // Optional, for dynamic images later
  caption: string;
}

const PostContent: React.FC<PostContentProps> = ({ imageUrl, caption }) => {
  return (
    <View style={styles.container}>
      {/* Post Image - Uses user-uploaded image if available, otherwise falls back to feedpost.png */}
      <Image
        source={imageUrl ? { uri: imageUrl } : require("../assets/images/feedpost.png")}
        style={styles.image}
      />
      
      {/* Caption */}
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  caption: {
    fontSize: 14,
    color: "#5E6676",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default PostContent;