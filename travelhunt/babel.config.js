module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],  // Ensure this is correct
    plugins: [
      'react-native-reanimated/plugin',  // React Native Reanimated plugin
      [
        'module:react-native-dotenv',  // dotenv plugin
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
