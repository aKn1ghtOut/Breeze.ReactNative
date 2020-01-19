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

import Animated, { Easing } from 'react-native-reanimated';

import Colors from "../constants/Colors"

export default function HomeScreen() {

  const [LogoRotate] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(
      LogoRotate,
      {
        toValue : 1,
        time : 1200,
        easing : Easing.in
      }
    ).start();
  });

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={null}/>
        }
      >
        <Animated.View
          style={styles.LogoContainer} //Make The Animations work
        >
          <Image 
            style={styles.BreezeLogo}
            source={require("../assets/images/Logo.png")}
          />
        </Animated.View>
        <Text style={{
          fontFamily : "justfist",
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
