import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableNativeFeedback
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-navigation";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Entypo, Ionicons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { withNavigationFocus } from "react-navigation";
import { home_bg } from "../redux/actions/UI";

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

function ScheduleDays(props) {
  const day1 = [
    {
      title: "HackData 4.0",
      event: "HackData",
      time: "10:00 - ",
      venue: "B012, B016",
      category: "technical"
    },
    {
      title: "Bipartisan",
      event: "Bipartisan - the turncoat event",
      time: "12:00 - 16:00",
      venue: "C021",
      category: "technical"
    },
    {
      title: "Render",
      event: "Render",
      time: "12:00 - 17:00",
      venue: "Main Stage Arena",
      category: "cultural"
    },
    {
      title: "Envision",
      event: "En-Vision",
      time: "12:00 - 17:00",
      venue: "D330",
      category: "technical"
    },
    {
      title: "Into the Night",
      event: "Into the Night",
      time: "22:00 - ",
      venue: "Library Front Side",
      category: "cultural"
    }
  ];

  const day2 = [
    {
      title: "Raw N Rugged",
      event: "Raw N Rugged",
      time: "09:00 - 12:00",
      venue: "B315",
      category: "cultural"
    },
    {
      title: "Hack IEEE",
      event: "<hack.ieee>",
      time: "09:00 - 18:00",
      venue: "Embedded Labs",
      category: "cultural"
    },
    {
      title: "Acoustyx(Solo Vocal)",
      event: "Acoustyx",
      time: "09:30 - 12:30",
      venue: "D022, D026",
      category: "cultural"
    },
    {
      title: "Verbatim",
      event: "Verbatim",
      time: "10:00 - ",
      venue: "D330",
      category: "cultural"
    },
    {
      title: "The Gully Games(Fair)",
      event: "none",
      time: "10:00 - ",
      venue: "Library Path",
      category: "cultural"
    },
    {
      title: "HackData 4.0",
      event: "HackData",
      time: "10:00 - 14:00",
      venue: "B012, B016",
      category: "technical"
    },
    {
      title: "Materchef 2.0",
      event: "MaterChef 2.0",
      time: "10:00 - 18:00",
      venue: "DH2",
      category: "cultural"
    },
    {
      title: "Into the Night",
      event: "Into the Night",
      time: "22:30 - ",
      venue: "Library Front Side",
      category: "cultural"
    },
    {
      title: "Graffiti",
      event: "Graffiti",
      time: "11:00 - 14:00",
      venue: "Central Path",
      category: "cultural"
    },
    {
      title: "Lawyer Up",
      event: "Lawyer Up",
      time: "11:00 - 17:00",
      venue: "D326",
      category: "cultural"
    },
    {
      title: "FIFA",
      event: "FIFA Tournament",
      time: "12:00 - 16:00",
      venue: "B012",
      category: "technical"
    },
    {
      title: "Line Follower",
      event: "Line Follower",
      time: "12:00 - 16:00",
      venue: "In Front of DSA",
      category: "technical"
    },
    {
      title: "Rally Race",
      event: "Into the Night",
      time: "12:00 - 16:00",
      venue: "In Front of Library",
      category: "technical"
    },
    {
      title: "Speed Climbing",
      event: "none",
      time: "12:30 - 18:00",
      venue: "Indoor Sports Complex",
      category: "sports"
    },
    {
      title: "No Strings Attached(Acappela)",
      event: "No Strings Attached",
      time: "12:30 - 15:30",
      venue: "C021",
      category: "cultural"
    },
    {
      title: "Dance Boulevard(Group dance)",
      event: "Bounce Boulevard",
      time: "12:30 - 17:00",
      venue: "Main Stage Arena",
      category: "cultural"
    },
    {
      title: "Obstacle Race",
      event: "Obstacle race",
      time: "13:00 - 17:00",
      venue: "Mount SNU",
      category: "technical"
    },
    {
      title: "Bhasad( Stand Up Comedy)",
      event: "Bhasad",
      time: "14:00 - 16:00",
      venue: "D217",
      category: "cultural"
    },
    {
      title: "Rap Battle",
      event: "Rap Battle",
      time: "16:00 - 19:00",
      venue: "Library Stairs",
      category: "cultural"
    }
  ];

  const day3 = [
    {
      title: "Verbatim",
      event: "Verbatim",
      time: "10:00 - ",
      venue: "D330",
      category: "cultural"
    },
    {
      title: "The Gully Games(Fair)",
      event: "none",
      time: "10:00 - ",
      venue: "Library Path",
      category: ""
    },
    {
      title: "Spin-a-Yarn",
      event: "Spin A Yarn",
      time: "11:00 - 13:00",
      venue: "D026",
      category: "cultural"
    },
    {
      title: "Staccato",
      event: "Staccato (Instrumental Solo)",
      time: "11:00 - 14:00",
      venue: "B315",
      category: "cultural"
    },
    {
      title: "Green Hunt",
      event: "none",
      time: "11:00 - 14:00",
      venue: "Main Stage Arena",
      category: "cultural"
    },
    {
      title: "Live Sketching",
      event: "Live Sketching",
      time: "11:00 - 14:00",
      venue: "Central Vista",
      category: "cultural"
    },
    {
      title: "Slam Poetry",
      event: "Slam Poetry",
      time: "11:00 - 15:00",
      venue: "A-B Atrium",
      category: "cultural"
    },
    {
      title: "Aaagaz(Nukkad Natak)",
      event: "Aagaz",
      time: "11:00 - 16:00",
      venue: "In Front of Library",
      category: "cultural"
    },
    {
      title: "Countdown",
      event: "Countdown",
      time: "12:00 - 15:00",
      venue: "Do22",
      category: "technical"
    },
    {
      title: "Counter Strike",
      event: "Counter Strike",
      time: "12:30 - 17:30",
      venue: "D106, D110",
      category: "technical"
    },
    {
      title: "Scavenger Vortex",
      event: "Scavenger Vortex:42",
      time: "10:00 - 17:00",
      venue: "D007, D006, D003, Central Vista",
      category: "technical"
    },
    {
      title: "Crescendo",
      event: "Crescendo (Battle of the Bands)",
      time: "13:00 - 16:30",
      venue: "Main Stage Arena",
      category: "cultural"
    },
    {
      title: "Gully Games(Quiz)",
      event: "Gully Games (A Sports Quiz)",
      time: "15:00 - 18:00",
      venue: "B315",
      category: "cultural"
    },
    {
      title: "Music Art",
      event: "Music Art",
      time: "15:00 - 18:00",
      venue: "B009",
      category: "cultural"
    },
    {
      title: "BuildUp",
      event: "The Build Up",
      time: "11:00 - 17:00",
      venue: "A317, A318, A309, A313",
      category: "cultural"
    }
  ];

  var dayViewed;

  function goToEvent(event, category) {
    event==="none"
      ?
        null
      :
  
      props.navigation.navigate("EventPage", {
        eventName: event,
        category: category
      });
    
  }

  if (props.day == "1") dayViewed = day1;
  else if (props.day == "2") dayViewed = day2;
  else dayViewed = day3;

  return (
    <View style={{
      paddingTop: 30,
      paddingBottom: 60
    }}>
      {dayViewed.map((e, index) => (
        <View style={styles.eventSchedule} key={index}>
          <Text style={{ ...styles.screenText, flex: 1 }}>{e.time} </Text>
          <Text
            style={{ ...styles.titleText, flex: 2 }}
            onPress={() => goToEvent(e.event, e.category)}
          >
            {e.title}
          </Text>
          <View style={{ flex: 1, flexDirection: "row", paddingRight: 20 }}>
            <Entypo
              name="location-pin"
              size={20}
              style={{
                marginRight: 0,
                alignSelf: "center"
              }}
              color={Colors.gullyGreen}
            />
            <Text style={{ ...styles.screenText, color: Colors.gullyGreen }}>
              {e.venue}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function ScheduleScreen(props) {
  var key = 0;

  useEffect(() => {
    if (props.isFocused) props.home_bg();
  }, [props.isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0,2,4]} style={styles.scroller}>
        
          <View>
            <Text style={styles.logoText}>
              {" "}<Ionicons name="ios-arrow-forward" size={40}/>{" DAY 1"}
            </Text>
          </View>
          <ScheduleDays day="1" navigation={props.navigation} />
       
        
          <View>
            <Text style={styles.logoText}>
              {" "}<Ionicons name="ios-arrow-forward" size={40}/>{" DAY 2"}
            </Text>
          </View>
          <ScheduleDays day="2" navigation={props.navigation} />
       
        
          <View>
            <Text style={styles.logoText}>
              {" "}<Ionicons name="ios-arrow-forward" size={40}/>{" DAY 3"}
            </Text>
          </View>
          <ScheduleDays day="3" navigation={props.navigation} />
          <View style={{marginBottom: 120}}/>
      </ScrollView>
    </View>
  );
}

ScheduleScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 50,
    paddingBottom: 0,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroller: {
    paddingBottom: 120
  },
  screenText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "axiforma-bold",
    alignSelf: "center"
  },
  titleText: {
    color: Colors.gullyOrange,
    fontFamily: "axiforma-bold",
    textAlign: "center",
    fontSize: 25,
    alignSelf: "center"
  },
  logoText: {
    fontFamily: "axiforma-bold",
    fontSize: 40,
    color: Colors.gullyOrange,
    letterSpacing: 4,
    textAlign: "left",
    borderBottomColor: Colors.gullyOrange,
    borderBottomWidth: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginVertical: 10,
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 15,
    padding: 10,
    
  },
  eventSchedule: {
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 15,
    padding: 10,
  }
});

export default connect(null, { home_bg })(withNavigationFocus(ScheduleScreen));
