import 'react-native-gesture-handler';
import React from "react";


//페이지 import
import Join from './Join';


import { Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "react-navigation-stack";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Login(navigation){
    return(
    <View>
      <Text>Login</Text>
    </View>
    )

}