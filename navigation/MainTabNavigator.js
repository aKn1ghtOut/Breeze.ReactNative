import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ContactScreen from "../screens/ContactScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    cardStyle: {
      backgroundColor : "rgba(0,0,0,0)"
    }
  }
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home'}`
          : 'md-home'
      }
    />
  )
};

HomeStack.path = '';

const EventsStack = createStackNavigator(
  {
    Events: EventsScreen,
  },
  config
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'} />
  ),
};

EventsStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
  },
  config
);

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

ScheduleStack.path = '';

const ContactStack = createStackNavigator(
  {
    Contact: ContactScreen,
  },
  config
);

ContactStack.navigationOptions = {
  tabBarLabel: 'Contact',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

ContactStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EventsStack,
  ScheduleStack,
  ContactStack,
},
{
  initialRouteName : "HomeStack",
  tabBarOptions: {
    style : {
      backgroundColor : "rgba(0,0,0,0.2)",
      paddingTop : 20,
      paddingBottom : 20,
      height : 100,
      borderTopWidth : 0
    },
    tabStyle : {
      backgroundColor : "rgba(0,0,0,0)",
      borderTopWidth : 0
    },
    labelStyle : {
      fontWeight : "700",
      color: "white"
    }
  }
}
);

tabNavigator.path = '';

export default tabNavigator;
