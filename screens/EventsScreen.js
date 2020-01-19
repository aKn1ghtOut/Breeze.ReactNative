import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

export default function EventsScreen() {

  const [selected, setSelected] = useState(0)
  const [animator] = useState(new Animated.Value(0))

  useEffect(() => {
    if(selected % 2 == 0)
    Animated.timing(
      animator,
      {
        toValue : 1,
        easing : Easing.in,
        duration : 500
      }
    ).start();
    else
    Animated.timing(
      animator,
      {
        toValue : 0,
        easing : Easing.in,
        duration : 500
      }
    ).start();
  }, [selected])

  useEffect(() => {
    const timer = setInterval(() => {
      setSelected(selected => (selected + 1));
    }, 2000);

    return () => clearInterval(timer);
  })

  return (
    <View style={styles.container}>
      <Animated.View style={{
        ...styles.slide,
        left : animator.interpolate({
          inputRange : [0, 1],
          outputRange : [(0 - (selected - 1)%3) * Dimensions.get("window").width, (0 - selected%3) * Dimensions.get("window").width]
        })
      }}>
      </Animated.View>
    </View>
  );
}

EventsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  slide : {
    position : "absolute",
    top : 0,
    left : 0,
    flex : 1,
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height - 50,
    backgroundColor : "#000"
  }
});
