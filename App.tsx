import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import TrackPlayer from 'react-native-track-player';

import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './src/graphql/client';
import {Audio} from 'expo-av';
import {PlayerConextProvider} from './src/contexts/PlayerContext';

export default function App() {
  // useEffect(() => {
  //   (async () => {
  //     const {sound, status} = await Audio.Sound.createAsync(
  //       {
  //         uri: 'http://traffic.libsyn.com/joeroganexp/p1520.mp3?dest-id=19997',
  //       },
  //       {shouldPlay: true},
  //     );
  //     try {
  //       await sound.playAsync();
  //       setTimeout(() => {
  //         sound.pauseAsync();
  //       }, 2000);
  //       // Your sound is playing!
  //     } catch (error) {
  //       // An error occurred!
  //     }
  //   })();
  // }, []);

  return (
    <ApolloProvider client={client}>
      <PlayerConextProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </PlayerConextProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
