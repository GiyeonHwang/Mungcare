import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout, AnimatedRegion, Polyline, MarkerAnimated } from 'react-native-maps';
// npm i react-native-maps
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image } from 'react-native';
import * as Location from 'expo-location';
// npm i expo-location
import { Camera, Constants } from 'expo-camera';
//npm install react-native-popup-confirm-toast

//이미지 업로드
import * as ImagePicker from 'expo-image-picker';

//로딩
import LottieView from 'lottie-react-native';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();



export default function Walk({navigation}) {
  const [mapRegion, setmapRegion] = React.useState("");
  //이동경로 표시하기
  const [gps, setGps] = React.useState([]);
  const [lat, setLatit] = React.useState();
  const [long, setLongit] = React.useState();
  //모달
  const [modalVisible, setModalVisible] = React.useState(false); //산책 전 안내사항
  const [photoModal, setPhotoModal] = React.useState(false); //사진찍는 모달
  const [finalModal, setFinalModal] = React.useState(false); // 산책 완료 모달

  //버튼
  const [start, setStart] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  // 사진찍기
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //아마존에 올린 사진 링크
  const [imgUri, setImgUri] = React.useState();


  useEffect(() => {
    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //let address = await Location.reverseGeocodeAsync(location.coords);
      console.log('location', location);
      //console.log(address);

      setmapRegion({ // 현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // 확대되는 범위
        longitudeDelta: 0.005, // 확대되는 범위
      })
    })();


    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    console.log('useeffect walk check')
    console.log("-------------day: "+day);
    //산책 중인지 아닌지 확인
    axios.post("http://192.168.2.94:5000/calendar/check", null, {
      params: {
        id: "user", //로그인한 사용자
        cDate: day,
      }
    })
      .then(function (res) {
        console.log('check',res.data)
        if (res.data === true) { //산책 시작 가능
          setStart(true)
        } else {
          setStart(false)
        }
      })

  }, []);

  //산책 시작
  const startWalk = () => {
    //서버에 시간, 위치 보내기
    setModalVisible(true) //test
    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
    console.log('walk start')
    axios.post("http://192.168.2.94:5000/calendar/start", null, {
      params: {
        id: "user", //로그인한 사용자
        cStartTime: time, //시작시간
        cDate: day,
        cType: 'walk'
      }
    })
      .then(function (res) {
        console.log('start',res.data)
      })

  }


  //산책종료 
  const stopWalk = () => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();

    return Alert.alert(
      "산책 끝",
      "산책을 끝내려면 확인을 눌러 카메라를 실행하여 사진 찍어주세요(취소 시 적립이 안되고 저장되지 않습니다)",
      [
        // The "Yes" button
        {
          text: "사진찍기",
          onPress: () => {
            setStart(true)
            // 카메라 키기
            setPhotoModal(true)
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "취소",
        },
      ]
    );
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
      console.log('data', data.uri);
      setPhotoModal(false)

      //이미지 아마존 웹서버에 올리기
      uploadImage(data.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const uploadImage = async (img) => {

    const filename = img.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('multipartFileList', { uri: img, name: filename, type });

    console.log('formData', formData)

    //아마존 스토레이지에 저장
    await axios({
      method: 'post',
      url: 'http://192.168.2.77:5000/upload',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData
    })
      .then((res) => {
        console.log(res.data);
        setFinalModal(true)
        setImgUri(res.data[0]); // 링크
        setSuccess(true) // 로딩창을 보여줌
      })
  }

  const sendServer = () => {
    console.log("sendServer")
    console.log('imgUri', imgUri);
    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    // axios.post("http://192.168.2.94:5000/calendar/end", null, {
    axios.post("http://192.168.2.94:5000/calendar/end", null, {
      params: {
        id: "user",
        cEndTime: time,
        cDate: day,
        cPhoto: imgUri
      }
    })
      .then(function (res) {
        console.log(res.data);
        Alert.alert("등록 완료!")
      })
      .catch(function (error) {
        console.log(error)
        Alert.alert("저장에 실패하였습니다")
      })
  }


  return (
    <View style={styles.container}>


      <View style={{ alignContent: 'center', justifyContent: 'center' }}>
        {/* 안내사항 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ padding: 10, justifyContent: 'center' }}>
                <View style={{ borderBottomWidth: 1, width: '100%', }}>
                  <Text style={{ fontSize: 30 }}>안내 사항</Text>
                </View>
              </View>
              <View>
                <Text>앱을 닫으면 위치정보를 가져올 수 없습니다 ????</Text>
                <Text>산책을 건당 10Point입니다! 하루에 최대 50Point까지 적립 가능합니다</Text>
                <Text>산책을 끝낼 때는 사진을 찍어야지 Point적립이 가능합니다!</Text>
                <Text>사진은 갤러리에서 가져올 수 없으며 카메라를 허용해줘야지 인증할 수 있습니다</Text>
                <Text>사진이 없다면 데이터베이스에 저장되지 않습니다.. </Text>
              </View>

              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    // setModalVisible(!modalVisible)
                    setStart(false)
                    console.log(finalModal)
                    setModalVisible(!modalVisible)

                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>






        {/* 사진 찍기 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={photoModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setPhotoModal(!photoModal);
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Camera
                ref={ref => setCamera(ref)}
                style={{
                  height: 400,
                  width: 300,
                }}
                // style={styles.fixedRatio}
                type={type}
              />
              <Text>  </Text>
              <View style={{ width: 300, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View style={{ width: 50, }}></View>
                  <Pressable
                    onPress={() => {
                      console.log("찰칵")
                      takePicture()
                    }} >
                    <View style={styles.takeButton} ></View>
                  </Pressable>
                  <Pressable
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      )
                    }} >
                    <View style={{
                      borderColor: "white",
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 100
                    }} >
                      <Image style={{ resizeMode: "cover", width: '100%', height: '100%', borderRadius: 50, }}
                        source={require('../../assets/images/ch.png')}></Image>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>

          </View>
        </Modal>





        {/* 사진 찍은 후 확인 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={finalModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setFinalModal(!finalModal);
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{ padding: 10, justifyContent: 'center' }}>
                <View style={{ borderBottomWidth: 1, width: '100%', }}>
                  <Text style={{ fontSize: 30 }}>산책 완료!</Text>
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <View style={{ backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', height: 350, width: 250 }}>
                  <Image source={{ uri: image }} style={{ resizeMode: "cover", height: '100%', width: '100%', borderWidth: 3 }} />
                </View>
              </View>
              <View style={{ padding: 10, alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>10Point적립 완료!</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15 }}>하루에 최대 50Point까지 적립가능합니다</Text>
              </View>
              <Text>  </Text>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {

                    setFinalModal(!finalModal)
                    // 이미지 업로드 및 서버에 전송
                    sendServer()
                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>





{
  mapRegion != "" ? 

      <View style={styles.map}>
       
          <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
          // initialRegion={mapRegion}

          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval =
          onUserLocationChange={(e) => {
            //사용자가 이동하면 위치를 저장함
            //console.log("onUserLocationChange", e.nativeEvent.coordinate);
            //위치 위도경도를 저장함


            const newCoordinate = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            }
            setLatit(e.nativeEvent.coordinate.latitude)
            setLongit(e.nativeEvent.coordinate.longitude)
            setGps(gps.concat(newCoordinate));
            //console.log("gps", gps);

            setmapRegion(newCoordinate)
            // setmapRegion(gps.concat(newCoordinate));
          }}
        >
          <Marker
            coordinate={mapRegion}
            draggable={true} //마커 드래그 가능
            onDragStart={(e) => { console.log("Drag start", e.nativeEvent.coordinate); }} //드래그 한 위도, 경도 나타냄
            onDragEnd={(e) => {
              const lat = e.nativeEvent.coordinate.latitude.toFixed(4)
              const long = e.nativeEvent.coordinate.longitude.toFixed(4)
              setmapRegion({
                latitude: lat,
                longitude: long
              });
              setLatit(lat)
              setLongit(long)
            }} //드래그 한 곳으로 마커 이동
          >
            <Callout>
              <Text>This is Callout</Text>
            </Callout>
          </Marker>

         
          <Polyline
            coordinates={gps}
            strokeColor="#4e90f7"
            strokeWidth={6}
          />

        </MapView>


        <View style={styles.buttons}>
          {/* 버튼 */}
          {
            start ? <Pressable style={styles.button} onPress={startWalk} >
              <Text >      start      </Text>
            </Pressable> : <><Pressable style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: 'red',
              width: '30%'
            }} onPress={stopWalk} >
              <Text>stop</Text>

            </Pressable>
              <Text>              </Text>
              <Pressable style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: '#3AB5A9',
                width: '30%'
              }} onPress={() => navigation.navigate("WalkTogether", {
                info: [ lat, long ],
                title: "title",
              })}>
                <Text>togher</Text>
              </Pressable></>
          }


        </View>
      </View>
      : <LottieView
      source={require('../../assets/dog.json') /** 움직이는 LottieView */
      }
      autoPlay loop
    />  
    }
    </View>
  );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  map: {
    width: "100%",
    height: "92%",
  },
  buttons: {
    padding: 5,
    height: "8%",
    flexDirection: 'row',
    widh: "100%",
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F7931D',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    width: 300,
    height: 500
    // height:Constants.height*0.7,
    // width:Constants.width
  },
  takeButton: {
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: "#ff6600",
    borderRadius: 100
  }
});