import { Platform } from 'react-native';
import { configureFonts, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// 自定义颜色
const colors = {
  primaryLight: '#E0EDFD',
  secondaryLight: '#E7EDF6',
  primaryPink: '#DE728D',
  secondaryPink: '#F0D4DB',
  text: '#242020',
};

// 按照官方文档的格式定义字体配置
const fontConfig = {
  // 可以定义自定义变体
  headlineLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
    fontSize: 28,
  },
  titleLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 22,
  },
  // 可以添加更多变体...
};

// 创建自定义主题
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  // 按照官方文档的方式配置字体
  fonts: configureFonts({config: fontConfig}),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({config: fontConfig}),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...colors,
  },
  fonts: configureFonts({config: fontConfig}),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

// 导出类型
export type AppTheme = typeof theme; 

// Default export to satisfy Expo Router requirements
export default theme; 