import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import * as React from 'react';
import { useState } from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LandingScreen from '../screens/LandingScreen';
import AppScreen from '../screens/AppScreen';
import { BottomTabParamList, HomeTabParamList, AppTabParamList } from '../types';

import { Entypo } from '@expo/vector-icons';
import { RoomContext
  // , roomToken, setRoomToken
} from '../contexts/RoomContext';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();
  const [roomToken, setRoomToken] = useState<string | undefined>(undefined);

  return (
    <RoomContext.Provider value={{
      roomToken,
      setRoomToken
    }}>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{
            tabBarIcon: Object.assign(
              ({ color }) => <TabBarIcon name="home" color={color} />,
              { displayName: 'TabBarIcon' },
            )
          }}
        />
        <BottomTab.Screen
          name="Video"
          component={AppTabNavigator}
          options={{
            tabBarIcon: Object.assign(
              ({ color }) => <TabBarIcon name="video" color={color} />,
              { displayName: 'TabBarIcon' },
            )
          }}
        />
      </BottomTab.Navigator>
    </RoomContext.Provider>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Entypo>['name']; color: string }) {
  return <Entypo size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator screenOptions={{headerShown: false}}>
      <HomeTabStack.Screen
        name="LandingScreen"
        component={LandingScreen}
      />
    </HomeTabStack.Navigator>
  );
}

const AppTabStack = createStackNavigator<AppTabParamList>();

function AppTabNavigator() {
  return (
    <AppTabStack.Navigator screenOptions={{headerShown: false}}>
      <AppTabStack.Screen
        name="AppScreen"
        component={AppScreen}
      />
    </AppTabStack.Navigator>
  );
}
