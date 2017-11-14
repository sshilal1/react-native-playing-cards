import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder, Image } from 'react-native';
import PropTypes from 'prop-types';

import Images from './images';

var _rotate = {
  '1' : '-20deg',
  '2' : '-10deg',
  '3' : '0deg',
  '4' : '10deg',
  '5' : '20deg'
}
var _transY = {
  '1' : 0,
  '2' : -10,
  '3' : -20,
  '4' : -10,
  '5' : 0,
}

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
      left        : (position - 1) * 50,
    };
  }

  _calcHandStyle = (position) => {
    return {
      width         : 105,
      height        : 155,
      borderWidth   : 1,
      borderRadius  : 5,
      transform     : [{rotateZ: _rotate[position]}, {translateY: _transY[position]}]
    }
  }

  render(){

    const {value,suit,position} = this.state;
    var imgref = `${suit}${value}`;

    return (
      <View>
        <View style={this._calcPos(position)}>
          <Animated.View 
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout()]}>
            <View>
              <Image
                style={this._calcHandStyle(position)}
                source={Images[imgref]}
                resizeMode='contain'
              />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
