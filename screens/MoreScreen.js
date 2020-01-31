import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Linking, Dimensions, PermissionsAndroid } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {home_bg} from "../redux/actions/UI"
import {withNavigationFocus} from "react-navigation"
import { TouchableHighlight } from "react-native-gesture-handler";

// export default function ContactScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Make this as similar to the web Contact page as possible,
//        * with pull-to-refresh, search, etc
//        */}
//        <Text>Hey</Text>
//     </ScrollView>
//   );
// }

class MoreScreen extends Component {
  constructor(props) {
    super(props);

    this.openMaps = this.openMaps.bind(this);
  }

  menuItems = [
    {
      title : "Explore the events",
      pageTo: "Events"
    },
    {
      title : "Open the Campus Map",
      pageTo: "ReactNativeMaps",
      onPress: this.openMaps
    }
  ]

  openMaps = async () => {
    console.log("trying");
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

    if (granted) {
      console.log( "You can use the ACCESS_FINE_LOCATION" )
    } 
    else {
      console.log( "ACCESS_FINE_LOCATION permission denied" )
    }

    this.props.navigation.navigate("ReactNativeMaps")
  }

  componentDidMount()
  {
  }

  componentDidUpdate()
  {
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.initText}>
            <Text style={styles.initTextView}>
              <Ionicons name="ios-bulb" size={40} color="#FFF"/>
            </Text>
            <Text style={styles.initTextView}>
              There's a lot happening this Breeze. Find out more about how you can make the best of it!
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Events")}
          >
            <View style={{
              padding: 10,
              borderBottomColor: "rgba(255, 255, 255, 0.1)",
              borderBottomWidth: 1,
              alignItems: "flex-start"
            }}>
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 22,
                  flex: 1,
                  fontFamily: "axiforma-bold"
                }}
              >Explore the events</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.openMaps}
          >
            <View style={{
              padding: 10,
              borderBottomColor: "rgba(255, 255, 255, 0.1)",
              borderBottomWidth: 1,
              alignItems: "flex-start"
            }}>
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 22,
                  flex: 1,
                  fontFamily: "axiforma-bold"
                }}
              >Open the Campus Map</Text>
            </View>
          </TouchableHighlight>
          <View style={{marginBottom: 120}}/>
        </ScrollView>
      </View>
    );
  }
}

MoreScreen.navigationOptions = {
  title: "More",
  headerStyle: {
    backgroundColor: "#000"
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: "#FFF",
    width: Dimensions.get("window").width - 40
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingBottom: 0,
    backgroundColor: "#111"
  },
  scroller: {
    paddingBottom: 120
  },
  initText: {
    flex: 1,
    margin: 10,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 30
  },
  initTextView: {
    fontSize: 18,
    textAlign: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    color: "#FFF",
    fontWeight: "bold"
  }
});

export default MoreScreen;