import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';

import {withNavigationFocus} from "react-navigation"

import Animated, { Easing } from 'react-native-reanimated';

import Colors from "../constants/Colors"
import { startAsync } from 'expo/build/AR';

const pWrapper = (method) => {
  return new Promise(resolve => method(resolve));
}

function HomeScreen(props) {

  const [LogoRotate] = useState(new Animated.Value(0))
  const [MarginV] = useState(new Animated.Value(0))

  console.log(props);

  const start = async() =>{
    await pWrapper((resolve) =>
      Animated.timing(
        LogoRotate,
        {
          toValue : -60,
          duration : 300,
          easing : Easing.in
        }
      ).start(() => resolve())
    )
    await pWrapper((resolve) =>
      Animated.timing(
        LogoRotate,
        {
          toValue : 0,
          duration : 300,
          easing : Easing.in
        }
      ).start(() => resolve())
    )
    await pWrapper((resolve) =>
      Animated.timing(
        MarginV,
        {
          toValue : 1,
          duration : 500,
          easing : Easing.in
        }
      ).start(() => resolve())
    )
  }

  useEffect(() => {
    if(!props.isFocused)
    return;
    start()
  }, [props.isFocused]);

  const degrees = Animated.concat(LogoRotate, "deg")

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={null}/>
        }
      >
        <Animated.View
          style={{
            ...styles.LogoContainer,
            transform: [{
              rotate: degrees
            }],
            marginVertical: MarginV.interpolate({
              inputRange: [0, 1],
              outputRange : [100, 30]
            })
          }} //Make The Animations work
        >
          <Image 
            style={styles.BreezeLogo}
            source={require("../assets/images/Logo.png")}
          />
        </Animated.View>
        <Text style={{
          fontFamily : "just-fist",
          fontSize : 30,
          color : Colors.gullyOrange,
          letterSpacing : 4,
          textShadowColor : "#000000",
          textShadowRadius : 10,
          textAlign : "center",
          textShadowOffset : {
            width : 0,
            height : 0
          }
        }}>
          GULLY NEWS
        </Text>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "rgba(0,0,0,0)"
  },
  BreezeLogo : {
    width: 300,
    resizeMode : "contain",
    height: 250
  },
  LogoContainer : {
    alignItems : "center",
    backgroundColor : "rgba(0,0,0,0)"
  },
  contentContainer : {
    backgroundColor : "rgba(0,0,0,0)"
  }
});


export default withNavigationFocus(HomeScreen)