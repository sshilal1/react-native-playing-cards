import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from './Card';

export default class Hand extends React.Component {
  render() {
    
    var cards = this.props.cards;
    var n = cards.length;
    var Window = Dimensions.get('window');
    var scaler = Window.width / 16;
    var blocksize = Window.width - (20 * n);

    var Cards = cards.map((card,index) => {
      return <Card key={index} card={card} cardstyle={cardsstyle}/>
    })
    
    return (
      <View style={styles.container}>
        {Cards}
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

/*
<Card dropZoneValues={dzone} card={sixofspades} position={1}/>
<Card dropZoneValues={dzone} card={threeofdiamonds} position={2}/>
<Card dropZoneValues={dzone} card={jackofclubs} position={3}/>
<Card dropZoneValues={dzone} card={sixofspades} position={4}/>
<Card dropZoneValues={dzone} card={sixofspades} position={5}/>
*/