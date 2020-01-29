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
import CulturalBg from "../assets/images/events_bg/cultural.png"
import SportsBg from "../assets/images/events_bg/sports_mob.png"
import TechnicalBg from "../assets/images/events_bg/technical.png"
import { connect } from "react-redux";
import {withNavigationFocus} from "react-navigation"

import {sports_bg, cultural_bg, technical_bg} from "../redux/actions/UI"

function mod(val, num) {
  val = val % num;
  if (val < 0) val = val + num;
  return val;
}

function DayViewScreen(props) {
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
        })
      }}
    />
  );
}

function ScheduleScreen(props) {
  const [selected, setSelected] = useState(0);
  var key = 0;

  const Categories = ["Cultural", "Technical", "Sports"];

  const goBack = () => {
    setSelected(selected => mod(selected - 1, 3));
  };

  const goNext = () => {
    setSelected(selected => mod(selected + 1, 3));
  };

  useEffect(() => {
    if(!props.isFocused)
    return
    switch(selected)
    {
      case 0:
        props.cultural_bg();
        break;
      
      case 1:
        props.technical_bg();
        break;

      case 2:
        props.sports_bg();
        break;

      default:
        props.cultural_bg();
    }
  }, [selected, props.isFocused])

  const openList = category => {
    console.log(
      props.navigation.navigate("EventsList", {
        category: category
      })
    );
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
          <DayViewScreen
            selected={selected === 0}
            position={selected === 0 ? 1 : selected === 1 ? 0 : 2}
          >
            <Text style={styles.heading}>Cultural</Text>
            <Text style={styles.normalText}>A plethora of events to invoke the talented you</Text>
            <Image style={styles.eventBackPic} source={CulturalBg} />
            <Text
              style={styles.screenText}
              onPress={() => openList("Cultural")}
            >
              Explore
            </Text>
          </DayViewScreen>
          <DayViewScreen
            selected={selected === 1}
            position={selected === 0 ? 2 : selected === 1 ? 1 : 0}
          >
          <Text style={styles.heading}>Technical</Text>
          <Text style={styles.normalText}>Hurry up and ace the game, before it's obsolete!</Text>
            <Image style={styles.eventBackPic} source={TechnicalBg} />
            <Text
              style={styles.screenText}
              onPress={() => openList("Technical")}
            >
              Explore
            </Text>
          </DayViewScreen>
          <DayViewScreen
            selected={selected === 2}
            position={selected === 0 ? 0 : selected === 1 ? 2 : 1}
          >
          <Text style={styles.heading}>Sports</Text>
          <Text style={styles.normalText}>Score the goal, the ball is now in your court!</Text>
            <Image style={styles.eventBackPic} source={SportsBg} />
            <Text style={styles.screenText} onPress={() => openList("Sports")}>
              Explore
            </Text>
          </DayViewScreen>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight style={styles.navButtons} onPress={goBack}>
            <View style={styles.buttoner}>
              <Ionicons
                name={"md-arrow-dropleft"}
                size={30}
                color={"#FFFFFF"}
              ></Ionicons>
              <Text style={styles.buttonText}>
                {Categories[mod(selected - 1, 3)] || "Previous"}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.navButtons} onPress={goNext}>
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
              <Text style={styles.buttonText}>
                {Categories[mod(selected + 1, 3)] || "Next"}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </GestureRecognizer>
  );
}

ScheduleScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
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
    height: Dimensions.get("window").height - 150,
    alignItems: "center",
    justifyContent: "center"
  },
  screenText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "axiforma-bold",
    alignSelf: "center",
    backgroundColor: Colors.gullyRed,
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 20,
    marginBottom: 100
  },
  eventBackPic: {
    position: "absolute",
    width: Dimensions.get("window").width ,
    height: Dimensions.get("window").height - 350,
    bottom: -180,
    left: 0,
    right: 0
  },
  heading: {
    color: Colors.gullyOrange,
    fontSize: 60,
    fontFamily: "just-fist",
    marginTop: -100,
    marginBottom: 25,
    textShadowColor: "#000000",
    textShadowRadius: 15,
    borderWidth: 7,
    textAlign: "center",
    borderColor: "rgba(0, 0, 0, 0)",
    textTransform: "uppercase"
  },
  normalText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "axiforma-bold",
    paddingHorizontal: 10,
    textAlign: "center",
    marginBottom: 30
  }
});

const MapStateToProps = state => ({});

export default connect(MapStateToProps, {sports_bg, cultural_bg, technical_bg})(withNavigationFocus(ScheduleScreen));