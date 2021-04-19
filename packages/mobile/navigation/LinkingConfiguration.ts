import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              LandingScreen: 'home',
            },
          },
          Video: {
            screens: {
              AppScreen: 'video',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
