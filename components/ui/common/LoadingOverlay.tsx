import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  color?: string;
  size?: 'small' | 'large';
  top?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  visible, 
  color = '#DE728D', 
  size = 'large',
  top = 0
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.overlay, { top }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoadingOverlay;
