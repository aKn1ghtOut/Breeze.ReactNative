import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  TouchableNativeFeedback,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-navigation";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import Colors from "../constants/Colors"
import {Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader"
import {withNavigationFocus} from "react-navigation"
import {eventpage_bg} from "../redux/actions/UI"

import DefaultNavOptions from "../navigation/DefaultNavOptions";
import { connect } from "react-redux";

class Cultural extends Component {
  constructor(props) {
    super(props);
    // this.searchBar = React.createRef();
    // this.search = this.search.bind(this);
    // this.allB = React.createRef();
    // this.allButton = this.allButton.bind(this);
  }

  state = {
    eventList: [],
    categories: [],
    categoryButtons: [],
    selectedCategory: "all",
    mainCategory: "",
    loaded: false
  };

  componentDidMount() {
    this.props.eventpage_bg();
    var category = this.props.navigation.getParam("category", "Cultural");
    category = category.toLowerCase();
    this.setState({
      mainCategory: category
    });

    var self = this;

    fetch("https://api.snu-breeze.com/" + `api/${category}_events_get`).then(


      async res => {
        self.setState({
          loaded: true
        })

        let resp = await res.json();
        var events = resp[category];

        self.setState({
          eventList: events.sort((a, b) => a.name.localeCompare(b.name))
        });
      }
    );
  }

  componentWillReceiveProps(props)
  {
    if(props.isFocused !== this.props.isFocused)
    this.props.eventpage_bg();
  }

  openEvent = event => {
    this.props.navigation.navigate("EventPage", {
      eventName: event,
      category: this.state.mainCategory
    });
  };

  render() {
    const eventList = this.state.eventList.map((event, index) => {
      return (
        <View style={styles.darkBG} key={index}>
          <Text
            style={{
              ...styles.secondaryText,
              ...styles.upperText,
              ...styles.textCenter,
              ...styles.headingText
            }}
          >
            {event.name}
          </Text>
          <Text style={styles.normalText}>
            {event.team_size_min &&
            event.team_size_max &&
            event.team_size_max === 1 &&
            event.team_size_min === 1
              ? "Individual Participation"
              : "Team Participation"}
          </Text>
          <TouchableHighlight
            style={styles.buttonBack}
            underlayColor={Colors.gullyOrange}
            onPress={() => this.openEvent(event.name)}
          >
            <Text style={styles.button}>View</Text>
          </TouchableHighlight>
        </View>
      );
    });

    if (this.state.loaded)
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.logoText}>{this.state.mainCategory} events</Text>
            {eventList}
          </ScrollView>
        </View>
      );
    else
      return (
        <View style={styles.loader}>
          <Text style={styles.loadingText}>Loading ... </Text>
          <DoubleBounce size={30} color={Colors.gullyOrange} />
        </View>
      );
  }
}

Cultural.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 70,
    paddingBottom: 0,
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
    marginBottom: 20,
    textTransform: "uppercase"
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
  },
  link: {
    color: "blue"
  },
  loader: {
    position: "absolute",
    top: Dimensions.get("window").height/2.5,
    left: Dimensions.get("window").width/2.5
  },
  loadingText: {
    color: Colors.gullyOrange,
    textTransform: "uppercase",
    fontSize: 30,
    fontFamily: "axiforma-bold",
    marginBottom: 10,
    marginLeft: -30
  }
});

export default connect(null, {eventpage_bg})(withNavigationFocus(Cultural));