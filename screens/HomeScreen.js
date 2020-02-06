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

  const [LogoRotate] = useState(new Animated.Value(0));
  const [MarginV] = useState(new Animated.Value(0));
  const [NewsItems, setNewsItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const reloadNews = async() => {
    try{
      setRefreshing(true);
      const res = await fetch("https://spreadsheets.google.com/feeds/cells/1si3-h4Vsmitn4Yh_lU7owfVJFNQTHmyIb3n92q8Sh4k/1/public/values?alt=json");
      const resp = await res.json();
      const values = resp.feed.entry;
      const rows = values.reduce((accumulator, val) => {
        if(!Array.isArray(accumulator))
        accumulator = [[accumulator]];
        let index = accumulator.length - 1;
        if(accumulator[index].length == 5)
        {
          accumulator.push([]);
          index++;
        }
        accumulator[index].push(val);
        return accumulator;
      });

      if(rows.length == 0)
      {
        setNewsItems("No News")
        return;
      }

      setNewsItems(rows);
      setRefreshing(false);
    }
    catch(e)
    {
      //console.log(e);
      setRefreshing(false);
      setNewsItems("Couldn't retreive news")
    }
  }

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
    {
      start()
      reloadNews()
    }
  }, [props.isFocused]);

  const degrees = Animated.concat(LogoRotate, "deg")

  const news = Array.isArray(NewsItems) && NewsItems.slice(1).map((newsItem, index) => (
      <View style={styles.darkBG} key={"News" + index}>
        <View style={styles.innerView}>
          <Text style={{...styles.teamName}}>
            {newsItem[1].content["$t"]}
          </Text>
          <Text style={styles.inBetween}>
            vs
          </Text>
          <Text style={{...styles.teamName}}>
            {newsItem[2].content["$t"]}
          </Text>
        </View>
        <Text style={styles.eventName}>
          {newsItem[0].content["$t"]}
        </Text>
        <View style={styles.innerView}>
          <Text style={{...styles.teamName}}>
            {newsItem[3].content["$t"]}
          </Text>
          <Text style={styles.inBetween}>
            -
          </Text>
          <Text style={{...styles.teamName}}>
            {newsItem[4].content["$t"]}
          </Text>
        </View>
      </View>
    )
  );
  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroller}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadNews}/>
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
          GULLY SPORTS
        </Text>
          {news}
          <View style={{marginBottom: 120}}/>
         
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
    backgroundColor : "rgba(0,0,0,0)",
    paddingTop: 40
  },
  scroller: {
    paddingBottom: 120
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
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    flexWrap: "wrap",
    flexShrink: 1
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
    fontSize: 20,
    textAlign: "center"
  }
});


export default connect(null, {home_bg})(withNavigationFocus(HomeScreen));