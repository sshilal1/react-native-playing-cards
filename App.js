import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from './Card';

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
    return (
      <View>
        <View 
          onLayout={this.setDropZoneValues.bind(this)}
          style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        <Card dropZoneValues={dzone}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropZone    : {
    height         : 100,
    backgroundColor:'#2c3e50'
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
});
