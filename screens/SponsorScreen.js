import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { home_bg } from "../redux/actions/UI";
import { withNavigationFocus } from "react-navigation";

import Sponsors from "../assets/Sponsors.json";

class SponsorsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsors: Sponsors
    };
  }

  componentDidMount() {
    this.props.home_bg();
  }

  componentDidUpdate() {
    if (this.props.isFocused) this.props.home_bg();
  }

  goTo = (link, img) => {
    link ? Linking.openURL(link) : null;
  };

  returnImage = (image) => {
    var x = ("require('" + image + "')")
    console.log(x)
    return x
  }

  render() {
    const partners = this.state.sponsors.map((partner, index) => (
      <View key={index} style={{marginVertical: 30}}>
        <TouchableOpacity onPress={() => this.goTo(partner.link, partner.img)}>
          <Text style={styles.textHeading}>{partner.name}</Text>
          <Image
            source={require("../assets/sponsors/duassassins.png")}
            style={{
              resizeMode: "contain",
              width: 350,
              height: 150,
              marginVertical: 15
            }}
          />
          <Text style={styles.normalText}>{partner.title}</Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.darkBG}>
          <ScrollView>
            <Text style={styles.logoText}>Our Partners</Text>
            {partners}
          </ScrollView>
        </View>
      </View>
    );
  }
}

SponsorsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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
    marginBottom: 20
  },
  darkBG: {
    backgroundColor: "rgba(25, 25, 25, 0.95)",
    padding: 20,
    borderRadius: 15,
    marginTop: 15
  },
  textHeading: {
    color: Colors.gullyOrange,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "axiforma-bold",
    textTransform: "uppercase",
    textAlign: "center"
  },
  normalText: {
    fontFamily: "axiforma-bold",
    fontSize: 20,
    color: "#fff",
    textAlign: 'center'
  }
});

export default connect(null, { home_bg })(withNavigationFocus(SponsorsScreen));
