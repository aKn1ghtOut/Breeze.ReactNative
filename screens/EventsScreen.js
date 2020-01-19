import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Make this as similar to the web events page as possible,
       * with pull-to-refresh, search, etc
       */}
       <Text>Hey</Text>
    </ScrollView>
  );
}

EventsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
