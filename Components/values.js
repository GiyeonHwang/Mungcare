import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';




export const BUTTON_HEIGHT = Dimensions.get('window').height * 0.1; 
export const VIEW_WIDTH = 250;
export const GAP = 12;
export const MERIDIEM_ITEMS = ['오전', '오후'];
export const HOUR_ITEMS = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
];
export const MINUTE_ITEMS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];