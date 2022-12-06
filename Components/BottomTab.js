import * as React from 'react';
import { Text, View, BackHandler, ScrollView, Alert,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";

import Main from '../Pages/Main/Main';
import MainBoard from '../Pages/Boards/MainBoard';
import AffectMain from '../Pages/Boards/Affect/AffectMain';
import DonateMain from '../Pages/Boards/Donate/DonateMain';
import FindMeMain from '../Pages/Boards/FindMe/FindMeMain';
import FindMeDetail from '../Pages/Boards/FindMe/FindMeDetail';
import FreeBoardMain from '../Pages/Boards/FreeBoard/FreeBoardMain';
import FreeBoardDetail from '../Pages/Boards/FreeBoard/FreeBoardDetail';
import CalenderMain from '../Pages/Calender/CalenderMain';
import CalenderDetail from '../Pages/Calender/CalenderDetail';
import Walk from '../Pages/Map/Walk';
import WalkTogether from '../Pages/Map/WalkTogether';
import MyPage from '../Pages/MyPage/MyPage';
import Food from '../Pages/MyPage/Food';
import AddAnimal from '../Pages/MyPage/AddAnimal';
import ModifyAnimal from '../Pages/MyPage/ModifyAnimal';
import AnimalList from '../Pages/MyPage/AnimalList';
import AddFood from '../Pages/MyPage/AddFood';
import Play from '../Pages/MyPage/Play';
import NewsMain from '../Pages/News/NewsMain';
import NewsDetail from '../Pages/News/NewsDetail';
import Ranking from '../Pages/Ranking/Ranking';
import SkinMain from '../Pages/Skin/SkinMain';
import SkinResult from '../Pages/Skin/SkinResult';
import MenuButton from "./MenuButton";
import Write from '../Pages/Boards/Write';
import Login from '../Pages/SignUp/Login';
import Join from '../Pages/SignUp/Join';
import MyInfo from '../Pages/MyPage/MyInfo';
import MyPageModify from '../Pages/MyPage/MyPageModify';
import AnimalDetail from '../Pages/MyPage/AnimalDetail';
import FreeView from './FreeView';
import ModifyBoard from './ModifyBoard';
import MapInfo from '../Pages/Map/MapInfo';
const Tab = createBottomTabNavigator();

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();
const WriteStack = createStackNavigator();
const LoginStack = createStackNavigator();

// 스크린 컴포넌트에  options={{headerLeft: () => <MenuButton navigation={navigation} />,}} 
// 위와같이 코드를 넣으면 해당 페이지 상단에 메뉴버튼 생성



// useEffect(async ()=>{
//   const value = await AsyncStorage.getItem('id');
//   console.log("로그인?" ,value)
//   if(value){
//     setinLogin("Main");
//   }
//   else{
//     setinLogin("Login");
//   }
// },[])


// const getData = async (route) => {
//   try {
//     const value = await AsyncStorage.getItem('id');
//     if (value == null) {
//       console.log("아이디?", value);
//       return "Login";
//     }
//     else {
//       return "Main";
//     }
//   } catch (e) {
//     console.log("getData 실패");
//   }
// }



const MainStackScreen = ({ navigation }) => {



  return (
    <MainStack.Navigator>
      {/* <MainStack.Screen name="Login" component={Login} options={{
      headerLeft: () => <MenuButton />,}}/>
      <MainStack.Screen name="Join" component={Join} options={{}}/> */}

      <MainStack.Screen name="Main" component={Main} options={{
        headerLeft: () => <MenuButton />,
        headerTitle:"멍케어!",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,

        },
        headerStyle: { 
          backgroundColor: '#F2F2F2',
          borderBottomWidth:1,
          borderColor:"black"
        },
        headerTitleAlign:"center",
      }} />
      <MainStack.Screen name="MainBoard" component={MainBoard} />
      <MainStack.Screen name="AffectMain" component={AffectMain} />
      <MainStack.Screen name="DonateMain" component={DonateMain} />
      <MainStack.Screen name="FindMeMain" component={FindMeMain} />
      <MainStack.Screen name="CalenderMain" component={CalenderMain} />
      <MainStack.Screen name="FreeBoardMain" component={FreeBoardMain} />
      {/*MAP 병원 위치*/}
      <MainStack.Screen name="MapInfo" component={MapInfo}/>
      {/*-->  디테일 페이지들도 임포트하고 넣어줘야함 <--*/}
      {/*--> 함께하는 공간 자리<--*/}
      <MainStack.Screen name="Walk" component={Walk} />
      <MainStack.Screen name="WalkTogether" component={WalkTogether}/>
      <MainStack.Screen name="Ranking" component={Ranking} />
      <MainStack.Screen name="SkinMain" component={SkinMain} />
      <MainStack.Screen name="MyPage" component={MyPage} />
      {/* 애완동물 리스트 */}
      <MainStack.Screen name="AnimalList" component={AnimalList}/>
      {/* 애완동물 추가 */}
      <MainStack.Screen name="AddAnimal" component={AddAnimal}/>
      {/* 애완동물 수정 */}
      <MainStack.Screen name="ModifyAnimal" component={ModifyAnimal}/>
      {/* 놀기 */}
      <MainStack.Screen name="Play" component={Play}/> 

      <MainStack.Screen name="Food" component={Food} />
      <MainStack.Screen name="FreeBoardDetail" component={FreeBoardDetail}/>
      <MainStack.Screen name="FindMeDetail" component={FindMeDetail} />
      <MainStack.Screen name="ModifyBoard" component={ModifyBoard} options={{}}/>
      {/* <MainStack.Screen name="Login" component={Login}  options={{headerShown: false ,tabBarStyle: {display: 'none'}}}/> */}
    </MainStack.Navigator>
  );
}


