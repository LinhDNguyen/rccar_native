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

var rccar_ble = require('../libs/rccar_ble');

import {
  MKButton,
} from 'react-native-material-kit';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  scanButton: {

  },
  disconnectButton: {

  },
});

var bleScreen = undefined;

const PlainRaisedButton = MKButton.button()
  .build();

const ScanButton = MKButton.button()
  .withText('SCAN')
  .withStyle(styles.scanButton)
  .build();

class BleSelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bleServices: [],
    };
    bleScreen = this;
  }

  buttonPress(txt) {
    console.log('Button pressed ' + txt);
  }

  startScan() {
    console.log("Start Scan BLE");
    rccar_ble.start_scan(this.scanDone);
  }

  scanDone(bles) {
    console.log("Scan Done...."+ bles.length + " BLE found");
    bleScreen.state.bleServices = [];
    for (var i = 0; i < bles.length; i++) {
      bleScreen.state.bleServices.push(bles[i].advertisement.localName);
    }
  }

  render() {
    let Arr = this.state.bleServices.map((a, i) => {
      return <PlainRaisedButton key={i} onPress={() => this.buttonPress(a)}><Text pointerEvents="none" style={styles.buttonText}>{a}</Text></PlainRaisedButton>
    })
    return (
      <View>
        <ScanButton onPress={() => this.startScan()} />
        { Arr }
      </View>
    );
  }

  componentWillMount() {
    rccar_ble.init();
  }
}

module.exports = BleSelectScreen;
