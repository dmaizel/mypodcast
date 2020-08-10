import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Library Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LibraryScreen;
