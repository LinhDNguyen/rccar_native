'use strict';

import noble from 'react-native-ble';

var connected = undefined;
var scan_list = [];
var send_fail_list = [];
var _state = 0;
var scan_callback = undefined;

var _onStateChange = function(state) {
  if (state === 'poweredOn') {
    console.log("StateChange: Power On");
    _state = 1;
  } else {
    console.log("Stop scan....");
    _state = 0;
    noble.stopScanning();
  }
}

var _onDiscover = function(peripheral) {
  console.log('peripheral discovered (' + peripheral.id +
    ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
    ' connectable ' + peripheral.connectable + ',' +
    ' RSSI ' + peripheral.rssi + ':');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);


  // Check & add into RC CAR list
  for (var i = peripheral.advertisement.serviceUuids.length - 1; i >= 0; i--) {
    if (peripheral.advertisement.serviceUuids[i] === '1234567812345678123456789abcdef0') {
      console.log("\t===This contains RC CAR service===");
      // Check if scan list not contains this
      var is_existed = false;
      for (var i = 0; i < scan_list.length; i++) {
        if (scan_list[i].address === peripheral.address) {
          is_existed = true;
          break;
        }
      }
      if (!is_existed) {
        scan_list.push(peripheral);
      }
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

  if (scan_callback != undefined) {
    scan_callback(scan_list);
  }
}

var initialize = function() {
  console.log("rccar_ble: init");
  noble.on('stateChange', _onStateChange);
  noble.on('discover', _onDiscover);
}

var start_scan = function(callback) {
  console.log('Start scan.....');
  scan_list = [];
  scan_callback = callback;
  noble.stopScanning();
  noble.startScanning();
}

var write_move = function(angle, power) {

}

var write_sound = function(code, volume) {

}

var connect = function(ble) {

}

var disconnect = function() {

}

var get_status = function() {

}

module.exports = {
  start_scan: start_scan,
  write_move: write_move,
  write_sound: write_sound,
  connect: connect,
  disconnect: disconnect,
  get_status: get_status,
  init: initialize
};