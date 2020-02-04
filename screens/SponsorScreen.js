import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { home_bg } from "../redux/actions/UI";
import { withNavigationFocus } from "react-navigation";

class SponsorsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partners: [
        {
          title: "",
          name: "Insider.In",
          img: require("../assets/sponsors/insider.png"),
          link: "https://insider.in/city-selector"
        },
        {
          title: "Official Gifting Partner",
          name: "The Souled Store",
          img: require("../assets/sponsors/thesouledstore.png"),
          link: "https://www.thesouledstore.com"
        },
        {
          title: "",
          name: "Cornitos",
          img: require("../assets/sponsors/Cornitos.png"),
          link: "https://www.cornitos.in/"
        },
        {
          title: "Official Saving Partner",
          name: "Grabon",
          img: require("../assets/sponsors/GrabOn.png"),
          link: "https://www.grabon.in/"
        },
        {
          title: "Official Ice Tea Partner",
          name: "Brew House",
          img: require("../assets/sponsors/brewhouse.png"),
          link: "https://m.facebook.com/brewhouseicetea/"
        },
        {
          title: "Official Commute Partner",
          name: "Zoomcar",
          img: require("../assets/sponsors/zoomcar.png"),
          link: "zoomcar.com"
        },
        {
          title: "",
          name: "Townscript",
          img: require("../assets/sponsors/townscript.png"),
          link: "https://www.townscript.com/in/india"
        },
        {
          title: "",
          name: "DU Assassin",
          img: require("../assets/sponsors/duassassins.png"),
          link: "https://duassassins.in/"
        },
        {
          title: "",
          name: "DU Express",
          img: require("../assets/sponsors/duexpress.png"),
          link: "https://duexpress.in/"
        },
        {
          title: "",
          name: "DU Beat",
          img: require("../assets/sponsors/dubeat.jpg"),
          link: "http://dubeat.com/"
        },
        {
          title: "",
          name: "ED Times",
          img: require("../assets/sponsors/ed.png"),
          link: "https://www.google.com/amp/s/www.edtimes.in/%3famp"
        },
        {
          title: "Official Gifting Partner",
          name: "The Official Longshot",
          img: require("../assets/sponsors/longshot-2.jpg"),
          link: "https://theofficiallongshot.com"
        },
        {
          title: "",
          name: "ATKT",
          img: require("../assets/sponsors/ATKT.png"),
          link: "https://atkt.in/"
        },
        {
          title: "",
          name: "Social Rush",
          img: require("../assets/sponsors/social-rush.jpg"),
          link: "https://thesocialrush.com/"
        },
        {
          title: "",
          name: "Fiesto",
          img: require("../assets/sponsors/fiesto_nobg.png"),
          link: "https://www.fiesto.live"
        },
        {
          title: "",
          name: "DU Vibe",
          img: require("../assets/sponsors/duvibes.jpg"),
          link: "https://m.facebook.com/DUVibes/"
        },
        {
          title: "",
          name: "Education Tree",
          img: require("../assets/sponsors/education-tree.png"),
          link: "https://m.facebook.com/theeducationtree?fref=ts"
        },
        {
          title: "",
          name: "Noida Diary",
          img: require("../assets/sponsors/noidadiary.png"),
          link: "http://www.noidadiary.in/"
        },
        {
          title: "Official Digital News Partner",
          name: "NewsAurChai",
          img: require("../assets/sponsors/newsaurchai.png"),
          link: "https://newsaurchai.com/"
        },
        {
          title: "",
          name: "Afflatus",
          img: require("../assets/sponsors/afflatus.jpg"),
          link: "https://www.facebook.com/afflatus.co.in/"
        },
        {
          title: "Official Ticketing Partner",
          name: "BME",
          img: require("../assets/sponsors/bme.jpg"),
          link: "https://www.bookmyevent.com/"
        },
        {
          title: "",
          name: "Rani",
          img: require("../assets/sponsors/rani.jpg"),
          link: "https://www.raniworld.com/"
        }
      ],
      sponsors: [
        {
          title: "",
          name: "HCL",
          img: require("../assets/sponsors/hcl.png")
          //link: "www.hcl.com"
        },
        {
          title: "",
          name: "HP",
          img: require("../assets/sponsors/hp.png")
          //link: "https://www8.hp.com/in/en/home.html"
        },
        {
          title: "",
          name: "Adobe",
          img: require("../assets/sponsors/adobe.png")
          //link: "www.adobe.com"
        },
        {
          title: "",
          name: "Gail",
          img: require("../assets/sponsors/gail.png")
          //link: "www.adobe.com"
        },
        {
          title: "",
          name: "CEG",
          img: require("../assets/sponsors/ceg.jpg")
          //link: "https://m.facebook.com/brewhouseicetea/"
        },
        {
          title: "",
          name: "Conneqt",
          img: require("../assets/sponsors/conneqt.png")
          //link: "https://m.facebook.com/brewhouseicetea/"
        },
        {
          title: "",
          name: "Ruchira",
          img: require("../assets/sponsors/ruchira.png")
          //link: "https://m.facebook.com/brewhouseicetea/"
        },
        {
          title: "",
          name: "Classic Engineers",
          img: require("../assets/sponsors/classicengineers.png")
          //link: "https://m.facebook.com/brewhouseicetea/"
        },
        {
          title: "Official Wellness Partner",
          name: "VLCC",
          img: require("../assets/sponsors/vlcc.png")
          //link: "https://m.facebook.com/brewhouseicetea/"
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

  goTo = (link, img) => {
    link ? Linking.openURL(link) : null;
  };

  render() {
    const partners = this.state.partners.map((partner, index) => (
      <View key={index} style={{ marginVertical: 30 }}>
        <TouchableOpacity onPress={() => this.goTo(partner.link, partner.img)}>
          <Text style={styles.textHeading}>{partner.name}</Text>
          <Image
            source={partner.img}
            style={{
              resizeMode: "contain",
              width: 350,
              height: 150,
              marginVertical: 15,
              alignSelf: "center"
            }}
          />
        {partner.title ? (
          <Text style={styles.normalText}>{partner.title}</Text>
        ) : null}
        </TouchableOpacity>
      </View>
    ));

    const sponsors = this.state.sponsors.map((sponsor, index) => (
      <View key={index} style={{ marginVertical: 30 }}>
        <Text style={styles.textHeading}>{sponsor.name}</Text>
        <Image
          source={sponsor.img}
          style={{
            resizeMode: "contain",
            width: 350,
            height: 150,
            marginTop: 20,
            alignSelf: "center"
          }}
        />
        {sponsor.title ? (
          <Text style={styles.normalText}>{sponsor.title}</Text>
        ) : null}
      </View>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.darkBG}>
          <ScrollView>
            <Text style={styles.title}>Sponsors</Text>
            {sponsors}
            <View style={{ marginBottom: 50 }}></View>
            <Text style={styles.title}>Media Partners</Text>
            {partners}
          </ScrollView>
        </View>
      </View>
    );
  }
}

SponsorsScreen.navigationOptions = {
  title: "Our Partners",
  headerStyle: {
    backgroundColor: "#000"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#FFF",
    width: Dimensions.get("window").width - 40,
    fontFamily: "just-fist",
    textTransform: "uppercase"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingBottom: 125,
    backgroundColor: "rgba(0,0,0,0)"
  },
  darkBG: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15
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
    textAlign: "center"
  },
  title: {
    fontFamily: "just-fist",
    textAlign: "center",
    color: "#fff",
    fontSize: 60,
    textShadowColor: "#aaa",
    textShadowRadius: 10,
    textShadowOffset: {
      width: 5,
      height: 0
    }
  }
});

export default connect(null, { home_bg })(withNavigationFocus(SponsorsScreen));
