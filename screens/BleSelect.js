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

import noble from 'react-native-ble';

import {
  MKButton,
} from 'react-native-material-kit';

var bleScreen = undefined;

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

const PlainRaisedButton = MKButton.button()
  .build();

const ScanButton = MKButton.button()
  .withText('SCAN')
  .withOnPress(() => {
    console.log("Start Scan BLE");
    noble.stopScanning();
    noble.startScanning();
  })
  .withStyle(styles.scanButton)
  .build();

class BleSelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArr: [],
      bleServices: [],
    };
    bleScreen = this;
  }

  buttonPress(txt) {
    console.log('Button pressed ' + txt);
  }

  render() {
    let Arr = this.state.myArr.map((a, i) => {
      return <PlainRaisedButton key={i} onPress={() => this.buttonPress(a)}><Text pointerEvents="none" style={styles.buttonText}>{a}</Text></PlainRaisedButton>
    })
    return (
      <View>
        <ScanButton />
        { Arr }
      </View>
    );
  }

  componentWillMount() {
    noble.on('stateChange', this._onStateChange);
    noble.on('discover', this._onDiscover);
  }
  _onStateChange(state) {
    if (state === 'poweredOn') {
      console.log('Start scan.....');
      noble.startScanning();
    } else {
      console.log("Stop scan....");
      noble.stopScanning();
    }
  }

  _onDiscover(peripheral) {
    console.log('peripheral discovered (' + peripheral.id +
      ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
      ' connectable ' + peripheral.connectable + ',' +
      ' RSSI ' + peripheral.rssi + ':');
    console.log('\thello my local name is:');
    console.log('\t\t' + peripheral.advertisement.localName);


    // Check & add into RC CAR list
    for (var i = peripheral.advertisement.serviceUuids.length - 1; i >= 0; i--) {
      if (peripheral.advertisement.serviceUuids[i] === '1234567812345678123456789abcdef0') {
        bleScreen.state.bleServices.push(peripheral);
        console.log("\t===This contains RC CAR service===");
        bleScreen.state.myArr.push(peripheral.advertisement.localName);
        bleScreen.setState({
            myArr: bleScreen.state.myArr
        });
      }
    }

    console.log('\tcan I interest you in any of the following advertised services:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
      console.log('\there is my service data:');
      for (var i in serviceData) {
        console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
      }
    }

    if (peripheral.advertisement.manufacturerData) {
      console.log('\there is my manufacturer data:');
      console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
      console.log('\tmy TX power level is:');
      console.log('\t\t' + peripheral.advertisement.txPowerLevel);
    }
    console.log();
  }
}

module.exports = BleSelectScreen;
