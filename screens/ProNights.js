import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableNativeFeedback,
  Image
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-navigation";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import Colors from "../constants/Colors";
import { withNavigationFocus } from "react-navigation";


function mod(val, num) {
   // console.log(val + "--" + num)
  val = val % num;
  if (val < 0) val = val + num;
 // console.log(val)
  return val;
}

function ProNightEventView(props) {
  const [animator] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(0));

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!selected) {
      if (props.position !== 1) {
        animator.setValue(props.position);
      } else {
        setSelected(true);

        Animated.timing(animator, {
          toValue: 1,
          easing: Easing.in,
          duration: 500
        }).start();
        Animated.timing(opacity, {
          toValue: 1,
          easing: Easing.in,
          duration: 500
        }).start();
      }
    } else {
      setSelected(false);

      Animated.timing(animator, {
        toValue: props.position,
        easing: Easing.in,
        duration: 500
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        easing: Easing.in,
        duration: 500
      }).start();
    }
  }, [props.position]);

  return (
    <Animated.View
      {...props}
      style={{
        ...styles.slide,
        left: animator.interpolate({
          inputRange: [0, 2],
          outputRange: [
            -Dimensions.get("window").width,
            Dimensions.get("window").width
          ]
        }),
        opacity: animator.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }),
      }}
    />
  );
}

function ProNights(props) {
  const [selected, setSelected] = useState(0);

  const goBack = () => {
    setSelected(selected => mod(selected - 1, 4));
  };

  const goNext = () => {
     // console.log(selected + "//")
    setSelected(selected => mod(selected + 1, 4));
    //console.log(selected)
  };

  return (
    <GestureRecognizer
      onSwipeLeft={goNext}
      onSwipeRight={goBack}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      }}
      style={{
        flex: 1
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={styles.container}>
          <ProNightEventView
            selected={selected === 0}
            position={selected === 0 ? 1 : selected === 1 ? 0 : 2}
          >
            <View style={{paddingHorizontal: 500}}>
                <Image
                  style={styles.poster}
                  source={require("../assets/pronights/ProgBrothers.png")}
                />
            </View>
          </ProNightEventView>
          <ProNightEventView
            selected={selected === 1}
            position={selected === 0 ? 2 : selected === 1 ? 1 : 0}
          >
            <View style={{paddingHorizontal: 500}}>
                <Image
                  style={styles.poster}
                  source={require("../assets/pronights/RahulSubramanium.png")}
                />
            </View>
          </ProNightEventView>
          <ProNightEventView
            selected={selected === 2}
            position={selected === 0 ? 2 : selected === 1 ? 2 : 1}
          >
            <View style={{paddingHorizontal: 500}}>
                <Image
                  style={styles.poster}
                  source={require("../assets/pronights/NikhilDsouza.jpeg")}
                />
            </View>
          </ProNightEventView>
          <ProNightEventView
            selected={selected === 3}
            position={selected === 0 ? 0 : selected === 1 ? 3 : 1}
          >
            <View style={{paddingHorizontal: 500}}>
                <Image
                  style={styles.poster}
                  source={require("../assets/pronights/Nalayak.png")}
                />
            </View>
          </ProNightEventView>
          <ProNightEventView
            selected={selected === 3}
            position={selected === 0 ? 0 : selected === 1 ? 3 : 1}
          >
            <View style={{paddingHorizontal: 500}}>
                <Image
                  style={styles.poster}
                  source={require("../assets/pronights/Moctave.png")}
                />
            </View>
          </ProNightEventView>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight style={styles.navButtons} onPress={goBack} underlayColor="#fff">
            <View style={styles.buttoner}>
              <Ionicons
                name={"md-arrow-dropleft"}
                size={30}
                color={"#FFFFFF"}
              ></Ionicons>
              <Text style={styles.buttonText}>Previous</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.navButtons} onPress={goNext} underlayColor="#fff">
            <View
              style={{
                ...styles.buttoner
              }}
            >
              <Ionicons
                name={"md-arrow-dropright"}
                size={30}
                color={"#FFFFFF"}
              ></Ionicons>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </GestureRecognizer>
  );
}

ProNights.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingBottom: 120,
    flexDirection: "column",
    backgroundColor: "rgba(30,30,30,1)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 50
  },
  buttonRow: {
    flexDirection: "row",
    position: "absolute",
    width: Dimensions.get("window").width,
    bottom: 180,
    height: 50,
    justifyContent: "space-between"
  },
  buttoner: {
    textAlign: "right",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    width: 100
  },
  navButtons: {},
  buttonText: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  slide: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 450,
    borderWidth: 2,
    borderColor: Colors.gullyOrange,
  }
});

export default withNavigationFocus(ProNights);
