import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ContentProps {
  caption?: string;
  image?: string;
}

const Content: React.FC<ContentProps> = ({ 
  caption = "Lorem ipsum dolor sit amet consectetur. Ultricies diam aenean vestibulum sit nam quis quis dolor eu.",
  image 
}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={image ? { uri: image } : require("@/assets/images/feedpost.png")}
        style={styles.image}
      />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    alignSelf: 'stretch',
  },
  image: {
    width: 390,
    height: 601,
    resizeMode: 'cover',
  },
  caption: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    alignSelf: 'stretch',
  },
});

export default Content;
