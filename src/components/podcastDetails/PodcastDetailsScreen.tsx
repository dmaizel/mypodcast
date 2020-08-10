import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SearchStackRouteParamsList} from '../../navigators/types';
import feedQuery from '../../graphql/query/feedQuery';
import {
  FeedQuery,
  FeedQueryVariables,
  FeedQuery_feed,
} from '../../types/graphql';
import {useQuery} from '@apollo/react-hooks';
import {getWeekDay, humanDuration} from '../../lib/dateTimeHelpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {usePlayerContext} from '../../contexts/PlayerContext';
import {PlaylistItem} from '../music-player/PlayListItem';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const {data: podcastData} = useRoute<NavigationParams>().params ?? {};

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                paddingHorizontal: 16,
                marginTop: 16,
                marginBottom: 24,
              }}>
              {podcastData.thumbnail && (
                <View style={{marginRight: 10}}>
                  <Image
                    style={styles.thumbnail}
                    source={{uri: podcastData.thumbnail}}
                  />
                </View>
              )}
              <View style={{flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {podcastData.podcastName}
                </Text>
                <Text style={{color: 'grey', fontSize: 12}}>
                  {podcastData.artist}
                </Text>
                <Text style={{color: '#42a5f5', fontSize: 12}}>Subscribed</Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginBottom: 24,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];
                    if (!el) {
                      return;
                    }

                    playerContext.play(
                      new PlaylistItem(
                        el.title,
                        el.linkUrl,
                        el.image ?? podcastData.thumbnail,
                      ),
                    );
                  }}>
                  <FeatherIcon name="play" size={30} color="#42a5f5" />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Play</Text>
                <Text style={{fontSize: 14}}>{data?.feed[0].title}</Text>
              </View>
            </View>
            <View style={{paddingHorizontal: 16, marginBottom: 24}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Episodes</Text>
            </View>

            {loading && (
              <View
                style={{
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#42a5f5" />
              </View>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <View
            style={{width: '100%', paddingHorizontal: 16, marginVertical: 16}}>
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: '#e0e0e0',
              }}
            />
          </View>
        )}
        renderItem={({item}) => (
          <View style={{paddingHorizontal: 16}}>
            <Text style={{fontSize: 12, color: 'grey'}}>
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
            <Text style={{fontSize: 14, color: 'grey'}} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={{fontSize: 14, color: 'grey'}}>
              {humanDuration(item.duration)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.linkUrl}
      />
    </View>
  );
};

export default PodcastDetailsScreen;

const styles = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});
