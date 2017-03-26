/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

const BleSelectScreen = require('./screens/BleSelect');
const CarMoveScreen = require('./screens/CarMove');
const CarSoundScreen = require('./screens/CarSound');
const SettingScreen = require('./screens/Setting');

export default class RCCarNative extends Component {
  render() {
    return <ScrollableTabView
      style={{marginTop: 20, }}
      renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
    >
      <BleSelectScreen tabLabel='BLE Select' />
      <CarMoveScreen tabLabel='Car Move'/>
      <CarSoundScreen tabLabel='Car Sound'/>
      <SettingScreen tabLabel='Settings' />
    </ScrollableTabView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 30,
  },
});

AppRegistry.registerComponent('RCCarNative', () => RCCarNative);
