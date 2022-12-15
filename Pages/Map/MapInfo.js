import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Circle, Callout , PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, FlatList, TouchableOpacity, Alert, Linking, Image  } from 'react-native';
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

const Stack = createStackNavigator();
const IP = ServerPort();

const MapInfo = (navigation) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
    latitudeDelta: 0.005, //확대되는 범위
    longitudeDelta: 0.005, //확대되는 범위
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

  const[what, setWhat] = React.useState(""); //어떤 것을 찾는지 저장

  const onDetail = (lat, lon) => { //병원 리스트 중 하나 클릭하면 해당 위도, 경도 가져옴....
    setmapRegion({ //현재 위치
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    })
    mapRef.current.animateToRegion({ //해당 위치로 지도 이동
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 3*1000);
  }

  const mapRef = useRef(null);

    React.useEffect(() => { //병원 목록 가져오기
    (async () => {
      axios.post(`${IP}/hospital/list`, null, {

      })
      .then(function(res) {
        // console.log(res.data);
        setRegion(res.data);
      })
      .catch(function(error) {
        console.log("병원 목록 가져오기 실패- ", error)
      })
      
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(location);
      console.log(address);
      
      setmapRegion({ //현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

      // console.log(markerdata)
    })();
  }, []);

  React.useEffect(() => { //장묘업 목록 가져오기
    (async () => {
      axios.post(`${IP}/welfare/list`, null, {

      })
      .then(function(res) {
        // console.log(res.data);
        setWelfare(res.data);
      })
      .catch(function(error) {
        console.log("장묘업 목록 가져오기 실패- ", error)
      })
    })();
  }, []);

  React.useEffect(() => { //약국 목록 가져오기
    (async () => {
      axios.post(`${IP}/pharmacy/list`, null, {

      })
      .then(function(res) {
        // console.log(res.data);
        setPharmacy(res.data);
      })
      .catch(function(error) {
        console.log("약국 목록 가져오기 실패- ", error)
      })
    })();
  }, []);  

  React.useEffect(() => { //미용실 목록 가져오기
    (async () => {
      axios.post(`${IP}/beauty/list`, null, {

      })
      .then(function(res) {
        // console.log(res.data);
        setBeauty(res.data);
      })
      .catch(function(error) {
        console.log("미용실 목록 가져오기 실패- ", error)
      })
    })();
  }, []);  

  React.useEffect(() => { //위탁관리업 목록 가져오기
    (async () => {
      axios.post(`${IP}/hotel/list`, null, {

      })
      .then(function(res) {
        // console.log(res.data);
        setHotel(res.data);
      })
      .catch(function(error) {
        console.log("위탁관리업 목록 가져오기 실패- ", error)
      })
    })();
  }, []);  

  const myLocation = () => //내 주변 병원 목록 가져오기
  {
    console.log("myLocation--------------------",mapRegion);
    axios.post(`${IP}/hospital/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setWAround([]); //내 주변 장묘업 초기화
      setPAround([]); //내 주변 약국 초기화
      setBAround([]); //내 주변 미용실 초기화
      setHAround([]); //내 주변 위탁관리업 초기화
      setAround(res.data);
      setWhat("병원");
      if(res.data === "")
        Alert.alert("주변에 없습니다.")
    })
    .catch(function(error) {
      console.log("내 주변 목록 가져오기 실패- ", error)
    })
  }

  const myLocationW = () => //내 주변 장묘업 목록 가져오기
  {
    console.log("myLocationW--------------------",mapRegion);
    axios.post(`${IP}/welfare/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setAround([]); //내 주변 병원 초기화
      setPAround([]); //내 주변 약국 초기화
      setBAround([]); //내 주변 미용실 초기화
      setHAround([]); //내 주변 위탁관리업 초기화
      setWAround(res.data);
      setWhat("장묘업");
      if(res.data === "")
        Alert.alert("주변에 없습니다.")
    })
    .catch(function(error) {
      console.log("내 주변 장묘업 목록 가져오기 실패- ", error)
    })
  }

  const myLocationP = () => //내 주변 약국 목록 가져오기
  {
    console.log("myLocationP--------------------",mapRegion);
    axios.post(`${IP}/pharmacy/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setAround([]); //내 주변 병원 초기화
      setWAround([]); //내 주변 장묘업 초기화
      setBAround([]); //내 주변 미용실 초기화
      setHAround([]); //내 주변 위탁관리업 초기화
      setPAround(res.data);
      setWhat("약국");
      if(res.data === "")
        Alert.alert("주변에 없습니다.")
    })
    .catch(function(error) {
      console.log("내 주변 약국 목록 가져오기 실패- ", error)
    })
  }

  const myLocationB = () => //내 주변 미용실 목록 가져오기
  {
    console.log("myLocationB--------------------",mapRegion);
    axios.post(`${IP}/beauty/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setAround([]); //내 주변 병원 초기화
      setWAround([]); //내 주변 장묘업 초기화
      setPAround([]); //내 주변 약국 초기화
      setHAround([]); //내 주변 위탁관리업 초기화
      setBAround(res.data);
      setWhat("미용실");
      if(res.data === "")
        Alert.alert("주변에 없습니다.")
    })
    .catch(function(error) {
      console.log("내 주변 미용실 목록 가져오기 실패- ", error)
    })
  }

  const myLocationH = () => //내 주변 위탁관리업 목록 가져오기
  {
    console.log("myLocationH--------------------",mapRegion);
    axios.post(`${IP}/hotel/surrounding`, null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setAround([]); //내 주변 병원 초기화
      setWAround([]); //내 주변 장묘업 초기화
      setPAround([]); //내 주변 약국 초기화
      setBAround([]); //내 주변 미용실 초기화
      setHAround(res.data);
      setWhat("위탁관리업");
      if(res.data === "")
        Alert.alert("주변에 없습니다.")
    })
    .catch(function(error) {
      console.log("내 주변 위탁관리업 목록 가져오기 실패- ", error)
    })
  }

  return (
    <View style={{flex:1}}>
    <View style={styles.container}>
      <MapView
      ref={mapRef}
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        // initialRegion={{mapRegion}}
        // initialRegion={{
        //     latitude: 36.7981234,
        //     longitude: 127.0751234,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.005,
        // }}

        //사용자 위치에 맞게 마커가 표시된다.
        showsUserLocation = {true}
        // userLocationUpdateInterval = 
        onUserLocationChange = {(e) => {
            console.log("onUserLocationChange: ", e.nativeEvent.coordinate);
            setmapRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              });
        }}
      >
        <Marker
          coordinate={mapRegion} //마커 위치
          draggable={true} //마커 드래그 가능
          onDragStart={(e)=>{console.log("Drag start", e.nativeEvent.coordinate);}} //드래그 한 위도, 경도 나타냄
          onDragEnd={(e)=>{setmapRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          });}} //드래그 한 곳으로 마커 이동
        >
        <Callout>
          <Text>I'm here!</Text>
        </Callout>
        </Marker>
        {
          region && region.map((e, index) => { //병원목록 가져와 마커로 표시
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(e.latitude),
                  longitude: parseFloat(e.longitude),
                }} 
                title={e.hname}
                description={e.address}
                pinColor={'#0080ff'}
              >
              {/* <Callout>
                <Text>{e.address}</Text>
              </Callout> */}
            </Marker>
            );
          })
        }
        {
          welfare && welfare.map((e, index) => { //장묘업 목록 가져와 마커로 표시
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(e.latitude),
                  longitude: parseFloat(e.longitude),
                }} 
                title={e.wname}
                description={e.address}
                pinColor={'#DEB887'}
              >
              {/* <Callout>
                <Text>{e.address}</Text>
              </Callout> */}
            </Marker>
            );
          })
        }
        {
          pharmacy && pharmacy.map((e, index) => { //약국 목록 가져와 마커로 표시
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(e.latitude),
                  longitude: parseFloat(e.longitude),
                }} 
                title={e.pname}
                description={e.address}
                pinColor={'#3CB371'}
              >
              {/* <Callout>
                <Text>{e.address}</Text>
              </Callout> */}
            </Marker>
            );
          })
        }
        {
          beauty && beauty.map((e, index) => { //미용실 목록 가져와 마커로 표시
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(e.latitude),
                  longitude: parseFloat(e.longitude),
                }} 
                title={e.bname}
                description={e.address}
                pinColor={'#9370DB'}
              >
              {/* <Callout>
                <Text>{e.address}</Text>
              </Callout> */}
            </Marker>
            );
          })
        }
        {
          hotel && hotel.map((e, index) => { //위탁관리업 목록 가져와 마커로 표시
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(e.latitude),
                  longitude: parseFloat(e.longitude),
                }} 
                title={e.hname}
                description={e.address}
                pinColor={'#FF8C00'}
              >
              {/* <Callout>
                <Text>{e.address}</Text>
              </Callout> */}
            </Marker>
            );
          })
        }
        <Circle center={mapRegion} radius={100}/>
      </MapView>
    </View>
    {/* <View style={{ flex: 0.1, width: '100%' }}>
      <TextInput
        style={{
          borderRadius: 10,
          margin: 10,
          color: '#000',
          borderColor: '#666',
          backgroundColor: '#FFF',
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholder={'Search'}
        placeholderTextColor={'#666'}
      />
      </View> */}
      <View style={{flex:0.3, backgroundColor: "#EBE3D7"}}>
        <View style={styles.button}>
          <Text style={{fontSize:17}}>내 주변 {what}</Text>
          <Button
            color = '#0080ff'
            title = "병원"
            onPress={myLocation}
          />
          <Button
            color = '#DEB887' 
              title = "장묘업"
              onPress={myLocationW}
          />
          <Button
              color = '#3CB371'
              title = "약국"
              onPress={myLocationP}
          />
          <Button
              color = '#9370DB'
              title = "미용실"
              onPress={myLocationB}
          />
          <Button
              color = '#FF8C00'
              title = "위탁관리업"
              onPress={myLocationH}
          />
        </View>
      
      <ScrollView>
      {
          around && around.map((e, index) => { //내 주변 병원 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.hname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <View style={{flexDirection:"row"}}>
                  {
                    //전화번호가 있으면 전화버튼 생기게 한다.
                    e.tell === "" ? <Text></Text>: 
                      <TouchableOpacity
                        onPress={()=>{Linking.openURL(`tel:${e.tell}`)}}
                      >
                        <Image source={tell} style={styles.image}/>
                      </TouchableOpacity>
                  }
                  <Text style={{fontSize:13}}>{e.tell}</Text>
                </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
        {
          wAround && wAround.map((e, index) => { //내 주변 장묘업 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.wname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <View style={{flexDirection:"row"}}>
                  {
                    //전화번호가 있으면 전화버튼 생기게 한다.
                    e.tell === "" ? <Text></Text>: 
                      <TouchableOpacity
                        onPress={()=>{Linking.openURL(`tel:${e.tell}`)}}
                      >
                        <Image source={tell} style={styles.image}/>
                      </TouchableOpacity>
                  }
                  <Text style={{fontSize:13}}>{e.tell}</Text>
                </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
        {
          pAround && pAround.map((e, index) => { //내 주변 약국 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.pname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <View style={{flexDirection:"row"}}>
                  {
                    //전화번호가 있으면 전화버튼 생기게 한다.
                    e.tell === "" ? <Text></Text>: 
                      <TouchableOpacity
                        onPress={()=>{Linking.openURL(`tel:${e.tell}`)}}
                      >
                        <Image source={tell} style={styles.image}/>
                      </TouchableOpacity>
                  }
                  <Text style={{fontSize:13}}>{e.tell}</Text>
                </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
        {
          bAround && bAround.map((e, index) => { //내 주변 미용실 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.bname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <View style={{flexDirection:"row"}}>
                  {
                    //전화번호가 있으면 전화버튼 생기게 한다.
                    e.tell === "" ? <Text></Text>: 
                      <TouchableOpacity
                        onPress={()=>{Linking.openURL(`tel:${e.tell}`)}}
                      >
                        <Image source={tell} style={styles.image}/>
                      </TouchableOpacity>
                  }
                  <Text style={{fontSize:13}}>{e.tell}</Text>
                </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
        {
          hAround && hAround.map((e, index) => { //내 주변 호텔 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.hname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <View style={{flexDirection:"row"}}>
                  {
                    //전화번호가 있으면 전화버튼 생기게 한다.
                    e.tell === "" ? <Text></Text>: 
                      <TouchableOpacity
                        onPress={()=>{Linking.openURL(`tel:${e.tell}`)}}
                      >
                        <Image source={tell} style={styles.image}/>
                      </TouchableOpacity>
                  }
                  <Text style={{fontSize:13}}>{e.tell}</Text>
                </View>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </ScrollView>
      </View>
    </View>
  );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}

const styles = StyleSheet.create({
  container: {
    flex: 0.7, //화면 꽉 채움
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  listText: {
    fontWeight:"bold",
    fontSize: 18,
  },
  button: {
    flexDirection:"row",
    justifyContent:"center"
  },
  image: {
    width:35,
    height:35,
    marginTop:"10%"
  }
});

export default MapInfo;