import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pan:new Animated.ValueXY(), 
      dropZoneValues: this.props.dropZoneValues
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

  render(){
    return (
      <View>
        <View style={styles.draggableContainer}>
          <Animated.View 
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.card]}>
            <View style={styles.leftTop}>
              <Text style={styles.text}>6</Text>
            </View>
            <View style={styles.rightBottom}>
              <Text style={styles.text}>6</Text>
            </View>
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
  },
  card      : {
    backgroundColor     : '#1abc9c',
    width               : 125,
    height              : 185
  },
  text        : {
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
  leftTop: {
    width: 20,
    height: 40,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  rightBottom: {
    width: 20,
    height: 40,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
});
