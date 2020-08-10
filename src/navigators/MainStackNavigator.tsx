import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';

const MainSack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainSack.Navigator headerMode="none">
      <MainSack.Screen name="Tabs" component={MainTabNavigator} />
    </MainSack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
