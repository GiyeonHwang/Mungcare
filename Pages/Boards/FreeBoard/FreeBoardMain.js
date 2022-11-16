import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , ScrollView,SafeAreaView, StyleSheet, TextInput , Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import FreeView from '../../../Components/FreeView';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


export default function FreeBoardMain(navigation){
    return(
    <View style={styles.container}>
        <View>
          <FreeView/>
        </View>
       
    </View>  
    )
}

const styles = StyleSheet.create({
  container: {
      width: "100%",  
      height:"100%",
  },

});


