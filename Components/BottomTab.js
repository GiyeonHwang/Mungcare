import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../Pages/Main/Main';
import MainBoard from '../Pages/Boards/MainBoard';
import AffectMain from '../Pages/Boards/Affect/AffectMain';
import DonateMain from '../Pages/Boards/Donate/DonateMain';
import FindMeMain from '../Pages/Boards/FindMe/FindMeMain';
import FreeBoardMain from '../Pages/Boards/FreeBoard/FreeBoardMain';
import FreeBoardDetail from '../Pages/Boards/FreeBoard/FreeBoardDetail';
import CalenderMain from '../Pages/Calender/CalenderMain';
import CalenderDetail from '../Pages/Calender/CalenderDetail';
import Walk from '../Pages/Map/Walk';
import WalkTogether from '../Pages/Map/WalkTogether';
import MyPage from '../Pages/MyPage/MyPage';
import AddAnimal from '../Pages/MyPage/AddAnimal';
import AddFood from '../Pages/MyPage/AddFood';
import Play from '../Pages/MyPage/Play';
import NewsMain from '../Pages/News/NewsMain';
import NewsDetail from '../Pages/News/NewsDetail';
import Ranking from '../Pages/Ranking/Ranking';
import SkinMain from '../Pages/Skin/SkinMain';
import SkinResult from '../Pages/Skin/SkinResult';
import { MenuButton } from "./DrawerNavigater";

const Tab = createBottomTabNavigator();

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();



// 스크린 컴포넌트에  options={{headerLeft: () => <MenuButton navigation={navigation} />,}} 
// 위와같이 코드를 넣으면 해당 페이지 상단에 메뉴버튼 생성됨

const MainStackScreen = ({ navigation }) => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Main" component={Main} options={{
        headerLeft: () => <MenuButton navigation={navigation} />,
      }} />
      <MainStack.Screen name="MainBoard" component={MainBoard}/>
      <MainStack.Screen name="AffectMain" component={AffectMain}/>
      <MainStack.Screen name="DonateMain" component={DonateMain}/>
      <MainStack.Screen name="FindMeMain" component={FindMeMain}/>
      <MainStack.Screen name="FreeBoardMain" component={FreeBoardMain}/>
      <MainStack.Screen name="CalenderMain" component={CalenderMain}/>
      {/*-->  디테일 페이지들도 임포트하고 넣어줘야함 <--*/}
      {/*--> 함께하는 공간 자리<--*/}
      <MainStack.Screen name="Walk" component={Walk}/>
      <MainStack.Screen name="Ranking" component={Ranking}/>
      <MainStack.Screen name="SkinMain" component={SkinMain}/>
      <MainStack.Screen name="MyPage" component={MyPage}/>
    </MainStack.Navigator>
  );
}


const FreeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="FreeBoardMain" component={FreeBoardMain}/>
      <HomeStack.Screen name="FreeBoardDetail" component={FreeBoardDetail}/>
    </HomeStack.Navigator>
  );
}

const MyPageStackScreen = ({ navigation }) => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPage}/>
    </MyPageStack.Navigator>
  );
}


const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="메인" component={MainStackScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="자유게시판" component={FreeStackScreen}  options={{headerShown: false}}/>
      <Tab.Screen name="마이페이지" component={MyPageStackScreen}  options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};
export default BottomTab;