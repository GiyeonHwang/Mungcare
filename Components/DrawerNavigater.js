import React from "react";
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem, } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import BottomTab from "./BottomTab";
import MyPage from "../Pages/MyPage/MyPage";
import FreeBoardMain from "../Pages/Boards/FreeBoard/FreeBoardMain";
import Icon from "react-native-vector-icons/Ionicons";
import MenuButton from "./MenuButton";


const Drawer = createDrawerNavigator();


// const MyPageStack = createStackNavigator();
// const MyPageStackScreen = ({ navigation }) => {
//   return (
//     <MyPageStack.Navigator>
//       <MyPageStack.Screen
//         name="MyPageScreen"
//         component={MyPage}
//         options={{
//           headerLeft: () => <MenuButton/>,
//         }}
//       />
//     </MyPageStack.Navigator>
//   );
// };

// const FreeBoardStack = createStackNavigator();
// const FreeBoardStackScreen = ({ navigation }) => {
//   return (
//     <FreeBoardStack.Navigator>
//       <FreeBoardStack.Screen
//         name="FreeBoardMain"
//         component={FreeBoardMain}
//         options={{
//           headerLeft: () => <MenuButton/>,
//         }}
//       />
//     </FreeBoardStack.Navigator>
//   );
// };

const CustomDrawer = ({ navigation }) => {
  const goToStack = (stackName) => {
    navigation.navigate(stackName);
  };
  return (
    <DrawerContentScrollView>
      <DrawerItem
        icon={() => <Icon name="ios-home" size={24} />}
        label="Main"
        onPress={() => goToStack("메인")}
        style={{
          borderBottomWidth: 1,
          borderRadius: 0,
          borderColor: "#ccc",
        }}
      />
      <DrawerItem label="자유게시판" onPress={() => goToStack("자유게시판")} />
      <DrawerItem label="Mypage"onPress={() => goToStack("마이페이지")}/>
    </DrawerContentScrollView>
  );
};


const DrawerNavigater = () => {
  return (
    <Drawer.Navigator 
      drawerContent={({ navigation }) => (
      <CustomDrawer navigation={navigation} />
    )}>
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
      {/* <Drawer.Screen name="FreeBoardStackScreen" component={FreeBoardStackScreen} options={{headerShown: false}} />
      <Drawer.Screen name="MyPage" component={MyPageStackScreen} options={{headerShown: false}} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigater;