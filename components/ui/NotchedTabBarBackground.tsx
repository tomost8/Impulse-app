import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, ClipPath, Rect, Circle } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

export default function NotchedTabBarBackground() {
  const tabBarHeight = 84; // Total height including safe area
  const notchRadius = 35; // Radius of the semi-circle cutout
  const notchCenterX = screenWidth / 2; // Center of the screen
  const notchTop = 10; // How far down from the top the notch starts
  
  // Create the path for the tab bar with downward semi-circle dip
  const pathData = `
    M 0 0
    L ${screenWidth} 0
    L ${screenWidth} ${tabBarHeight}
    L ${notchCenterX + notchRadius} ${tabBarHeight}
    A ${notchRadius} ${notchRadius} 0 0 0 ${notchCenterX - notchRadius} ${tabBarHeight}
    L 0 ${tabBarHeight}
    Z
  `;

  return (
    <View style={styles.container}>
      <Svg height={tabBarHeight} width={screenWidth} style={StyleSheet.absoluteFillObject}>
        {/* Simple straight tab bar */}
        <Rect
          x={0}
          y={0}
          width={screenWidth}
          height={tabBarHeight}
          fill="rgba(255, 255, 255, 0.95)"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="1"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
  },
});
