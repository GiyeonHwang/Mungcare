import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
// import React from "react";
// import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert } from 'react-native';
import Constants from 'expo-constants';

// // import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import * as React from 'react';
import { WebView } from 'react-native-webview';
export default class SkinMain extends React.Component{
  render() {
    return (
      <WebView
        source={{uri: 'https://rhj7513.github.io/AITest/web/'}}
        style={{marginTop: 20}}
      />
    );
  }
}

// class MyWeb extends Component {
//   render() {
//     return (
//       <WebView
//         source={{uri: 'https://rhj7513.github.io/AITest/web/'}}
//         style={{marginTop: 20}}
//       />
//     );
//   }
// }

