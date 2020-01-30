import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Linking } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {home_bg} from "../redux/actions/UI"
import {withNavigationFocus} from "react-navigation"

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
          name: "Balaji Vunnava",
          position: "ChairPerson",
          phone: "7042049395",
          email: "bv808@snu.edu.in"
        },
        {
          name: "Mohnish Jagwani",
          position: "Co-Chairperson",
          phone: "8017035960",
          email: "mj474@snu.edu.in"
        },
        {
          name: "Rahul Goyal",
          position: "Administrator",
          phone: "9821400910",
          email: "rg294@snu.edu.in"
        },

        {
          name: "Anirudh Kaushik ",
          position: "Technical Director",
          phone: "9884983595",
          email: "ak669@snu.edu.in"
        },
        {
          name: "Madhur Gupta",
          position: "Head of Finance",
          phone: "9818245177",
          email: "mg786@snu.edu.in"
        },
        {
          name: "Mallika Gupta",
          position: "Head of Public Relations",
          phone: "9149392440",
          email: "mg958@snu.edu.in"
        },
        {
          name: "Sarath Chandra Mudigonda ",
          position: "Head of Finance",
          phone: "9884491080 ",
          email: "sm261@snu.edu.in "
        },
        {
          name: "Keval Sushruth",
          position: "Sports Director",
          phone: "8826243936",
          email: "sk405@snu.edu.in"
        },
        {
          name: "Kaustuv Acharyya ",
          position: "Head of Public Relations",
          phone: "9643427888",
          email: "ka117@snu.edu.in"
        },
        {
          name: "Abhinav Keshri",
          position: "Cultural Director",
          phone: "9835534434",
          email: "ak825@snu.edu.in"
        },
        {
          name: "Abhirami Reddy",
          position: "Sports Director",
          phone: "9515502260",
          email: "ar197@snu.edu.in "
        }
      ]
    };
  }

  componentDidMount()
  {
    this.props.home_bg();
  }

  componentDidUpdate()
  {
    if(this.props.isFocused)
    this.props.home_bg();
  }

  render() {
    const contacts = this.state.people.map(e => (
      <View style={{ ...styles.darkBG,  height: 180 }}>
        <Text
          style={{
            ...styles.secondaryText,
            ...styles.upperText,
            ...styles.textCenter,
            ...styles.headingText
          }}
        >
          {e.name}
        </Text>

        <Text style={styles.normalText}>{e.position} </Text>

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

        <Text
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
        </Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <Text style={styles.logoText}>Contact Us</Text>
          {contacts}

          <View style={{...styles.darkBG, marginBottom: 120}}>
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
              Addressing
            </Text>
            <Text style={{ ...styles.normalText, fontSize: 15 }}>
              Shiv Nadar University NH - 91, Tehsil Dadri Gautam Buddha Nagar
              Uttar Pradesh - 201315
            </Text>
          </View>
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
  }
});

export default connect(null, {home_bg})(withNavigationFocus(ContactScreen));