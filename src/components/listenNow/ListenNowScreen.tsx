import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ListenNowScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Listen Now</Text>
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

export default ListenNowScreen;
