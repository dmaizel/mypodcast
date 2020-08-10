import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const SearchLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#42a5f5" />
    </View>
  );
};

export default SearchLoading;
