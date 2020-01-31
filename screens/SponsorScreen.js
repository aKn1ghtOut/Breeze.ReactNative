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
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { home_bg } from "../redux/actions/UI";
import { withNavigationFocus } from "react-navigation";

class SponsorsScreen extends Component {
  constructor(props) {
    super(props);
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

  SponsorsArr = [
    {
        "title":"",
        "name":"Townscript",
        "img": require("../assets/sponsors/townscript.png"),
        "link":"https://www.townscript.com/in/india"
    },
    {
        "title":"",
        "name":"DU Assassin",
        "img": require("../assets/sponsors/duassassins.png"),
        "link":"https://duassassins.in/"
    },
    {
        "title":"",
        "name":"DU Express",
        "img": require("../assets/sponsors/duexpress.png"),
        "link":"https://duexpress.in/"
    },
    {
        "title":"",
        "name":"DU Beat",
        "img": require("../assets/sponsors/dubeat.jpg"),
        "link":"http://dubeat.com/"
    },
    {
        "title":"",
        "name":"ED Times",
        "img": require("../assets/sponsors/ed.png"),
        "link":"https://www.google.com/amp/s/www.edtimes.in/%3famp"
    },
    {
        "title":"",
        "name":"ATKT",
        "img": require("../assets/sponsors/ATKT.png"),
        "link":"https://atkt.in/"
    },
    {
        "title":"",
        "name":"Social Rush",
        "img": require("../assets/sponsors/social-rush.jpg"),
        "link":"https://thesocialrush.com/"
    },
    {
        "title":"",
        "name":"Fiesto",
        "img": require("../assets/sponsors/fiesto_nobg.png"),
        "link":"https://www.fiesto.live"
    },
    {
        "title":"",
        "name":"DU Vibe",
        "img": require("../assets/sponsors/duvibes.jpg"),
        "link":"https://m.facebook.com/DUVibes/"
    },
    {
        "title":"",
        "name":"Education Tree",
        "img": require("../assets/sponsors/education-tree.png"),
        "link":"https://m.facebook.com/theeducationtree?fref=ts"
    },
    {
        "title":"",
        "name":"Noida Diary",
        "img": require("../assets/sponsors/noidadiary.png"),
        "link":"http://www.noidadiary.in/"
    },
    {
        "title":"Official Digital News Partner",
        "name":"NewsAurChai",
        "img": require("../assets/sponsors/newsaurchai.png"),
        "link":"https://newsaurchai.com/"
    },
    {
        "title":"",
        "name":"Insider.In",
        "img": require("../assets/sponsors/insider.png"),
        "link":"https://insider.in/city-selector"
    },
    {
        "title":"Official Saving Partner",
        "name":"Grabon",
        "img": require("../assets/sponsors/GrabOn.png"),
        "link":"https://www.grabon.in/"
    },
    {
        "title":"Official Ticketing Partner",
        "name":"BME",
        "img": require("../assets/sponsors/bme.jpg"),
        "link":"https://www.bookmyevent.com/"
    },
    {
        "title":"",
        "name":"Rani",
        "img": require("../assets/sponsors/rani.jpg"),
        "link":"https://www.raniworld.com/"
    },
    {
        "title":"",
        "name":"Cornitos",
        "img": require("../assets/sponsors/Cornitos.png"),
        "link":"https://www.cornitos.in/"
    },
    {
        "title":"",
        "name":"Brew House",
        "img": require("../assets/sponsors/brewhouse.png"),
        "link":"https://m.facebook.com/brewhouseicetea/"
    },
    {
        "title":"Official Gifting Partner",
        "name":"The Official Longshot",
        "img": require("../assets/sponsors/longshot-2.jpg"),
        "link":"https://theofficiallongshot.com"
    }
  ]

  render() {
    const partners = this.SponsorsArr.map((partner, index) => (
      <View key={index} style={{marginVertical: 10, alignItems: "center"}}>
        <TouchableOpacity onPress={() => this.goTo(partner.link, partner.img)}>
          <Text style={styles.textHeading}>{partner.name}</Text>
          <Image
            source={partner.img}
            style={{
              resizeMode: "contain",
              width: 300,
              height: 100,
              marginVertical: 10,
              backgroundColor: partner.bg || null
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
            {partners}
            <View style={{marginBottom: 120}} />
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
    paddingBottom: 0,
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
    backgroundColor: "#fff",
    padding: 20
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
