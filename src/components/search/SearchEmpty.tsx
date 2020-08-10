import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 550,
      }}>
      <Text style={{color: 'grey', fontSize: 16}}>
        No Podcasts, please search something...
      </Text>
    </View>
  );
};

export default SearchEmpty;

const styles = StyleSheet.create({});
