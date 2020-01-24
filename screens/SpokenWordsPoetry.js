import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  SafeAreaView
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import WebView from "react-native-webview";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

class SpokenWordsPoetry extends Component {
  state = {};

  componentDidMount() {
    var self = this;
    var category = this.props.navigation
      .getParam("category", "Cultural")
      .toLowerCase();
    var sub_event = this.props.navigation
      .getParam("eventName", "aagaaz");
    console.log(category + "-" + sub_event);

    var link = `https://api.snu-breeze.com/api/${category}_events_get/details/?name=${sub_event}`;
    //link = link.replace(/[ ]/g, "%20");
    console.log(link)

    fetch(
      link,
      {
        headers: new Headers({
          "Accept" : "application/json"
        })
      }
    ).then(async res => {
      // handle success
      // console.log(response.data.name);
      var response = await res.json();
      console.log(response);
      //console.log(response.name)
      this.setState({
        ...response
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.darkBG}>
          <Text            style={{
              ...styles.secondaryText,
              ...styles.upperText,
              ...styles.textCenter,
              ...styles.headingText
            }}> {this.state.name} </Text>
  
          <Text style={styles.normalText}>Prize: </Text>
          <Text style={styles.normalText}> &#8377; {this.state.prize_money} </Text>
  
          {this.state.team_size_max !== this.state.team_size_min
            ? [
                <View>
                  <Text style={styles.normalText}>Minimum Team Size: </Text>
                  <Text style={styles.normalText}> {this.state.team_size_min} </Text>
                </View>,
                <View>
                  <Text style={styles.normalText}>Maximum Team Size: </Text>
                  <Text style={styles.normalText}> {this.state.team_size_max} </Text>
                </View>
              ]
            : null}
  
          {this.state.description && this.state.description.length >= 10
            ? [
                <Text style={styles.normalText}>DESCRIPTION</Text>,
                <WebView source={{ html: this.state.description }} />
              ]
            : null}
          <Text style={styles.normalText}>RULES</Text>
          <WebView source={{ html: this.state.rules }} />
          <Text style={styles.normalText}>REGISTRATION</Text>
  
          <Text style={styles.normalText}>Fee: </Text>
          <Text style={styles.normalText}>
            {" "}
            &#8377;{" "}
            {this.state.fees_amount +
              (this.state.perperson ? " per person" : "")}{" "}
          </Text>
  
          <Text style={styles.normalText}>Person Of Contact: </Text>
          <Text style={styles.normalText}>
            {" "}
            {this.state.person_of_contact} - {this.state.person_of_contactno}{" "}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

SpokenWordsPoetry.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    paddingTop: 70,
    backgroundColor: "rgba(0,0,0,0)"
  },
  logoText: {
    fontFamily: "just-fist",
    fontSize: 60,
    color: "#fff",
    letterSpacing: 4,
    textShadowColor: "#000000",
    textShadowRadius: 10,
    textAlign: "center",
    textShadowOffset: {
      width: 5,
      height: 0
    },
    marginBottom: 20
  },
  darkBG: {
    backgroundColor: "rgba(25, 25, 25, 0.95)",
    padding: 20,
    borderRadius: 15,
    marginTop: 15
  },
  primaryText: {
    color: Colors.gullyRed,
    fontSize: 20
  },
  secondaryText: {
    color: Colors.gullyOrange,
    fontSize: 15
  },
  upperText: {
    textTransform: "uppercase"
  },
  headingText: {
    fontFamily: "axiforma-bold",
    fontSize: 30
  },
  textCenter: {
    textAlign: "center"
  },
  normalText: {
    color: "#fff",
    marginTop: 5,
    marginBottom: 5,
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 20
  },
  button: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
    fontFamily: "axiforma-bold",
    textTransform: "uppercase"
  },
  buttonBack: {
    padding: 10,
    backgroundColor: Colors.gullyRed,
    textAlign: "center",
    color: "#fff",
    borderRadius: 20,
    fontSize: 17,
    margin: 20,
    marginRight: 50,
    marginLeft: 50
  }
});


export default SpokenWordsPoetry;
