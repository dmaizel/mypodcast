import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchQuery_search } from '../../types/graphql';

interface Props {
  item: SearchQuery_search;
}

const SearchTile: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}>
      <View
        style={{
          height: 70,
          width: 70,
          borderRadius: 10,
          backgroundColor: '#42a5f5',
          marginRight: 10,
        }}>
        {props.item.thumbnail && (
          <Image source={{ uri: props.item.thumbnail }} style={styles.img} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>
          {props.item.podcastName}
        </Text>
        <Text style={{ fontSize: 12, color: 'grey' }}>{props.item.artist}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PodcastDetails', { screen: 'PodcastDetails', params: { data: props.item } });
          }}>
          <Text style={{ fontSize: 12, color: '#42a5f5' }}>
            {props.item.episodesCount} episodes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchTile;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
