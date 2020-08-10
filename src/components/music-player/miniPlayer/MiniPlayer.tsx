import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {usePlayerContext} from '../../../contexts/PlayerContext';
import Icon from 'react-native-vector-icons/Feather';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (!playerContext.currentTrack) {
    return null;
  }

  return (
    <View
      style={{
        height: 75,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: '#42a5f5',
            marginRight: 10,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: playerContext.currentTrack.image}}
            style={{flex: 1}}
          />
        </View>
        <View style={{flex: 1, marginRight: 20}}>
          <Text>{playerContext.currentTrack.title}</Text>
        </View>
        <View>
          {playerContext.isPaused && (
            <TouchableOpacity
              onPress={() => {
                playerContext.play();
              }}>
              <Icon name="play" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isPlaying && (
            <TouchableOpacity
              onPress={() => {
                playerContext.pause();
              }}>
              <Icon name="pause" size={30} />
            </TouchableOpacity>
          )}

          {playerContext.isStopped && (
            <TouchableOpacity onPress={() => null}>
              <Icon name="square" size={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({});
