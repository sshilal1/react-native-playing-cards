import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from './Card';
import Hand from './Hand';

// Need to dynamically create this...
// Will be diff for ios and android...
var dzone = {
  height: 100,
  width: 320,
  x: 0,
  y: 0
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropZoneValue: dzone
    }

    this.setDropZoneValues = this.setDropZoneValues.bind(this);
  }

  setDropZoneValues(event){
    this.setState({
      dropZoneValues : event.nativeEvent.layout
    });
  }

  render() {
    var sixofspades = { value:6, suit:"s"};
    var threeofdiamonds = { value:3, suit:"d"};
    var jackofclubs = { value:"j", suit:"c"};
    var cards = [sixofspades,threeofdiamonds,jackofclubs,sixofspades,threeofdiamonds,jackofclubs,sixofspades];
    return (
      <View style={styles.container}>
        <View 
          onLayout={this.setDropZoneValues.bind(this)}
          style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        <Card dropZoneValues={dzone} card={sixofspades} position={1}/>
        <Card dropZoneValues={dzone} card={threeofdiamonds} position={2}/>
        <Card dropZoneValues={dzone} card={jackofclubs} position={3}/>
        <Card dropZoneValues={dzone} card={sixofspades} position={4}/>
        <Card dropZoneValues={dzone} card={sixofspades} position={5}/>
        <Card dropZoneValues={dzone} card={sixofspades} position={6}/>
        <Card dropZoneValues={dzone} card={sixofspades} position={7}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D7551'
  },
  dropZone    : {
    height         : 100,
    backgroundColor:'#3fa572'
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
});
