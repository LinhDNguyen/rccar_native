'use strict';

import React , {Component} from 'react';
import
{
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

class CarMoveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'second'
    }
  }

  onPressButton() {
    this.props.navigator.push({
      id: 'third'
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onPressButton.bind(this)} style={{position:'absolute', top:200, left:120}}>
          <Text>goto Car Sound</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = CarMoveScreen;
