import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

interface LikeButtonProps {
  initialLikes: number;
  liked: boolean;
  handleLikePost: () => Promise<void>;
  handleUnlikePost: () => Promise<void>;
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
  initialLikes = 0, 
  liked = false, 
  handleLikePost, 
  handleUnlikePost 
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handlePress = () => {
    if (isLiked) {
      handleUnlikePost();
    } else {
      handleLikePost();
    }
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.likeCount}>{likeCount}</Text>
      <Image
        source={isLiked ? require("@/assets/icons/heartfilled.png") : require("@/assets/icons/newLike.png")}
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
