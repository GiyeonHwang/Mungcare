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

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();



export default function Walk({navigation}) {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
    latitudeDelta: 0.005, //확대되는 범위
    longitudeDelta: 0.005, //확대되는 범위
  });
  //이동경로 표시하기
  const [gps, setGps] = React.useState([]);
  const [latit, setLatit] = React.useState();
  const [longit, setLongit] = React.useState();


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

  //사진 여부
  const [final, setFinal] = React.useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();  //갤러리 권한 요청이 되어있는지 확인

  useEffect(() => {
    (async () => {

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
    })();


    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    //산책 중인지 아닌지 확인
    axios.post("http://192.168.2.94:5000/calendar/scheck", null, {
      params: {
        id: "user", //로그인한 사용자
        cWalkDate : day,
      }
    })
      .then(function (res) {
        console.log(res)
        console.log(res.data)
        if (res.data === true) {
          setModalVisible(true)

        }
      })

  }, []);

  //산책 시작
  const startWalk = () => {
    //서버에 시간, 위치 보내기
    setModalVisible(true) //test
    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    // axios.post("http://192.168.2.94:5000/calendar/start", null, {
    //   params: {
    //     id: "user", //로그인한 사용자
    //     cStartTime: time, //시작시간
    //     cWalkDate : day
    //   }
    // })
    //   .then(function (res) {
    //     console.log(res)
    //     console.log(res.data)
    //     if (res.data === true) {
    //       setModalVisible(true)

    //     }
    //   })

  }


  //산책종료 
  const stopWalk = () => {
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
      console.log('data',data);
      setPhotoModal(false)
      //이미지 아마존 웹서버에 올리기
      uploadImage(data.uri);

      setFinalModal(true)
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
        setImgUri(res.data[0]);//링크
        setSuccess(true) //로딩창을 보여줌
      })
  }

  const sendServer = () => {
    console.log("sendServer")
    console.log('imgUri',imgUri);
    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 

    // axios.post("http://192.168.2.94:5000/calendar/end", null, {
    //   params: {
    //     id: "user",
    //     cEndTime:time,
    //     cWalkDate:day,
    //     cPhoto:imgUri
    //   }
    // })
    //   .then(function (res) {
    //     console.log(res);
    //     console.log(res.data);

    //     Alert.alert("등록 완료!")
    //     navigation.navigate("MyPage");
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //     Alert.alert("저장에 실패하였습니다")
    //   })


  }


  const walkTo = () => {
    //서버에 위치 보내기
    console.log("walkTogether")


    // axios.post("링크링크" ,null, {
    //   params : {
    //     위도,
    //     경도
    //   }
    // })

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
                <Text>앱을 닫으면 위치정보를 가져올 수 없습니다</Text>
                <Text>산책을 건당 10Point입니다! 하루에 최대 50Point까지 적립 가능합니다</Text>
                <Text>산책을 끝낼 때는 사진을 찍어야지 Point적립이 가능합니다!</Text>
                <Text>사진은 갤러리에서 가져올 수 없으며 카메라를 허용해줘야지 인증할 수 있습니다</Text>
                <Text>사진이 없다면 데이터베이스에 저장되지 않습니다.. </Text>
              </View>

              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    setStart(false)

                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>






        {/* 사진 찍은 후 모달 */}
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
                    height:400,
                    width:300
                  }}
                  // style={styles.fixedRatio}
                  type={type}
                />
              <View>
                <Text>  </Text>
                <View style={{ flexDirection: 'row', }}>
                  <Pressable
                    onPress={() => {
                      console.log("찰칵")
                      takePicture()
                      console.log(image)
                      setFinal(true);
                    }} >
                    <View style={styles.takeButton} ></View>
                  </Pressable>
                </View>
              </View>
              {/* {image && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
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
                <View style={{ backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: image }} style={{ resizeMode: "cover", height: 300, width: 220, borderWidth: 3 }} />
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






      <View style={styles.map}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          // region={mapRegion}
          // initialRegion={{mapRegion}}
          initialRegion={{
            latitude: 36.7987869,
            longitude: 127.0757584,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}

          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval = 
          onUserLocationChange={(e) => {
            //사용자가 이동하면 위치를 저장함
            //console.log("onUserLocationChange", e.nativeEvent.coordinate);
            //위치 위도경도를 저장함

            // 너무 새새하게 나와서 자름! 
            // 소숫점 4자리까지만 나오게 저장하게 함
            // const lat = e.nativeEvent.coordinate.latitude.toFixed(4)
            // const long = e.nativeEvent.coordinate.longitude.toFixed(4)

            // const newCoordinate = {
            //   latitude: lat,
            //   longitude: long
            // }
            // setGps(gps.concat(newCoordinate));
            // console.log("gps", gps);

            // setmapRegion(gps.concat(newCoordinate));
          }}
        >
          {/* 마커표시 */}
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

          {/* 반경 */}
          <Circle center={mapRegion} radius={500} />

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
              <Text style={styles.text}>start</Text>
            </Pressable> :
              <Pressable style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: 'red',
              }} onPress={stopWalk} >
                <Text style={styles.text}>stop</Text>
              </Pressable>

          }
          <Text>              </Text>
          <Pressable style={styles.button} onPress={navigation.navigate("WalkTogether")}>
            <Text style={styles.text}>togher</Text>
          </Pressable>


        </View>
      </View>
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
    height: "90%",
  },
  buttons: {
    padding: 10,
    height: "10%",
    flexDirection: 'row',
    widh: "100%",
    backgroundColor: 'yellow',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
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
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'yellow'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    width:300,
    height:500
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