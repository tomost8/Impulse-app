const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

//testing stack overflow fix
defaultConfig.resolver.unstable_enablePackageExports = false;

// Ensure SVGs are properly recognized
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  // Add resolver for Firebase ES modules
  resolverMainFields: ['react-native', 'browser', 'main'],
  platforms: ['ios', 'android', 'native', 'web'],
  // Add alias for Firebase ES modules
  alias: {
    '@react-native-firebase/app/lib/common': '@react-native-firebase/app/lib/common/index.js',
  },
};

module.exports = defaultConfig;

