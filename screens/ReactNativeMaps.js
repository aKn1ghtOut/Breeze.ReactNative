import React, { useState, useEffect, Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  SafeAreaView,
  Linking,
  Picker
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
import { eventpage_bg } from "../redux/actions/UI";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import MapView, { Marker } from "react-native-maps";
import CustomMapStyle from "../assets/CustomMapStyling.json";
import Locations from "../assets/Locations.json"


class ReactNativeMaps extends Component {
  state = {
    selectedRegion: {
      latitude: 28.526475,
      longitude: 77.57562,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015
    }
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentDidMount(){
    if(this.props.navigation.state.params.locationIndex)
      this.setState({
        selectedRegion: Locations[this.props.navigation.state.params.locationIndex].location,
        selected: Locations[this.props.navigation.state.params.locationIndex].name
      })
    console.log(Locations[this.props.navigation.state.params.locationIndex])
  }

  componentWillReceiveProps(props){
    if(props.navigation.state.params.locationIndex)
      this.setState({
        selectedRegion: Locations[props.navigation.state.params.locationIndex].location,
        selected: Locations[props.navigation.state.params.locationIndex].name
      })
  }

  onValueChange = (itemValue, itemIndex) => {
      let location = Locations[itemIndex];
      this.setState({
          selectedRegion: location.location,
          selected: itemValue
      })
      console.log(itemIndex)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={this.state.selectedRegion}
          customMapStyle={CustomMapStyle}
          showsUserstring={true}
        >
          <Marker
            coordinate={{
              latitude: this.state.selectedRegion.latitude,
              longitude: this.state.selectedRegion.longitude
            }}
            title="Shiv Nadar University"
            description="Main campus string"
            pinColor={Colors.gullyRed}
            identifier="MainMarker"
          />
        </MapView>
        <View style={styles.picker}>
          <Text
            style={{
              fontWeight: "bold"
            }}
          >
            Go to :
          </Text>
          <Picker
            selectedValue={this.state.selected}
            style={{}}
            onValueChange={this.onValueChange}
          >
            {
                Locations.map((l, index) => (
                    
                    <Picker.Item
                        label={(index + 1) + ". " + l.name}
                        value={l.name}
                        key={index}
                    />

                ))
            }
          </Picker>
        </View>
      </View>
    );
  }
}

ReactNativeMaps.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    flex: 1
  },
  picker: {
    width: Dimensions.get("window").width - 60,
    position: "absolute",
    flex: 1,
    backgroundColor: "#fff",
    top: 50,
    padding: 10,
    borderRadius: 10
  }
});

export default connect(null, { eventpage_bg })(
  withNavigationFocus(ReactNativeMaps)
);
