module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'node:events': require.resolve('events'), // Bu satırı ekleyin
        },
      },
    ],
  ],
};
