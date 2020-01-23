import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Button, TouchableNativeFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures'

import DefaultNavOptions from "../navigation/DefaultNavOptions";

function mod(val, num)
{
  val = val % num;
  if(val < 0)
  val = val + num;
  return val;
}

export default function EventsList(props) {

  const Categories = [
    "Cultural",
    "Technical",
    "Sports"
  ]
  const EventCategory = props.navigation.getParam("category", "Cultural");

  return (
    <View style={styles.container}>
        <Text>{EventCategory}</Text>
    </View>
  );
}

EventsList.navigationOptions = {
  title: "Events",
  ...DefaultNavOptions
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection : "column",
    backgroundColor: '#21212188',
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height - 150,
  },
  buttonRow : {
    flexDirection : "row",
    alignItems : "center",
    height: 50,
    justifyContent : "space-between"
  },
  buttoner : {
    textAlign: "right",
    flexDirection : "column",
    alignItems: "center",
    backgroundColor : "rgba(0,0,0,0.5)",
    padding: 10,
    width : 100
  },
  navButtons : {
  },
  buttonText : {
    fontSize: 15,
    color : "#FFFFFF",
  },
  slide : {
    position : "absolute",
    top : 30,
    left : 0,
    flex : 1,
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height - 150,
    alignItems : "center",
    justifyContent : "center"
  },
  screenText : {
    color : "#FFFFFF", 
    fontSize : 20,
    fontFamily : "just-fist",
    alignSelf : "center"
  }
});