// const FreeStackScreen = ({ navigation }) => {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="FreeBoardMain" component={FreeBoardMain}
//         options={{
//           headerLeft: () => <MenuButton />,
//         }} />
//       <HomeStack.Screen name="FreeBoardDetail" component={FreeBoardDetail} />
//       <HomeStack.Screen name="FreeView" component={FreeView} />
//     </HomeStack.Navigator>
//   );
// }


const MyPageStackScreen = ({ navigation }) => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPage}
      options={{
        headerLeft: () => <MenuButton/>,
      }} />
      <MyPageStack.Screen name="MyPageModify" component={MyPageModify} />
      <MyPageStack.Screen name="MyInfo" component={MyInfo}/>
    </MyPageStack.Navigator>
  );
}


const WriteStackScreen = ({ navigation }) => {
  return (
    <WriteStack.Navigator>
      <WriteStack.Screen name="Write" component={Write}
        options={{
          headerLeft: () => <MenuButton />,
        }} />
    </WriteStack.Navigator>
  );
}







const BottomTab = (route) => {



  // tabBarStyle: { display: getRoute(route) }, 
  return (
    <Tab.Navigator initialRouteName="Main"
   
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:{backgroundColor:'#F2F2F2'}
    }}
    >
      <Tab.Screen name="메인" component={MainStackScreen}
      
        options={{headerShown:false,
          tabBarIcon: () => (
            <Icon name="ios-home"size={26} />
          ),
        }}
       />
      <Tab.Screen name="글쓰기" component={WriteStackScreen}
        options={{headerShown:false,
          tabBarIcon: () => (
            <Icon name="create"size={26} />
          ),
        }} />
      
      <Tab.Screen name="마이페이지" component={MyPageStackScreen}
       options={{headerShown:false,
        tabBarIcon: () => (
          <Icon name="person"size={26} />
        ),
      }}/>
    </Tab.Navigator>
  );
};
export default BottomTab;






// //하단 탭바 숨기기를 위한 함수
// const getRoute = (route) => { //라우트로 페이지들을 받아와서 해당 페이지의 name이리면 실행
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login';
//   console.log("현재 라우트1:", routeName)
//   if (routeName === 'Login' || routeName === 'Join') { //로그인과 조인 화면에 대해 tabBar none을 설정한다.
//     return "none";
//   }
//   else {
//     return "flex";
//   }
// };
