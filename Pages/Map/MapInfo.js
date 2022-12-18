import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, Pressable, TouchableOpacity, Alert, Linking, Image } from 'react-native';
import * as Location from 'expo-location';
// import { markerdata } from "./markerData.js";
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import ServerPort from '../../Components/ServerPort';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import tell from '../../assets/images/tell.png';
import BottomSheet from 'reanimated-bottom-sheet';

const Stack = createStackNavigator();
const IP = ServerPort();

const MapInfo = (navigation) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    // latitude: 36.7987869, //위도
    // longitude: 127.0757584, //경도
    // latitudeDelta: 0.005, //확대되는 범위
    // longitudeDelta: 0.005, //확대되는 범위
  });

  const [region, setRegion] = React.useState([]); //병원 목록
  const [around, setAround] = React.useState([]); //내 위치 기준 주변 병원 목록

  const [welfare, setWelfare] = React.useState([]); //장묘업 목록
  const [wAround, setWAround] = React.useState([]); //내 위치 기준 주변 장묘업 목록

  const [pharmacy, setPharmacy] = React.useState([]); //약국 목록 
  const [pAround, setPAround] = React.useState([]); //내 위치 기준 주변 약국 목록

  const [beauty, setBeauty] = React.useState([]); //미용실 목록
  const [bAround, setBAround] = React.useState([]); //내 위치 기준 주변 미용실 목록

  const [hotel, setHotel] = React.useState([]); //호텔 목록
  const [hAround, setHAround] = React.useState([]); //내 위치 기준 주변 호텔 목록

  const [what, setWhat] = React.useState(""); //어떤 것을 찾는지 저장

  // bottomsheet
  const sheetRef = React.useRef(null);

  const [data, setData] = React.useState("");
  const [all, setAll] = React.useState("");
  const [color, setColor] = React.useState("");
  const mapRef = useRef(null);

  React.useEffect(() => { //병원 목록 가져오기
    (async () => {
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setmapRegion({ //현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
    })();
  }, []);





  const myLocation = () => //내 주변 병원 목록 가져오기
  {
    console.log("myLocation--------------------", mapRegion);
    

    //내 주변 목록 가져오기
    axios.post(`${IP}/hospital/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
      .then(function (res) {
        console.log(res.data);
        //setAround(res.data);
        setData(res.data) // 목록에 보여줄 주변 병원
        setWhat("병원");
        if (res.data === ""){
           setData("")
          Alert.alert("주변에 없습니다.")
        }
         
      })
      .catch(function (error) {
        console.log("내 주변 목록 가져오기 실패- ", error)
      })
      
      
    // 모든 병원 정보 마커 찍기
    axios.post(`${IP}/hospital/list`, null, {

    })
      .then(function (res) {
        // console.log(res.data);
        // setRegion(res.data);
        setAll(res.data)
        setColor("#0080ff'")
      })
      .catch(function (error) {
        console.log("병원 목록 가져오기 실패- ", error)
      })
  }

  const myLocationW = () => //내 주변 장묘업 목록 가져오기
  {
    console.log("myLocationW--------------------", mapRegion);
    

      //내 주변 목록
    axios.post(`${IP}/welfare/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
      .then(function (res) {
        console.log(res.data);
        // setWAround(res.data);
        setData(res.data)
        setWhat("장묘업");
        if (res.data === ""){
          setData("")
          Alert.alert("주변에 없습니다.")
        }
      })
      .catch(function (error) {
        console.log("내 주변 장묘업 목록 가져오기 실패- ", error)
      })
      

    //모든 정보
    axios.post(`${IP}/welfare/list`, null, {

    })
      .then(function (res) {
        // console.log(res.data);
        // setWelfare(res.data);
        setColor("#DEB887")
        setAll(res.data)
      })
      .catch(function (error) {
        console.log("장묘업 목록 가져오기 실패- ", error)
      })

  }

  const myLocationP = () => //내 주변 약국 목록 가져오기
  {
    console.log("myLocationP--------------------", mapRegion);
    
  

    // 내주변 목록
    axios.post(`${IP}/pharmacy/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
      .then(function (res) {
        console.log(res.data);
        // setPAround(res.data);
        setData(res.data)
        setWhat("약국");
        if (res.data === ""){
           setData("")
          Alert.alert("주변에 없습니다.")
        }
         
      })
      .catch(function (error) {
        console.log("내 주변 약국 목록 가져오기 실패- ", error)
      })


    //모든 정보
    axios.post(`${IP}/pharmacy/list`, null, {

    })
      .then(function (res) {
        // console.log(res.data);
        // setPharmacy(res.data);
        setColor("#3CB371")
        setAll(res.data)
      })
      .catch(function (error) {
        console.log("약국 목록 가져오기 실패- ", error)
      })

  }

  const myLocationB = () => //내 주변 미용실 목록 가져오기
  {
    console.log("myLocationB--------------------", mapRegion);
    
      //내 주변 목록
    axios.post(`${IP}/beauty/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
      .then(function (res) {
        console.log(res.data);
        // setBAround(res.data);
        setData(res.data)
        setWhat("미용실");
        if (res.data === ""){
          setData("")
          Alert.alert("주변에 없습니다.")
        }
          
      })
      .catch(function (error) {
        console.log("내 주변 미용실 목록 가져오기 실패- ", error)
      })
      
      
    //모든 정보
    axios.post(`${IP}/beauty/list`, null, {

    })
      .then(function (res) {
        // console.log(res.data);
        // setBeauty(res.data);
        setColor("#9370DB")
        setAll(res.data)
      })
      .catch(function (error) {
        console.log("미용실 목록 가져오기 실패- ", error)
      })
  }

  const myLocationH = () => //내 주변 위탁관리업 목록 가져오기
  {
    console.log("myLocationH--------------------", mapRegion);
    //모든 정보
    axios.post(`${IP}/hotel/list`, null, {

    })
      .then(function (res) {
        // console.log(res.data);
        // setHotel(res.data);
        setAll(res.data)
        setColor("#FF8C00")
      })
      .catch(function (error) {
        console.log("위탁관리업 목록 가져오기 실패- ", error)
      })
    
    
    
    //내 주변 목록
    axios.post(`${IP}/hotel/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
      .then(function (res) {
        console.log(res.data);
        // setHAround(res.data);
        setData(res.data)
        setWhat("위탁관리업");
        if (res.data === ""){
          setData("")
          Alert.alert("주변에 없습니다.")
        }
          
      })
      .catch(function (error) {
        console.log("내 주변 위탁관리업 목록 가져오기 실패- ", error)
      })
  }



  const onDetail = (lat, lon) => { //병원 리스트 중 하나 클릭하면 해당 위도, 경도 가져옴....
    setmapRegion({ //현재 위치
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
    mapRef.current.animateToRegion({ //해당 위치로 지도 이동
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 3 * 1000);
  }



  const renderContent = () => (
    <View
      style={styles.swipe}
    >
      <ScrollView >
        <View style={{alignItems:'center'}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>내 주변 {what}</Text>
          {
            data === "" ?
              <View style={{ padding: 5, }}>
                <View style={{ padding: 10, alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                  <Text></Text>
                  <Image style={{ resizeMode: "cover", width: 50, height: 50, }}
                    source={require('../../assets/images/empty.png')} />
                  <Text></Text>
                  <Text style={{ fontSize: 15, color: 'gray' }}>데이터가 없거나</Text>
                  <Text style={{ fontSize: 15, color: 'gray' }}>버튼을 눌러 활성화해주세요</Text>
                </View>
              </View> :
              <>
                {
                  data && data.map((e, idx) => {
                    return (
                      <View key={idx} style={{ padding: 5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                        <View style={{ width: '75%', padding: 10 }}>
                          <Text style={{ fontSize: 20, marginBottom: 7, fontWeight: 'bold' }}>{e.name}</Text>
                          <Text style={{ fontSize: 17 }}>{e.address}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            e.tell == "" ? null :
                              <TouchableOpacity
                                style={{ alignItems: 'center', backgroundColor: '#FFEC9E', borderRadius: 20, width: '80%', justifyContent: 'center' }}
                                onPress={() => { Linking.openURL(`tel:${e.tell}`) }}
                              >
                                <Image source={tell} style={styles.image} />
                                <Text style={{ fontSize: 5 }}></Text>
                              </TouchableOpacity>
                        }
                              <Text style={{ fontSize: 10 }}>{e.tell}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </>
          }


        </View>
      </ScrollView>
    </View>
  );







  return (

    <View style={styles.container}>
      {
        mapRegion != "" ?
          <View style={styles.containerMap}>
            <MapView
              style={styles.map}
              region={mapRegion}
              ref={mapRef}

              showsUserLocation={true}
              // userLocationUpdateInterval = 
             
            >
              
              {
                all && all.map((e, index) => { //위탁관리업 목록 가져와 마커로 표시
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: parseFloat(e.latitude),
                        longitude: parseFloat(e.longitude),
                      }}
                      title={e.name}
                      description={e.address}
                      pinColor={color}
                      onPress={() => {
                        onDetail(e.latitude, e.longitude)
                      }}
                    >
                      <Callout>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}> {e.name}</Text>
                          <Text style={{ fontSize: 18, color: 'gray' }}>{e.address}</Text>
                          {
                            e.tell == "" ? null :
                              <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '40%', justifyContent:'center' }}
                                onPress={() => {
                                  Linking.openURL(`tel:${e.tell}`)
                                }}
                              >
                                <Image source={tell} style={{ resizeMode: "cover", width: 20, height: 20, }} />
                                <Text style={{ fontSize: 13 }}>{e.tell}</Text>
                              </TouchableOpacity>
                          }
                        </View>
                      </Callout>
                    </Marker>
                  );
                })
              }

            </MapView>

            <BottomSheet
              ref={sheetRef}
              snapPoints={[Dimensions.get('window').height * 0.5, Dimensions.get('window').width, 0]}
              // snapPoints={[450, 300, 0]}
              borderRadius={10}
              renderContent={renderContent}
            />



            <View style={{ width: '90%', height: '7%', flexDirection: 'row', justifyContent: 'space-between', }}>

              <Pressable
                style={styles.mylocation}
                onPress={() => {
                  myLocation()
                }}>
                <View style={{ padding: 10, }}>
                  <Text style={styles.mylocationtext}>병원</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.mylocation}
                onPress={() => {
                  myLocationW()
                }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.mylocationtext}>장묘업</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.mylocation}
                onPress={() => {
                  myLocationP()
                }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.mylocationtext}>약국</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.mylocation}
                onPress={() => {
                  myLocationB()
                }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.mylocationtext}>미용실</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.mylocation}
                onPress={() => {
                  myLocationH()
                }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.mylocationtext}>위탁관리업</Text>
                </View>
              </Pressable>
            </View>



            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
              <Pressable
                style={styles.listbutton}
                onPress={() => {
                  console.log('목록보기')
                  sheetRef.current.snapTo(0)
                }}>
                <View style={styles.listarea}>
                  <View>
                    {/* <Image style={{ resizeMode: "cover", width: 40, height: 40, }}
                      source={require('../../assets/images/main/swipelocation.png')}></Image> */}
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#300000', fontWeight: 'bold' }}> 목록보기 </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View> :
          <LottieView
            source={require('../../assets/dog.json')}/** 움직이는 LottieView */
            autoPlay loop
          />
      }
    </View>
  );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}
export default MapInfo;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
  listText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center"
  },
  image: {

    width: 35,
    height: 35,
    marginTop: "10%"
  },
  swipe: {
    padding: 16,
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'white',
  },
  mylocation:{
    borderRadius: 20,
    backgroundColor: '#FFE4C4',
    marginTop: 10,
  },
  mylocationtext:{
    fontSize: 17, 
    color: '#300000', 
    fontWeight: 'bold' 
  },
  listbutton: {
    borderRadius: 50,
    backgroundColor: '#FFE4C4',
    marginBottom: 10,

  },
  listarea: {
    flexDirection: 'row',
    padding: 10,
  },
  reviewText: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#FE7474',
    borderRadius: 8,
  },
  tooltipButton: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  textinput: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#FE7474',
    borderRadius: 8,
  },
  searchbutton: {
    borderRadius: 10,
    backgroundColor: '#FE7474',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

