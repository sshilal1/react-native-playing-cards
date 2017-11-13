import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pan:new Animated.ValueXY(), 
      dropZoneValues: this.props.dropZoneValues,
      value : this.props.card.value,
      suit : this.props.card.suit,
      position : this.props.position
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
      onPanResponderRelease: (e, gesture) => {
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

  _calcPos = (position) => {
    let Window = Dimensions.get('window');
    return {
      position    : 'absolute',
      top         : Window.height/2,
      left        : position * 50,
    };
  }

  render(){

    const {value,suit,position} = this.state;

    return (
      <View>
        <View style={this._calcPos(position)}>
          <Animated.View 
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.card]}>
            <View style={styles.leftTop}>
              <Text style={styles.text}>{value}</Text>
            </View>
            <View style={styles.rightBottom}>
              <Text style={styles.text}>{suit}</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  card : {
    backgroundColor     : '#1abc9c',
    width               : 125,
    height              : 185,
    borderStyle         : "solid",
    borderColor         : "black"
  },
  text : {
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : 'black',
    fontSize    : 40
  },
  leftTop: {
    width: 40,
    height: 80,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  rightBottom: {
    width: 40,
    height: 80,
    flexDirection: 'column',
    position: 'absolute',
    bottom: -30,
    right: 0,
    backgroundColor: 'transparent'
  },
});
