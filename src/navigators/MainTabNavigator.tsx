import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EpisodeDetailsScreen from '../components/episodeDetails/EpisodeDetailsScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import MiniPlayer from '../components/miniPlayer/MiniPlayer';
import PodcastDetailsScreen from '../components/podcastDetails/PodcastDetailsScreen';
import SearchScreen from '../components/search/SearchScreen';


const ListenNowStack = createStackNavigator();
const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <ListenNowStack.Screen
        name="ListenNow"
        component={ListenNowScreen}
        options={{
          title: 'Listen Now',
        }}
      />
    </ListenNowStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();
const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

const PodcastStack = createStackNavigator()

const PodcastStackNavigator = () => {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen
        name='PodcastDetails'
        component={PodcastDetailsScreen}
      />
      <PodcastStack.Screen
        name='EpisodeDetails'
        component={EpisodeDetailsScreen}
      />
    </PodcastStack.Navigator>
  )
}

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#42a5f5',
        headerTitleStyle: { color: 'black' },
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="PodcastDetails"
        component={PodcastStackNavigator}
        options={{ headerTitle: '' }}
      />
    </SearchStack.Navigator>
  );
};

const ICON_SIZE = 24;

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={(tabsProps) => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}
      tabBarOptions={{
        activeTintColor: '#42a5f5',
        labelStyle: { padding: 8 },
        keyboardHidesTabBar: true,
        style: {
          //   backgroundColor: '#f7f7f7',
          height: 55,
        },
      }}>
      <MainTab.Screen
        name="ListenNow"
        component={ListenNowStackNavigator}
        options={{
          title: 'Listen Now',
          tabBarIcon: (props) => (
            <FeatherIcon
              color={props.color}
              name="headphones"
              size={ICON_SIZE}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon
              color={props.color}
              name="search"
              size={ICON_SIZE}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon
              color={props.color}
              name="inbox"
              size={ICON_SIZE}
              style={{ marginTop: 10 }}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
