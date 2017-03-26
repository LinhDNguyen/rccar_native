'use strict';

import React , {Component} from 'react';
import
{
  View,
  Navigator,
  Text,
  TouchableHighlight,
} from 'react-native';

const BleSelectScreen = require('./screens/BleSelect');
const CarMoveScreen = require('./screens/CarMove');
const CarSoundScreen = require('./screens/CarSound');

class DARNNavigator extends React.Component{
  constructor(props) {
  super(props);
  }

  render() {
    var initialRouteID = 'first';
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{id: initialRouteID}}
        renderScene={this.navigatorRenderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  return (
                    <TouchableHighlight onPress={() => navigator.push({id: 'first'})}>
                    <Text>BLE Select</Text>
                    </TouchableHighlight>);
                },
              RightButton: (route, navigator, index, navState) =>
                {
                  return (
                    <TouchableHighlight onPress={() => navigator.push({id: 'third'})}>
                    <Text>Car Sound</Text>
                    </TouchableHighlight>);
                },
              Title: (route, navigator, index, navState) =>
                {
                  return (
                    <TouchableHighlight onPress={() => navigator.push({id: 'second'})}>
                    <Text>Car Move</Text>
                    </TouchableHighlight>);
                },
            }}
            style={{backgroundColor: 'gray'}}
          />
        }/>
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'first':
        return (<BleSelectScreen navigator={navigator} route={route} title="BLE Select"/>);
      case 'second':
        return (<CarMoveScreen navigator={navigator} route={route} title="Car Move"/>);
      case 'third':
        return (<CarSoundScreen navigator={navigator} route={route} title="Car Sound"/>);

    }
  }
}


module.exports = DARNNavigator;
