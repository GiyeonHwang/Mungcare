import 'react-native-gesture-handler';
import React from "react"
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
import NewsDetail from './Pages/News/NewsDetail';
import NewsMain from './Pages/News/NewsMain';
import Ranking from './Pages/Ranking/Ranking';
import SkinMain from './Pages/Skin/SkinMain';
import SkinResult from './Pages/Skin/SkinResult';








import { Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


function Home({navigation}){//Home함수는 페이지 확인용입니다.
  return(
    <ScrollView>
      <Text>Join</Text>
      <Button title="회원가입 페이지로 이동" 
        onPress={()=>{
          navigation.navigate('Join')
        }}
      />
      <Text>Login</Text>
      <Button title="로그인 페이지로 이동" 
        onPress={()=>{
          navigation.navigate('Login')
        }}
      />
      <Text>AffectMain</Text>
      <Button title="어펙트메인으로 이동" 
        onPress={()=>{
          navigation.navigate('AffectMain')
        }}
      />
      <Text>DonateMain</Text>
      <Button title="도네이트메인으로 이동" 
        onPress={()=>{
          navigation.navigate('DonateMain')
        }}
      />
      <Text>FindMe</Text>
      <Button title="찾아주세요메인으로 이동" 
        onPress={()=>{
          navigation.navigate('FindMeMain')
        }}
      />
      <Text>FreeBoard</Text>
      <Button title="자유게시판으로 이동" 
        onPress={()=>{
          navigation.navigate('FreeBoardMain')
        }}
      />
      <Text>Calender</Text>
      <Button title="캘린더 메인으로 이동" 
        onPress={()=>{
          navigation.navigate('CalenderMain')
        }}
      />
      <Text>Main</Text>
      <Button title="메인페이지로 이동" 
        onPress={()=>{
          navigation.navigate('Main')
        }}
      />
      <Text>Walk</Text>
      <Button title="Walk 페이지로 이동" 
        onPress={()=>{
          navigation.navigate('Walk')
        }}       
      />
      <Text>Mypage</Text>
      <Button title="마이페이지로 이동" 
        onPress={()=>{
          navigation.navigate('MyPage');
        }}       
      />
      <Text>News</Text>
      <Button title="뉴스로 이동" 
        onPress={()=>{
          navigation.navigate('NewsMain');
        }}       
      />
      <Text>Ranking</Text>
      <Button title="랭킹으로 이동" 
        onPress={()=>{
          navigation.navigate('Ranking');
        }}       
      />
      <Text>Skin</Text>
      <Button title="피부 메인페이지로 이동" 
        onPress={()=>{
          navigation.navigate('SkinMain');
        }}       
      />
    </ScrollView>
  )
}


export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />



      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Join" component={Join} />
      <Stack.Screen name="AffectMain" component={AffectMain} />
      <Stack.Screen name="DonateMain" component={DonateMain} />
      <Stack.Screen name="FindMeMain" component={FindMeMain} />
      <Stack.Screen name="FreeBoardMain" component={FreeBoardMain} />
      <Stack.Screen name="CalenderMain" component={CalenderMain} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Walk" component={Walk} />
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="NewsMain" component={NewsMain} />
      <Stack.Screen name="Ranking" component={Ranking} />
      <Stack.Screen name="SkinMain" component={SkinMain} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
