import { useQuery } from '@apollo/react-hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator, FlatList,
  Image, StyleSheet,
  Text,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { usePlayerContext } from '../../contexts/PlayerContext';
import feedQuery from '../../graphql/query/feedQuery';
import { getWeekDay, humanDuration } from '../../lib/dateTimeHelpers';
import { SearchStackRouteParamsList } from '../../navigators/types';
import {
  FeedQuery,
  FeedQueryVariables
} from '../../types/graphql';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const { data: podcastData } = useRoute<NavigationParams>().params ?? {};
  const navigation = useNavigation()

  const { data, loading } = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: podcastData.thumbnail }}
                  />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {podcastData.podcastName}
                </Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>
                  {podcastData.artist}
                </Text>
                <Text style={{ color: '#42a5f5', fontSize: 12 }}>Subscribed</Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginBottom: 24,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];
                    if (!el) {
                      return;
                    }

                    playerContext.play({
                      title: el.title,
                      artwork: el.image ?? podcastData.thumbnail,
                      id: el.linkUrl,
                      url: el.linkUrl,
                      artist: podcastData.artist
                    });
                  }}>
                  <FeatherIcon name="play" size={30} color="#42a5f5" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Play</Text>
                <Text style={{ fontSize: 14 }}>{data?.feed[0].title}</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Episodes</Text>
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
            style={{ width: '100%', paddingHorizontal: 16, marginVertical: 16 }}>
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: '#e0e0e0',
              }}
            />
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 12, color: 'grey' }}>
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EpisodeDetails', { episode: item, podcast: podcastData })}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, color: 'grey' }} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>
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
