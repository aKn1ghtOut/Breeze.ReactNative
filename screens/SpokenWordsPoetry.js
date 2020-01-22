import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Button, TouchableNativeFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function mod(val, num)
{
  val = val % num;
  if(val < 0)
  val = val + num;
  return val;
}

function EventSingularPage(props)
{
  const [animator] = useState(new Animated.Value(0))

  useEffect(() => {
    if(props.selected)
    Animated.timing(
      animator,
      {
        toValue : 0,
        easing : Easing.in,
        duration : 500
      }
    ).start();
    else
    Animated.timing(
      animator,
      {
        toValue : 1,
        easing : Easing.in,
        duration : 500
      }
    ).start()
  }, [props.selected])

  return (
    <Animated.View
     {...props}
     style={{
      ...styles.slide,
      left : animator.interpolate({
        inputRange : [0, 1],
        outputRange : [0, Dimensions.get("window").width]
      }),
      opacity : animator.interpolate({
        inputRange : [0, 1],
        outputRange : [1, 0]
      })
    }}/>
  );
}

export default function EventPage(props) {

  const [selected, setSelected] = useState(0)
  var key = 0;

  const Categories = [
    "Cultural",
    "Technical",
    "Sports"
  ]

  var timer = null;

  useEffect(() => {
    timer = setInterval(() => {
      setSelected(selected => mod((selected + 1), 3));
    }, 5000);

    return () => clearInterval(timer);
  }, [key])

  const goBack = () => {
    setSelected(selected => mod((selected - 1), 3));
  }

  const goNext = () => {
    setSelected(selected => mod((selected + 1), 3));
  }

  const openSpoken1 = () => {
      props.navigation.navigate("EventsPage");
  }


  return (
    <View style={{flexDirection : "column"}}>
      
    </View>
  );
}

EventPage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection : "column",
    backgroundColor: 'rgba(0,0,0,0)',
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
