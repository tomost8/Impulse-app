import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

interface CommentButtonProps {
  initialComments?: number;
  onPress?: () => void;
}

const CommentButton: React.FC<CommentButtonProps> = ({ 
  initialComments = 0,
  onPress 
}) => {
  const [commentCount, setCommentCount] = useState(initialComments);

  return (
    <View style={styles.container}>
      <Text style={styles.commentCount}>{commentCount}</Text>
      <Image 
        source={require("@/assets/icons/comment.png")}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  commentCount: {
    fontSize: 12,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default CommentButton;