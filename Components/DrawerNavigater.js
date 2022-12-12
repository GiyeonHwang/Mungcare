import React from "react";
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem, } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { CommonActions} from '@react-navigation/native';
import { NavigationActions } from "@react-navigation/native";



import BottomTab from "./BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyPage from "../Pages/MyPage/MyPage";
import FreeBoardMain from "../Pages/Boards/FreeBoard/FreeBoardMain";
import Icon from "react-native-vector-icons/Ionicons";
import MenuButton from "./MenuButton";
import Login from "../Pages/SignUp/Login";


import * as Update from 'expo-updates';
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

// const Logout=({navigation})=>{
//   Alert.alert("잠깐만요!", "로그아웃 하실건가요?", [
//     {
//       text: "아니요",
//       onPress: ({navigation}) => null,
//     },
//     { text: "예", onPress: ({navigation}) => {
//       AsyncStorage.removeItem('id');
//       navigation.navigate('Login')
//     }}
//   ]);
// };

// function Restart(){
// Update.reloadAsync();
// }




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
      <DrawerItem label="게시판들!" onPress={() => goToStack("MainBoard")} />
      <DrawerItem label="글쓰기" onPress={() => goToStack("글쓰기")} />
      <DrawerItem label="Mypage"onPress={() => goToStack("마이페이지")}/>
      <DrawerItem label="로그아웃" onPress={() => 
        Alert.alert("잠깐만요!", "로그아웃 하실건가요?", [
          {
            text: "아니요",
            onPress: () => null,
          },
          { text: "예", onPress: () => {
            AsyncStorage.removeItem('id').then(navigation.navigate('SplashScreen'));
          }}
        ])
       }/>
    </DrawerContentScrollView>
  );
};


const DrawerNavigater = () => {




  return (
    <Drawer.Navigator 
      screenOptions={{
      drawerStyle: {
        backgroundColor: '#F2F2F2',
      },
      }}
      drawerContent={({ navigation }) => (
      <CustomDrawer navigation={navigation} />
    )}>
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigater;