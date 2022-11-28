import 'react-native-gesture-handler';
import React, { useState } from "react"
//join, Login import
import Join from './Pages/SignUp/Join';
import Login from './Pages/SignUp/Login';
import AffectDetail from './Pages/Boards/Affect/AffectDetail';
import AffectMain from './Pages/Boards/Affect/AffectMain';
import DonateDetail from './Pages/Boards/Donate/DonateDetail';
import DonateMain from './Pages/Boards/Donate/DonateMain';
import FindMeDetail from './Pages/Boards/FindMe/FindMeDetail';
import FindMeMain from './Pages/Boards/FindMe/FindMeMain';
import FreeBoardDetail from './Pages/Boards/FreeBoard/FreeBoardDetail';
import FreeBoardMain from './Pages/Boards/FreeBoard/FreeBoardMain';
import CalenderDetail from './Pages/Calender/CalenderDetail';
import CalenderMain from './Pages/Calender/CalenderMain';
import Main from './Pages/Main/Main';
import MainMenu from './Pages/Main/MainMenu';
import EndWalk from './Pages/Map/EndWalk';
import StartWalk from './Pages/Map/StartWalk';
import Walk from './Pages/Map/Walk';
import WalkTogether from './Pages/Map/WalkTogether';
import MyPage from './Pages/MyPage/MyPage';
import AddAnimal from './Pages/MyPage/AddAnimal';
import AddFood from './Pages/MyPage/AddFood';
import Play from './Pages/MyPage/Play';
import NewsMain from './Pages/News/NewsMain';
import NewsDetail from './Pages/News/NewsDetail';
import Ranking from './Pages/Ranking/Ranking';
import SkinMain from './Pages/Skin/SkinMain';
import SkinResult from './Pages/Skin/SkinResult';
import BottomTab from './Components/BottomTab';
import SplashScreen from './Pages/SignUp/SplashScreen.js';
import DrawerNavigater from './Components/DrawerNavigater';


import { Text, View, Button, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{headerShown: false}}
      />
      {/* Auth Navigator: Include Login and Signup */}
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="DrawerNavigater"
        component={DrawerNavigater}
        // Hiding header for Navigation Drawer
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
};









