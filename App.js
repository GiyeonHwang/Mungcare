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

import DrawerNavigater from './Components/DrawerNavigater';


import { Text, View, Button, ScrollView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();


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

// const [userToken, setuserToken] = useState("");


// React.useEffect(() => {
//   // Storage에서 토큰 가져옴, 다른 화면으로 네비게이트
//   const bootstrapAsync = async () => {
//     let userToken2
//     try {
//       userToken2 = await AsyncStorage.getItem('id')
//       setuserToken(userToken2);
//     } catch (e) {
//       // 토큰 가져오기 실패 FIXME: alert해주기
//     }

//     // FIXME: 토큰 유효한지 확인해주기

//     // 스크린 언마운트됨, 버려짐
//     // dispatch({ type: 'RESTORE_TOKEN', token: userToken })
//   }

//   bootstrapAsync()
// }, [])

// const LoginStackScreen = ({ navigation }) => {
//   return (
//     <LoginStack.Navigator>
//       <LoginStack.Screen name="Login" component={Login}/>
//       <LoginStack.Screen name="Join" component={Join}/>
//     </LoginStack.Navigator>
//   );
// }


export default function App(){

  const [Token, setToken] = useState(0);

  React.useEffect(() => {
    // Storage에서 토큰 가져옴, 다른 화면으로 네비게이트
    const bootstrapAsync = async () => {
      let userToken
      try {
        userToken = await AsyncStorage.getItem('id')
        setToken(userToken);
      } catch (e) {
        // 토큰 가져오기 실패 FIXME: alert해주기
      }
  
      // FIXME: 토큰 유효한지 확인해주기
  
      // 스크린 언마운트됨, 버려짐
      // dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }
  
    bootstrapAsync()
  }, [])






  return(
    <NavigationContainer>
      {/* <Stack.Navigator>
      {userToken === null ?(
        <Stack.Screen name="Login" component={Login} />
      ) : (
      <Stack.Screen name="DrawerNavigater" component={DrawerNavigater} />
      )}
      </Stack.Navigator> */}

      { Token ? (
            // <Drawer.Navigator>
            //     <Drawer.Screen name="Main" component={StackHome} />
            //     <Drawer.Screen name="Board" component={BoardStack} />
            //     <Drawer.Screen name="UserInfo" component={UserPage} />
            // </Drawer.Navigator>
            <DrawerNavigater/>
        ) : (
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Join" component={Join} />
              <Stack.Screen name ="DrawerNavigater" component={DrawerNavigater}/>
            </>
          </Stack.Navigator>
        )}
    </NavigationContainer>    
  )
}
