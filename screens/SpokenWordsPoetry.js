import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  SafeAreaView,
  Linking
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview"
import {eventpage_bg} from "../redux/actions/UI"
import { connect } from "react-redux";
import {DoubleBounce} from "react-native-loader"
import {withNavigationFocus} from "react-navigation"

class SpokenWordsPoetry extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.props.eventpage_bg();
    var self = this;
    var category = this.props.navigation
      .getParam("category", "Cultural")
      .toLowerCase();
    var sub_event = this.props.navigation.getParam("eventName", "aagaaz");
    console.log(sub_event)

    var link = `https://api.snu-breeze.com/api/${category}_events_get/details/?name=${sub_event}`;
    //link = link.replace(/[ ]/g, "%20");

    fetch(link, {
      headers: new Headers({
        Accept: "application/json"
      })
    }).then(async res => {
      // handle success
      // console.log(response.data.name);
      var response = await res.json();
      // console.log(response);
      //console.log(response.name)
      this.setState({
        ...response,
        loaded: true
      });

    });
  }

  componentWillReceiveProps(props)
  {
    if(props.isFocused !== this.props.isFocused)
    this.props.eventpage_bg();
  }

  componentDidUpdate()
  {
    this.props.eventpage_bg();
    var self = this;
    var category = this.props.navigation
      .getParam("category", "Cultural")
      .toLowerCase();
    var sub_event = this.props.navigation.getParam("eventName", "aagaaz");
    console.log(sub_event)

    var link = `https://api.snu-breeze.com/api/${category}_events_get/details/?name=${sub_event}`;
    //link = link.replace(/[ ]/g, "%20");

    fetch(link, {
      headers: new Headers({
        Accept: "application/json"
      })
    }).then(async res => {
      // handle success
      // console.log(response.data.name);
      var response = await res.json();
      // console.log(response);
      //console.log(response.name)
      this.setState({
        ...response,
        loaded: true
      });

    });
  }

  render() {

    if(this.state.loaded)
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.darkBG} >
            
            <Text
              style={{
                ...styles.secondaryText,
                ...styles.upperText,
                ...styles.textCenter,
                ...styles.headingText
              }}
            >
              {" "}
              {this.state.name}{" "}
            </Text>
  
            <Text style={{ ...styles.normalText, ...styles.normalTextHeading }}>
              Prize:{" "}
            </Text>
            <Text style={styles.normalText}>
              {" "}
              &#8377; {this.state.prize_money}{" "}
            </Text>
  
            {this.state.team_size_max !== this.state.team_size_min
              ? [
                  <View>
                    <Text
                      style={{
                        ...styles.normalText,
                        ...styles.normalTextHeading
                      }}
                    >
                      Minimum Team Size:{" "}
                    </Text>
                    <Text style={styles.normalText}>
                      {" "}
                      {this.state.team_size_min}{" "}
                    </Text>
                  </View>,
                  <View>
                    <Text
                      style={{
                        ...styles.normalText,
                        ...styles.normalTextHeading
                      }}
                    >
                      Maximum Team Size:{" "}
                    </Text>
                    <Text style={styles.normalText}>
                      {" "}
                      {this.state.team_size_max}{" "}
                    </Text>
                  </View>
                ]
              : null}
  
            {this.state.description && this.state.description.length >= 10
              ? [
                  <Text
                    style={{ ...styles.normalText, ...styles.normalTextHeading }}
                  >
                    DESCRIPTION
                  </Text>,
                  <HTMLView
                    stylesheet={{
                      p: {
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 0
                      },
                      div: {
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 0
                      },
                      li: {
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 0
                      },
                      h3: {
                        margin: 0,
                        textAlign: "center",
                        fontSize: 25,
                        color: Colors.gullyOrange,
                        fontWeight: "bold",
                        marginTop: 0
                      },
                      ul: {
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 0
                      },
                      br:{
                        display: "none"
                      }
                    }}
                    value={"<div>" + this.state.description + "</div>"}
                  />
  
                ]
              : null}
            <Text style={{ ...styles.normalText, ...styles.normalTextHeading }}>
              RULES
            </Text>
            <HTMLView
              stylesheet={{
                p: {
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 0
                },
                li: {
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 0
                },
                h3: {
                  margin: 0,
                  textAlign: "center",
                  fontSize: 25,
                  color: Colors.gullyOrange,
                  fontWeight: "bold",
                  marginTop: 0
                },
                ul: {
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 0
                },
                div: {
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 0
                }
              }}
              value={"<div>" + this.state.rules + "</div>" }
            />
  
            <Text style={{ ...styles.normalText, ...styles.normalTextHeading }}>
              Fee:{" "}
            </Text>
            <Text style={styles.normalText}>
              {" "}
              &#8377;{" "}
              {this.state.fees_amount +
                (this.state.perperson ? " per person" : "")}{" "}
            </Text>
  
            <Text style={{ ...styles.normalText, ...styles.normalTextHeading }}>
              Person Of Contact:{" "}
            </Text>
            <Text style={styles.normalText}>
              {" "}
              {this.state.person_of_contact} -
            </Text>
            <Text
              style={{ ...styles.normalText, color: "#0077ff" }}
              onPress={() => {
                Linking.openURL(`tel:${this.state.person_of_contactno}`);
              }}
            >
              {this.state.person_of_contactno}
            </Text>
          </View>
        </ScrollView>
      </View>
    );

    else
      return(
        <View style={styles.loader}>
        {/* <ActivityIndicator style={styles.loader} size="large" color={Colors.gullyOrange} /> */}
        <DoubleBounce size={30} color={Colors.gullyOrange} />
      </View>
      )
  }
}

SpokenWordsPoetry.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    paddingBottom: 0,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "center"
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
    borderRadius: 15
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
    fontSize: 40
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
  normalTextHeading: {
    color: Colors.gullyOrange,
    fontWeight: "bold"
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
  loader: {
    position: "absolute",
    top: Dimensions.get("window").height/2.5,
    left: Dimensions.get("window").width/2.5
  }
});

export default connect(null, {eventpage_bg})(withNavigationFocus(SpokenWordsPoetry));
