import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

export default function TabBarIcon(props) {

  var [sizer] = useState(new Animated.Value(0))

  useEffect(() => {
    if(props.focused)
    Animated.timing(
      sizer,
      {
        toValue: 1,
        time: 500,
        easing: Easing.in
      }
    ).start()
    else
    Animated.timing(
      sizer,
      {
        toValue: 0,
        time: 500,
        easing: Easing.in
      }
    ).start()
  }, [props.focused])

  return (
    <Animated.View
    >
      <Ionicons
        name={props.name}
        size={ props.focused ? 30 : 26 }
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    </Animated.View>
  );
}