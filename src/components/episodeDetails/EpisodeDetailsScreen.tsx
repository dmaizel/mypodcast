import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {usePlayerContext} from '../../contexts/PlayerContext';
import {humanDuration} from '../../lib/dateTimeHelpers';
import {FeedQuery_feed, SearchQuery_search} from '../../types/graphql';

const EpisodeDetailsScreen = () => {
  const PlayerConext = usePlayerContext();

  const routeParams = (useRoute().params ?? {}) as {
    episode: FeedQuery_feed;
    podcast: SearchQuery_search;
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 10,
                overflow: 'hidden',
                marginRight: 10,
              }}>
              <Image
                style={{flex: 1}}
                source={{
                  uri:
                    routeParams.episode.image ?? routeParams.podcast.thumbnail,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                {routeParams.episode.title}
              </Text>
            </View>
            <View style={{width: 50}} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                PlayerConext.play({
                  title: routeParams.episode.title,
                  artwork:
                    routeParams.episode.image ?? routeParams.podcast.thumbnail,
                  id: routeParams.episode.linkUrl,
                  url: routeParams.episode.linkUrl,
                  artist: routeParams.podcast.artist,
                });
              }}>
              <FeatherIcon name="play" size={30} color="#42a5f5" />
            </TouchableOpacity>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Play</Text>
              <Text style={{color: 'grey', fontSize: 12}}>
                {humanDuration(routeParams.episode.duration)}
              </Text>
            </View>
          </View>
          <View
            style={{backgroundColor: '#eeeeee', height: 1, marginBottom: 16}}
          />
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Episode Notes
            </Text>
            <Text>{routeParams.episode.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EpisodeDetailsScreen;

const styles = StyleSheet.create({});
