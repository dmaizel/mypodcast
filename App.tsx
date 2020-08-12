import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import TrackPlayer from 'react-native-track-player';

import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/graphql/client';
import { PlayerConextProvider } from './src/contexts/PlayerContext';

const track = {
  id: '1',
  url:
    'https://cdn.simplecast.com/audio/05bd32/05bd32de-6cd4-40f6-b3bd-0bdf6750dd58/9b70bc7c-6bcc-48e7-8265-90089d7a1ed3/141_tc.mp3?aid=rss_feed',
  title: '141: Jason Fried - Running the Tailwind Business on Basecamp',
  artist: 'Full Stack Radio',
};

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('Player is setup')
        TrackPlayer.updateOptions({
          capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          ],
          jumpInterval: 30
        })
        setIsReady(true)
      }).catch(err => console.log('Error setting-up the Player: ', err))
    })()
  }, [])

  return (
    <ApolloProvider client={client}>
      {isReady ? (
        <PlayerConextProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </PlayerConextProvider>
      ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
        )}
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
