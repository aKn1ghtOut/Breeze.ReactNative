import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import EventsScreen from '../screens/EventsScreen';
import EventPage from "../screens/SpokenWordsPoetry";
import EventsList from '../screens/Cultural'

import ScheduleScreen from '../screens/ScheduleScreen';
import ContactScreen from "../screens/ContactScreen";
import SponsorScreen from "../screens/SponsorScreen"

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
      focusedColor="#ECBA09"
    />
  ),
  labelStyle: ({focused}) => ({
    color: focused ? "#ECBA09" : "white"
  })
};

HomeStack.path = '';

const MoreStack = createStackNavigator(
  {
    Events: EventsScreen,
    EventPage: EventPage,
    EventsList: EventsList
  },
  config
);

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'}
      focusedColor="#ECBA09"
    />
  ),
  labelStyle: ({focused}) => ({
    color: focused ? "#ECBA09" : "white"
  }),
  initialRouteName : "Events"
};

MoreStack.path = '';

const ScheduleStack = createStackNavigator(
  {
    Schedule: ScheduleScreen,
  },
  config
);

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} focusedColor="#ECBA09" />
  ),
  labelStyle: ({focused}) => ({
    fontWeight : "700",
    color: focused ? "#ECBA09" : "white"
  })
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
    <TabBarIcon focusedColor="#ECBA09" focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
  labelStyle: ({focused}) => ({
    fontWeight : "700",
    color: focused ? "#E22028" : "white"
  })
};

ContactStack.path = '';

const SponsorStack = createStackNavigator(
  {
    Sponsor: SponsorScreen,
  },
  config
);

SponsorStack.navigationOptions = {
  tabBarLabel: 'Sponsors',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focusedColor="#ECBA09" focused={focused} name={'ios-heart'} />
  ),
  initialRouteName : "Sponsor",
  labelStyle: ({focused}) => ({
    fontWeight : "700",
    color: focused ? "#E22028" : "white"
  }),
};

SponsorStack.path = '';


const tabNavigator = createBottomTabNavigator({
  ScheduleStack,
  ContactStack,
  HomeStack,
  SponsorStack,
  MoreStack
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
    labelStyle: {
      fontWeight : "700",
      color:  "white"
    }
  }
}
);

tabNavigator.path = '';

export default tabNavigator;
