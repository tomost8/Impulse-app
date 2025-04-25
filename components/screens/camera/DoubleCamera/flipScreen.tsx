import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

interface FlipScreenProps {
  imageSource?: string; // Optional prop to allow different images
}

const FlipScreen: React.FC<FlipScreenProps> = ({ imageSource = require('@/assets/images/testPost.png') }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={imageSource} 
        style={styles.backgroundImage}
      >
        <BlurView
          intensity={80}
          tint="dark"
          style={styles.blurContainer}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Hold still and smile :)</Text>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Additional overlay for darker effect
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default FlipScreen;
