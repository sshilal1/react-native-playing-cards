import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends React.Component {

  componentWillMount() {
    if(this.reverse == false)
      this.state.pan.addListener((c) => this.state._value = c);
  }
  componentWillUnmount() {
    this.state.pan.removeAllListeners();
  }

  constructor(props) {
    super(props);

    this.renderShape = 'square';
    this.renderColor = 'yellowgreen';
    this.renderText = '＋';
    this.renderSize = 36;
    this.offsetX = 100;
    this.offsetY = 100;
    this.reverse = true;

    this.state = {
      pan:new Animated.ValueXY(), 
      _value:{x: 0, y: 0},
      dropZoneValues: null
    };

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }]),
        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
        },
        onPanResponderRelease           : (e, gesture) => {
          if(this.isDropZone(gesture)){
            this.state.pan.flattenOffset();
          }else{
            Animated.spring(
              this.state.pan,
              {toValue:{x:0,y:0}}
            ).start();
          }
        }
    });
  }

  isDropZone(gesture){
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event){
    this.setState({
      dropZoneValues : event.nativeEvent.layout
    });
  }

  render(){
    return (
      <View>
        <View 
          onLayout={this.setDropZoneValues.bind(this)}     //Step 2
          style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        <View style={styles.draggableContainer}>
          <Animated.View 
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.circle]}>
            <Text style={styles.text}>Drag me!</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
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
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});
