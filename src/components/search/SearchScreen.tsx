import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useLazyQuery} from '@apollo/react-hooks';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';
import SearchEmpty from './SearchEmpty';
import SearchTile from './SearchTile';
import SearchLoading from './SearchLoading';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          width: '100%',
          paddingHorizontal: 16,
          marginVertical: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            backgroundColor: '#eeeeee',
            borderRadius: 10,
            paddingHorizontal: 16,
          }}>
          <View style={{marginRight: 10}}>
            <FeatherIcon name="search" size={20} color="#757575" />
          </View>
          <TextInput
            onChangeText={setTerm}
            autoCorrect={false}
            onSubmitEditing={onSearch}
            value={term}
            placeholder="Search Podcast"
            style={styles.input}
            selectionColor="#42a5f5"
          />
        </View>
      </View>

      {error ? (
        <View style={{flex: 1, ...styles.centered}}>
          <Text style={{color: 'red', fontSize: 16}}>{error.message}</Text>
        </View>
      ) : (
        <FlatList<SearchQuery_search>
          // keyboardDismissMode="interactive"
          scrollEnabled={true}
          contentContainerStyle={styles.listContentContainer}
          data={data?.search ?? []}
          ListHeaderComponent={<>{loading && <SearchLoading />}</>}
          ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
          renderItem={({item}) => <SearchTile item={item} />}
          keyExtractor={(item) => String(item.feedUrl)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'left',
    // margin: 15,
    fontSize: 18,
  },
  listContentContainer: {
    // minHeight: '100%',
    // flex: 1,
    paddingBottom: 90,
  },
});

export default SearchScreen;
