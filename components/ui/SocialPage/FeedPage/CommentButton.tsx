import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.commentCount}>{commentCount}</Text>
      <Image 
        source={require("../../../../assets/icons/comment.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  commentCount: {
    fontSize: 8,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    lineHeight: 8,
  },
  icon: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
});

export default CommentButton;