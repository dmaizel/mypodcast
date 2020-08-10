import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PlaylistItem} from '../components/music-player/PlayListItem';
import {AVPlaybackStatus, Audio} from 'expo-av';
import {Playback} from 'expo-av/build/AV';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: PlaylistItem | null;
  play: (track?: PlaylistItem) => void;
  pause: () => void;
}

export const PlayerConext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
});

export const PlayerConextProvider: React.FC = (props) => {
  const [playerState, setPlayerState] = React.useState<null | AVPlaybackStatus>(
    null,
  );
  const [soundObject, setSoundObject] = React.useState<null | Audio.Sound>(
    null,
  );
  const [currentTrack, setCurrentTrack] = React.useState<null | PlaylistItem>(
    null,
  );

  React.useEffect(() => {
    (async () => {
      const playbackObject = await new Audio.Sound();
      setSoundObject(playbackObject);
    })();

    return () => {
      setSoundObject(null);
    };
  }, []);

  const value: PlayerContextType = {
    isPlaying: playerState?.isLoaded ? playerState.isPlaying : false,
    isPaused: playerState?.isLoaded && !playerState.isPlaying ? true : false,
    isStopped: false,
    isEmpty: true,
    currentTrack: currentTrack,
    play: async (track?: PlaylistItem) => {
      if (!track) {
        if (currentTrack) {
          await soundObject?.playAsync();
        }
        return;
      }

      const {sound, status} = await Audio.Sound.createAsync(
        {uri: track?.uri},
        {shouldPlay: true},
        (state: AVPlaybackStatus) => {
          setPlayerState(state);
        },
      );
      setCurrentTrack(track);
      setSoundObject(sound);
      soundObject?.playAsync();
    },
    pause: async () => {
      soundObject?.pauseAsync();
    },
  };

  return (
    <PlayerConext.Provider value={value}>
      {props.children}
    </PlayerConext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerConext);
