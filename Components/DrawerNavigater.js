import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import BottomTab from "./BottomTab";
import MyPage from "../Pages/MyPage/MyPage";
import Icon from "react-native-vector-icons/Ionicons";


const Drawer = createDrawerNavigator();

export const MenuButton = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableOpacity>
      <Icon
        name="ios-menu"
        onPress={openMenu}
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      />
    </TouchableOpacity>
  );
};

const MyPageStack = createStackNavigator();
const MyPageStackScreen = ({ navigation }) => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          headerLeft: () => <MenuButton navigation={navigation} />,
        }}
      />
    </MyPageStack.Navigator>
  );
};

const DrawerNavigater = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
      <Drawer.Screen name="MyPage" component={MyPageStackScreen} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigater;