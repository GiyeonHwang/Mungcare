import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList, TextInput, Button, RefreshControl, Dimensions, Alert, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import FreeView from '../../Components/FreeView';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ServerPort from '../../Components/ServerPort';

//날씨 api키
const API_KEY = "204756a8614d5d5f3d4e6544f1cd8c7d"

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Main({ navigation }) {


  //새로고침 함수
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //여기까지 새로고침

  const [frData, setFrData] = React.useState([]);
  const isFocused = useIsFocused(); // isFoucesd Define
  
  const IP = ServerPort();
  
  //날씨
  const [weather,setWeather] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [id,setId] = React.useState("");
  const [data, setData] = React.useState(); //애완동물 리스트 확인

  const selectList = () => {
    axios.post(`${IP}/board/search`, null, {
      params: {
        page: 1,
        size: 10,
        type: "type",
        keyword: "자유게시판"
      }
    })
      .then(function (res) {
        setFrData(res.data.dtoList);
       
      })
      .catch(function (error) {
        console.log("게시판 전체 데이터 가져오기 실패: ", error)
      })
  }
  React.useEffect(() => {
    selectList();
  }, [isFocused])

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: frData.bno });
  }

  useEffect(()=>{
    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      let addresscheck = await Location.reverseGeocodeAsync(location.coords);
      console.log(addresscheck)
      setAddress(addresscheck)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(5)}&lon=${location.coords.longitude.toFixed(5)}&appid=${API_KEY}&units=metric`);
      const res = await response.json()
      console.log(res)
      setWeather(res)
      await info()
    })();
  },[])

  

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
          },
          { text: "확인", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();

    }, []))

    const info = async () => {

      const ID = await load();
      // 서버에 요청
      // 애완동물 목록 불러오기
      console.log("ID : " , ID);
      axios.post(`${IP}/animal/list`, null, {
          params: {
              id: ID //sessionStorage에 있는 id값
          }
      })
          .then(res => {
              console.log(res.data);
              setData(res.data);
          })
          .catch(function (error) {
              console.log("AnimallList DB연동 실패,,,,",error);
          })
  }

  const load = async () => {
    try{
        const id = await AsyncStorage.getItem('id');
        console.log(id);
        setId(id);
        return id;
    }
    catch(e)
    {
        console.log("로드 에러" , e);
    }
}

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
      >
        <View style={{ width: Dimensions.get('window').width * 1 }}>
          <View style={{ width: "100%", height: Dimensions.get('window').height * 0.6 , alignItems:'center'}}>
            <View style={styles.weathertab}>
              {
                weather != "" ?
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Text style={{ color: 'gray' }}>     {address[0].district} </Text>
                      <Text style={{ fontSize: 20, fontStyle: 'bold', }}> {weather.main.temp.toFixed(0)}°C       </Text>
                    </View>
                    <Image style={{ width: '20%', height: '100%' }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />
                    <Text>{weather.weather[0].main}</Text>
                  </>
                  :
                  <ActivityIndicator />
              }
            </View>

            {/* 상단바 */}
            <View style={styles.topicon}>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => navigation.navigate('MainBoard')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/icon1.png')}></Image>
                </View>
                <Text>게시판</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => navigation.navigate('CalenderMain')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/icon2.png')}></Image>
                </View>
                <Text>캘린더</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => navigation.navigate('SkinMain')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/icon3.png')}></Image>
                </View>
                <Text>피부진단</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => navigation.navigate('MapInfo')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/icon4.png')}></Image>
                </View>
                <Text>주변뭐뭐머</Text>
              </TouchableOpacity>
            </View>

            {/* 산책하기 */}
            <TouchableOpacity 
                style={styles.walkview}
                onPress={() => {
                  data[0] != null ? navigation.navigate('Walk') : Alert.alert("애완동물을 등록해주세요!")
                }}
              >
              <View style={{ width: '100%', height: '100%', }}>
                <Image style={styles.icon} source={require('../../assets/images/main/Walk.png')}></Image>
              </View>
            </TouchableOpacity>

            {/* 하단클릭바 */}
            <View style={styles.secondview}>
              <TouchableOpacity
                style={{ height: '100%', width: '30%', alignItems:'center' }}
                onPress={() => navigation.navigate('Review')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/review.png')}></Image>
                </View>
                <Text>리뷰보기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '100%', width: '30%', alignItems:'center' }}
                onPress={() => navigation.navigate('Play')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/play.png')}></Image>
                </View>
                <Text>놀아주기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '100%', width: '30%', alignItems:'center' }}
                onPress={() => navigation.navigate('Ranking')}
              >
                <View style={{ width: '100%', height: '100%', }}>
                  <Image style={styles.icon} source={require('../../assets/images/main/rangking.png')}></Image>
                </View>
                <Text>최고의견주</Text>
              </TouchableOpacity>
            </View>
            {/* 하단선 */}
            <View style={{borderBottomColor:'gray', borderBottomWidth :2, width:'85%', height:'5%', marginBottom:15}}>

            </View>
          </View>

          {/* 맵을 2개 돌려서 id가 짝수는 왼쪽 홀수는 오른쪽에 렌더링해주기 */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ padding: 10, marginTop: 10 }}>
              {frData.filter((_, i) => i % 2 === 0).map((e) => (
                <FreeView key={e.bno} {...e} />
              )
              )
              }
            </View>
            <View style={{ padding: 10, marginTop: 10 }}>

              {frData.filter((_, i) => i % 2 !== 0).map((e) => (
                <FreeView key={e.bno} {...e} />
              )
              )
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {

    flexWrap: "wrap",
    marginTop: 8,
    backgroundColor: "aliceblue",
    maxHeight: 400,
  },
  weathertab : {
    width:'100%', 
    height:Dimensions.get('window').height * 0.08, 
    backgroundColor:'white',
    marginBottom:15,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  topicon:{
    width: '90%', 
    height:'20%', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    padding:10, 
    borderWidth:3, 
    borderColor:'#FFAF9B',
    marginBottom:15,
  },
  icons : {
    width:'20%', 
    height:'90%', 
    alignItems:'center', 
  },
  icon : {
    resizeMode: "cover", 
    width: '100%', 
    height: '100%', 
    borderRadius: 15,
  },
  walkview :{
    width:'90%', 
    height:'25%',
    marginBottom :15,
  },
  secondview:{
    width: '90%', 
    height: '20%', 
    marginBottom: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },

})