import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { home_bg } from "../redux/actions/UI";
import { withNavigationFocus } from "react-navigation";

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

class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [
        {
          name: "Ashwin Johnson",
          position: "Chief Executive",
          phone: 9599156452
        },
        {
          name: "Jaswant Gujrala",
          position: "Chief Executive",
          phone: 9618655777
        },
        {
          name: "Kaustuv Acharya",
          position: "Head of PR relations",
          phone: 9643427888
        },
        {
          name: "Abhirami",
          position: "Sports Director",
          phone: 9515502260
        },
        {
          name: "Keval Sushruth",
          position: "Sports Director",
          phone: 8826243936
        },
        {
          name: "Abhinav Keshri",
          position: "Cultural Director",
          phone: 9835534434
        },
        {
          name: "Anirudh Kaushik",
          position: "Technical Director",
          phone: 9884983595
        },
        {
          name: "Rahul Velaga",
          position: "Transport Head",
          phone: 8555976486
        },
        {
          name: "Anjali Ramanathan",
          position: "Hospitality Lead",
          phone: 9560124141
        },
        {
          name: "Mallika Gupta",
          position: "PR Head",
          phone: 8765775544
        },
        {
          name: "Ananya Gurram",
          position: "Security Head",
          phone: 8328669673
        },
        {
          name: "Harris Kangoo",
          position: "Security Team",
          phone: 9821880342
        },
        {
          name: "Udbhav Saxena",
          position: "Security Team",
          phone: 8800206864
        }
      ]
    };
  }

  componentDidMount() {
    this.props.home_bg();
  }

  componentDidUpdate() {
    if (this.props.isFocused) this.props.home_bg();
  }

  goToLoc = (locIndex) => {
    this.props.navigation.navigate("ReactNativeMaps",{
      locationIndex: locIndex
    })
  }

  render() {
    const contacts = this.state.people.map((e, index) => (
      <View style={{ ...styles.darkBG, height: "auto" }} key={index}>
        <Text
          style={{
            ...styles.secondaryText,
            ...styles.upperText,
            ...styles.textCenter,
            ...styles.headingText
          }}
        >
          {e.position}
        </Text>
        <Text style={styles.normalText}>{e.name} </Text>

        <Text
          style={styles.normalText}
          onPress={() => {
            Linking.openURL(`tel:${e.phone}`);
          }}
        >
          <Ionicons
            name="md-phone-portrait"
            size={20}
            style={{
              marginRight: 10
            }}
            color="#0077ff"
          />
          {"   " + e.phone + "   "}
          <Ionicons
            name="md-link"
            size={20}
            style={{
              marginRight: 10
            }}
            color="#0077ff"
          />
        </Text>

        {/* <Text
          style={styles.normalText}
          onPress={() => {
            Linking.openURL(`mailto:${e.email}`);
          }}
        >
          <Ionicons
            name="md-mail"
            size={20}
            style={{
              marginRight: 10
            }}
            color="#0077ff"
          />
          {"   " + e.email + "   "}
          <Ionicons
            name="md-link"
            size={20}
            style={{
              marginRight: 10
            }}
            color="#0077ff"
          />
        </Text> */}
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <Text style={styles.logoText}>Contact Us</Text>
          {contacts}

          <View style={styles.darkBG}>
            <Text
              style={{
                ...styles.secondaryText,
                ...styles.upperText,
                fontSize: 25
              }}
            >
              Reach Us At
            </Text>
            <Text
              style={{ ...styles.normalText, fontSize: 15 }}
              onPress={() => {
                Linking.openURL("mailto: breeze@snu.edu.in");
              }}
            >
              <Ionicons name="md-mail" size={20} color="#0077ff" />
              {"   "}
              breeze@snu.edu.in
              {"   "}
              <Ionicons name="md-link" size={20} color="#0077ff" />
            </Text>

            <Text
              style={{
                ...styles.secondaryText,
                ...styles.upperText,
                fontSize: 25,
                marginTop: 10
              }}
            >
              Address
            </Text>
            <TouchableOpacity onPress={() => this.goToLoc(0)}>
              <Text style={{ ...styles.normalText, fontSize: 15, flex: 1 }}>
                <Entypo
                  name="location-pin"
                  size={20}
                  style={{
                    marginRight: 0,
                    alignSelf: "center",
                    flex: 1
                  }}
                  color={Colors.gullyGreen}
                />
                Shiv Nadar University NH - 91, Tehsil Dadri Gautam Buddha Nagar
                Uttar Pradesh - 201315
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 120 }} />
        </ScrollView>
      </View>
    );
  }
}

ContactScreen.navigationOptions = {
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
  scroller: {
    paddingBottom: 120
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
  }
});

export default connect(null, { home_bg })(withNavigationFocus(ContactScreen));
