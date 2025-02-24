import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CommentButtonProps {
  initialComments?: number;
}

const CommentButton: React.FC<CommentButtonProps> = ({ initialComments = 0 }) => {
  const [commentCount, setCommentCount] = useState(initialComments);

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.commentCount}>{commentCount}</Text>
      <MaterialCommunityIcons name="comment-outline" size={20} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
});

export default CommentButton;
