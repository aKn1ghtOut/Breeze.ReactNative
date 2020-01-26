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
  AsyncStorage
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

import DefaultNavOptions from "../navigation/DefaultNavOptions";

export default class Cultural extends Component {
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
    input: "Search for an Event"
  };

  componentDidMount() {
    var category = this.props.navigation.getParam("category", "Cultural");
    category = category.toLowerCase();
    this.setState({
      mainCategory: category
    });

    var self = this;

    fetch("https://api.snu-breeze.com/" + `api/${category}_events_get`).then(
      async res => {
        let resp = await res.json();
        var events = resp[category];



        self.setState({
          eventList: events
            .sort((a, b) => a.name.localeCompare(b.name))
        });
      }
    );
  }



  componentWillUnmount() {}

  componentDidUpdate() {
    this.state.categoryButtons.forEach((button, i) => {
      if (button.added) return;

      // button.ref.current.addEventListener("click", () => {
      //   this.state.categoryButtons.forEach(butto =>
      //     butto.ref.current.classList.remove("active")
      //   );
      //   this.allB.current.classList.remove("active");
      //   button.ref.current.classList.add("active");

      //   this.setState({
      //     eventList: this.state.eventList.map(event => {
      //       event.display = event.category.includes(this.state.categories[i])
      //         ? "block"
      //         : "none";
      //       return event;
      //     })
      //   });
      // });

      button.added = true;
      this.setState({
        categoryButtons: this.state.categoryButtons.map((but, j) => {
          if (i == j) but.added = true;

          return but;
        })
      });
    });
  }

  search() {
    let searchedVal = this.searchBar.current.value;
    this.setState({
      input: searchedVal
    });
    searchedVal = searchedVal.toLowerCase();
    this.setState({
      eventList: this.state.eventList.map(element => {
        if (element.name.toLowerCase().indexOf(searchedVal) < 0)
          element.searched = false;
        else element.searched = true;
        return element;
      })
    });
  }

  openEvent = event => {
    this.props.navigation.navigate("EventPage", {
      eventName: event,
      category: this.state.mainCategory
    });
  };

  render() {
    const eventList = this.state.eventList.map(event => {
      return (
        <View style={styles.darkBG}
        >
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

    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>{this.state.mainCategory} events</Text>

        {/* <View >
              
                <Text
                  onPress={this.allButton}
                  ref={this.allB}
                >
                  All
                </Text>
                {this.state.categories.length ===
                this.state.categoryButtons.length
                  ? this.state.categories.map((categ, i) => (
                      <Text
                        ref={this.state.categoryButtons[i].ref}
                      >
                        {categ}
                      </Text>
                    ))
                  : null}
              
              <TextInput
                onChange={this.search}
                ref={this.searchBar}
                value={this.state.input}
              />
            </View> */}
        {/* <Text ref={this.eventsHolder}>
              {eventList}
            </Text> */}
        <ScrollView>
          {eventList}
        </ScrollView>
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
  },
  link: {
    color: "blue"
  }
});
