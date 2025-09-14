import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, ImageSourcePropType } from 'react-native';

interface ProfilePictureWithLoadingProps {
  source: { uri: string } | ImageSourcePropType;
  size?: number;
  style?: any;
}

const ProfilePictureWithLoading: React.FC<ProfilePictureWithLoadingProps> = ({
  source,
  size = 48,
  style,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.container, imageStyle, style]}>
      {loading && (
        <View style={[styles.loadingContainer, imageStyle]}>
          <ActivityIndicator size="small" color="#DE728D" />
        </View>
      )}
      
      <Image
        source={source}
        style={[imageStyle, { opacity: loading ? 0 : 1 }]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        resizeMode="cover"
      />
      
      {error && (
        <View style={[styles.errorContainer, imageStyle]}>
          <Image
            source={require('@/assets/images/profilepicturecircle.png')}
            style={imageStyle}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
});

export default ProfilePictureWithLoading;
