import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface LikeButtonProps {
  initialLikes?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 67 }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handlePress = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.likeCount}>{likeCount}</Text>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={20}
        color={liked ? "#FF0000" : "#000"} // ✅ Changes to red when liked
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
  likeCount: {
    fontSize: 8,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#000",
    textAlign: "center",
    lineHeight: 8,
  },
  icon: {
    width: 21,
    height: 21,
  },
});

export default LikeButton;
