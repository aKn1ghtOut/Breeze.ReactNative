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
import { connect } from 'react-redux';

import {home_bg} from "../redux/actions/UI"

const pWrapper = (method) => {
  return new Promise(resolve => method(resolve));
}

function HomeScreen(props) {

  const [LogoRotate] = useState(new Animated.Value(0))
  const [MarginV] = useState(new Animated.Value(0))

  const start = async() =>{
    props.home_bg();
    await pWrapper((resolve) =>
      Animated.timing(
        LogoRotate,
        {
          toValue : 60,
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
    {
      MarginV.setValue(0);
    }
    else
    start()
  }, [props.isFocused]);

  const degrees = Animated.concat(LogoRotate, "deg")

  const news = 
    (
      <View style={styles.darkBG}>
        <View style={styles.innerView}>
          <Text style={{...styles.teamName}}>
            TEAM 1
          </Text>
          <Text style={styles.inBetween}>
            vs
          </Text>
          <Text style={{...styles.teamName}}>
            TEAM 2
          </Text>
        </View>
        <Text style={styles.eventName}>
          Football
        </Text>
        <View style={styles.innerView}>
          <Text style={{...styles.teamName}}>
            1
          </Text>
          <Text style={styles.inBetween}>
            -
          </Text>
          <Text style={{...styles.teamName}}>
            2
          </Text>
        </View>
      </View>
    )
  

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

        <ScrollView>
          {news}
        </ScrollView>
         
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
  },
  darkBG: {
    backgroundColor: "rgba(25, 25, 25, 0.95)",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    margin: 10
  },
  innerView: {
    flexDirection: "row",
    justifyContent: "center"
  },
  teamName: {
    color: "#41f988",
    fontFamily: "axiforma-bold",
    fontSize: 25,
    textAlign: "center",
    margin: 10
  },
  inBetween: {
    color: Colors.gullyRed,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "axiforma-bold",
    margin: 10
  },
  eventName: {
    fontFamily: "just-fist",
    color: Colors.gullyOrange,
    fontSize: 40,
    textAlign: "center"
  }
});


export default connect(null, {home_bg})(withNavigationFocus(HomeScreen));