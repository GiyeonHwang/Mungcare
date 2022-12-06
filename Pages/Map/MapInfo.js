import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
// import { markerdata } from "./markerData.js";
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MapInfo = (navigation) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
    latitudeDelta: 0.005, //확대되는 범위
    longitudeDelta: 0.005, //확대되는 범위
  });

  const [region, setRegion] = React.useState([]); //병원 목록
  const [around, setAround] = React.useState([]); //내 위치 기준 주변 병원 목록

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
      axios.post("http://192.168.2.94:5000/hospital/list", null, {

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

  const myLocation = () => //내 주변 병원 목록 가져오기
  {
    console.log("myLocation--------------------",mapRegion);
    axios.post("http://192.168.2.94:5000/hospital/surrounnding", null, {
      params: {
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }
    })
    .then(function(res) {
      console.log(res.data);
      setAround(res.data);
    })
    .catch(function(error) {
      console.log("내 주변 목록 가져오기 실패- ", error)
    })
  }


  return (
    <View style={{flex:1}}>
    <View style={styles.container}>
      <MapView
      ref={mapRef}
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
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
      <Button
          title = "내 주변 병원"
          onPress={myLocation}
      />
      <ScrollView>
      
      {
          around && around.map((e, index) => { //내 주변 병원 리스트로 표시
            return (
              <View key={index} style={{borderBottomWidth:1}}>
                <TouchableOpacity onPress={() => onDetail(e.latitude, e.longitude)}>
                <Text style={styles.listText}>{e.hname}</Text>
                <Text style={{fontSize:13}}>{e.address}</Text>
                <Text style={{fontSize:13}}>{e.tell}</Text>
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
  }
});

export default MapInfo;