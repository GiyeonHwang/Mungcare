import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout, AnimatedRegion, Polyline, MarkerAnimated } from 'react-native-maps';
// npm i react-native-maps
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image, Dimensions, TextInput } from 'react-native';
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

import SockJS from 'sockjs-client';
// npm i sockjs-client
import {over} from 'stompjs';
// npm i sockjs-client
var stompClient = null; // stompClient 로 연결하는거 같다.

export default function WalkTogether({ navigation, route }) {

  const [mapRegion, setmapRegion] = React.useState("");
  const [latit, setLatit] = React.useState(route.params.info[0]);
  const [long, setLong] = React.useState(route.params.info[1]);
  // 무한 루프 서버에 계속 보내기
  const [number, setNumber] = React.useState(0);

  //함께 산책할 사람 리스트
  const [people, setPeople] = React.useState();

  //모달
  const [modalVisible, setModalVisible] = React.useState(false); //같이해용 모달창
  const [inputModal, setInputModal] = React.useState(false); // 공지
  const [endModal, setEndModal] = React.useState(false); // 산책종료
  const [photoModal, setPhotoModal] = React.useState(false); // 산책 종료 후 사진찍는 모달
  const [finalModal, setFinalModal] = React.useState(false); // 산책 완료 모달
  const [dragModal , setDragModal] = React.useState(false); // 드래그하라는 모달
  //메세지
  const [message, setMessage] = React.useState();

  // 사진찍기
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //아마존에 올린 사진 링크
  const [imgUri, setImgUri] = React.useState();

  //공지
  const [click, setClick] = React.useState(true);
  const [content, setContent] = React.useState(); //내용
  const [firnum, setFir] = React.useState();
  const [secnum, setSec] = React.useState();
  const [timeErrM, setErrTimeM] = React.useState(); // 메세지

  //값 확인
  const [firValue, setFirValue] = React.useState();
  const [secValue, setSecValue] = React.useState();
  const [okValue, setOkValue] = React.useState();

  //소켓
  const [publicChats, setPublicChats] = React.useState([]); // 채팅을 저장
  const [userData, setUserData] = React.useState({ 
    username: '',
    receivername: '',
    connected: false, // 처음 상태는 false
    message: ''
  });
  //소켓을 받았는지 확인하는 코드
  const [check, setCheck] = React.useState(false);


  // 현재 위치를 가져와야함
  // 로딩되는데 시간이 좀 걸린다ㅏ
  useEffect(() => {

    (async () => {
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLatit(location.coords.latitude)
      setLong(location.coords.longitude)

      setmapRegion({ // 현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, //확대되는 범위
        longitudeDelta: 0.005, //확대되는 범위
      })
    })();


    //connect()


  }, []);


  useEffect(() => {
    reqAxios()
    //setInterval(() => reqAxios(), 15000);

  }, []);


  const reqAxios = () => {

    console.log('reqAxios lat--------------------', latit)
    console.log('reqAxios long--------------------', long)

    //서버에 같이 산책하기를 누름을 보냄
    axios.post("http://192.168.2.94:5000/walk/register", null, {
      params: {
        id: "user",
        latitude: latit,
        longitude: long,
      }
    })
      .then(function (res) {
        console.log("resgister", res.data);
      })
      .catch(function (error) {
        console.log(error)
      })

    //서버에 주변에 있는 사람들의 리스트를 받아옴
    axios.post("http://192.168.2.94:5000/walk/list", null, {
      params: {
        id: "user",
        latitude: latit,
        longitude: long,
      }
    })
      .then(function (res) {
        console.log("list", res.data);
        setPeople(res.data); //같이 산책할 사람 데이터 리스트
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const regiButton = () => {
    if (firValue && secValue == true) {
      return false;
    }
    return true;
  }

  const valueTime = (t) => {
    const regex = /^([01][0-9]|2[0-3])$/;
    return regex.test(t)
  }
  const valueSecTime = (t) => {
    const regex = /^([0-9][0-9]|[0-5][0-9])$/;
    return regex.test(t)
  }
  const handleFirTimeChange = (time) => {
    console.log("firTime")
    setFir(time);
    setErrTimeM(
      valueTime(time) ? "올바른 형식입니다." : "00:00~24:00까지 가능합니다"
    )
    setFirValue(valueTime(time))
  }
  const handleSecTimeChange = (time) => {
    console.log("secTime")
    setSec(time);
    setErrTimeM(
      valueSecTime(time) ? "올바른 형식입니다." : "00:00~24:00까지 가능합니다"
    )
    setSecValue(valueTime(time))
  }




  const sendInput = () => {
    console.log("hi")
    const time = firnum + ":" + secnum
    console.log(time)

    //id만 보내기
    const idList = []
    const len = people.length;
    console.log(people[0].id)
    for (var i =0; i<len; i++){
      idList[i] = people[i].id
    }
    console.log('idList',idList)
    
    //공지내용
    console.log(message)
    console.log(regiButton())

    const input = time+"에 "+message+"에서 같이 산책할래요?"

    if (stompClient) { // if문을 왜하는거지? <= 이해가 된다면 알려줘
      var chatMessage = { // JSON 형태로 만들어야하니 변수선언
        senderName: "user", // 보내는 사람의 이름은 현재 소켓의 username
        message: input, // 메시지는 userData의 메시지.
        receiverName : idList,
        status:"MESSAGE" // 상태는 MESSAGE
      };
      console.log(chatMessage); // 변수를 console.log에 찍는다.
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage)); // 소켓 서버에 현재 변수를 보내준다.
      setUserData({...userData,"message": ""}); // userData의 메시지를 초기화 해준다.
    }
  }


  //소켓 받는 코드
  const connect = () => {
    console.log("connect 실행");
    let Sock = new SockJS('http://192.168.2.94:5000/ws'); //일단 급하게 로컬 호스트로 줬음 /ws를 무조건 붙여주어야 Stomp의 메서드가 인식한다. 
    stompClient = over(Sock); // over로 소켓의 주소를 넣는다. 
    stompClient.connect({}, onConnected, onError);
  }
  const onConnected = () => {
    setUserData({ ...userData, "connected": true }); // userData의 connected 속성을 true로 바꿔준다.
    stompClient.subscribe('/chatroom/public', onMessageReceived); // stompClient의 구독을 추가 public 채팅룸
  }
  const onMessageReceived = async (payload) => { // /chatroom/public으로부터 받는 메시지를 처리하는 함수.
    var payloadData = JSON.parse(payload.body); // payloadData가 해당 JSON을 파싱받아 저장된다.
    console.log("payloadData------------------", payloadData.receiverName);
    const list = payloadData.receiverName;
    // const loadedData = await AsyncStorage.getItem('id');
    for (var i =0 ; i<list.length; i++){
      if(list[i]==="user"){
        setCheck(true)
        publicChats.push(payloadData); //message라면
        setPublicChats([...publicChats]); // 배열에 채팅을 저장.
      }
    }
  }

  const onError = (err) => {
    console.log(err); // 접속이 이상하면 콘솔에러를 띄워준다.
  }


  const [region, setRegion] = React.useState();
  // 드래그 해서 위치의 위도경도 가져오기
  const mapRegionChangehandle = (region) => {
    console.log(region)
    if(check){ 
      setRegion(region)
    }
  };



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
    const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

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
        if (res.data) {
          Alert.alert("등록 완료!")
          navigation.navigate("Walk")
        } else {
          Alert.alert("다시 시도해주세요")
          setFinalModal(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        Alert.alert("저장에 실패하였습니다")
      })
  }


  return (
    <View style={styles.container}>
      <View style={{ alignContent: 'center', justifyContent: 'center' }}>


        {/* 같이산책 할 사람 리스트 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewScroll}>
              <View style={{ padding: 10, justifyContent: 'center' }}>
                <View style={{ borderBottomWidth: 1, width: '100%', }}>
                  <Text style={{ fontSize: 30 }}>같이 산책할 사람</Text>
                </View>
              </View>
              <View style={{ height: '100%', flex: 1, padding: 5, width: "90%" }}>
                <ScrollView style={{ width: '100%', padding: 5 }}>
                  {
                    people && people.map((e, idx) => {
                      return (
                        <View style={{ padding: 8, backgroundColor: 'orange', flex: 1, height: 100, flexDirection: 'row' }}>
                          <View style={{ width: '40%', height: '100%', backgroundColor: 'white', }}>
                            {
                              e.animalList[0].aphoto === null ?
                                <Image style={{ resizeMode: "cover", width: '100%', height: '100%', borderWidth: 3 }} source={{ uri: "https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif" }} />
                                : <Image style={{ resizeMode: "cover", width: '100%', height: '100%', borderWidth: 3 }} source={{ uri: e.animalList[0].aphoto }} />
                            }
                          </View>
                          <View style={{ width: '60%' }}>
                            <View style={{ backgroundColor: 'blue', height: '55%', marginLeft: 8, justifyContent: 'center', padding: 10 }}>
                              <Text style={{ fontSize: 20 }}>{e.animalList[0].aname}</Text>
                            </View>
                            <View style={{ backgroundColor: 'yellow', height: '45%', marginLeft: 8, justifyContent: 'center', padding: 10 }}>
                              <Text style={{ fontSize: 15 }}>{e.animalList[0].abreed}</Text>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  }
                </ScrollView>
                <Text></Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible)

                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        
        {/* 드래그모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={dragModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setDragModal(!dragModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalViewScroll}>
              <View style={{ padding: 10, justifyContent: 'center' }}>
                <View style={{ borderBottomWidth: 1, width: '100%', }}>
                  <Text style={{ fontSize: 30 }}>같이 산책하기</Text>
                </View>
              </View>
              <View style={{ height: '100%', flex: 1, padding: 5, width: "90%" }}>
                <Text>만날 장소를 드래그하여 위치를 정해주세요</Text>
                <Text></Text>
                <View style={{ flexDirection: 'row' }}>
                <Pressable
                  disabled={message == ""}
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setDragModal(!dragModal)
                    setClick(true)
                  }}>
                  <Text style={{fontWeight: 'bold',textAlign: 'center', 
                  color:'black' }}>취소</Text>
                </Pressable>
                <Text>    </Text>
                <Pressable
                  disabled={message == ""}
                  style={styles.buttonOpen}
                  onPress={() => {
                    setDragModal(!inputModal)
                    sendInput()
                    setClick(true)
                  }}>
                  <Text style={styles.textStyle}>전송</Text>
                </Pressable>
              </View>
              </View>
            </View>
          </View>


          
        </Modal>



        {/* 인풋 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={inputModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setInputModal(!inputModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ padding: 10, justifyContent: 'center' }}>
                <View style={{ borderBottomWidth: 1, width: '100%', }}>
                  <Text style={{ fontSize: 30 }}>메세지 보내기</Text>
                </View>
              </View>

              <View style={{ padding: 8, backgroundColor: 'yellow', width: '100%' }}>
                <View style={{ backgroundColor: 'white', width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, padding: 5 }}>산책할 사람들을 모집해보세요!</Text>
                  <Text style={{ fontSize: 15 }}>*OO시에 OOO에서 만나요*</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'yellow' }}>
                    <TextInput
                      style={{ width: "30%", height: 40, margin: 12, borderWidth: 1, padding: 5, }}
                      onChangeText={handleFirTimeChange}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={firnum}
                    />
                    <Text>  :  </Text>
                    <TextInput
                      style={{ width: "30%", height: 40, margin: 12, borderWidth: 1, padding: 5, }}
                      onChangeText={handleSecTimeChange}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={secnum}
                    />
                  </View>
                  <Text sytle={{ fontSize: 10 }}>{timeErrM}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setMessage}
                    value={content}
                    placeholder="장소를 입력해주세요"
                  />
                </View>
              </View>

              <Text></Text>
              <View style={{ flexDirection: 'row' }}>
                <Pressable
                  disabled={message == ""}
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setInputModal(!inputModal)
                    setClick(true)
                  }}>
                  <Text style={{fontWeight: 'bold',textAlign: 'center', color:'black' }}>취소</Text>
                </Pressable>
                <Text>    </Text>
                <Pressable
                  disabled={message == ""}
                  style={styles.buttonOpen}
                  onPress={() => {
                    setInputModal(!inputModal)
                    sendInput()
                    setClick(true)
                  }}>
                  <Text style={styles.textStyle}>전송</Text>
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



        {/* 사진찍은 후 모달 */}
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
                  style={styles.buttonClose}
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


              // region={region}
              onRegionChange={mapRegionChangehandle}


              //사용자 위치에 맞게 마커가 표시된다.
              showsUserLocation={true}
              // userLocationUpdateInterval = 
              onUserLocationChange={(e) => {
                //사용자가 이동하면 위치를 저장함
        
                setLatit(e.nativeEvent.coordinate.latitude)
                setLong(e.nativeEvent.coordinate.longitude)
              }}
            >
              {
                check ?
                  <Marker
                    coordinate={{
                      latitude: parseFloat(region.latitude),
                      longitude: parseFloat(region.longitude),
                    }}
                  >
                    {/* 어떤 애완동물인지 정보 보여주기 */}
                    <Callout>
                      <Text>{e.id}</Text>
                    </Callout>
                  </Marker> : null
              }



              {/* 주변 사람들 마커 표시 */}
              {
                click && people && people.map((e, index) => {
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: parseFloat(e.latitude),
                        longitude: parseFloat(e.longitude),
                      }}
                    >
                      {/* 어떤 애완동물인지 정보 보여주기 */}
                      <Callout>
                        <Text>{e.id}</Text>
                      </Callout>
                    </Marker>
                    // </Pressable>
                  );
                })
              }

              {/* 반경 */}
              <Circle center={mapRegion} radius={1000} />






            </MapView>



            <View style={styles.buttons}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                <Pressable style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  elevation: 3,
                  width: '20%',
                  margin: 3
                }} onPress={() => {
                  setModalVisible(true)
                }}>
                  <View style={{ backgroundColor: 'red' }}>
                    <Image style={{ resizeMode: "cover", width: 40, height: 40, }} source={require('../../assets/images/list.png')}></Image>
                  </View>
                </Pressable>
                {
                  check ? <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    elevation: 3,
                    backgroundColor: '#F7931D',
                    width: '30%',
                    margin: 3
                  }} onPress={() => {
                    setClick(true)
                    setModalVisible(false)
                    setInputModal(true)
                  }}>
                    <Text>위치확정</Text>
                  </Pressable> : 
                    <Pressable style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      elevation: 3,
                      backgroundColor: '#F7931D',
                      width: '30%',
                      margin: 3
                    }} onPress={() => {
                      setClick(false)
                      setModalVisible(false)
                      // 드래그해서 위치를 선정해주세요 모달
                      setDragModal(true)
                  
                    }}>
                      <Text>산책하쉴</Text>
                    </Pressable> 
                    
                }

                <Pressable style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  elevation: 3,
                  backgroundColor: '#3AB5A9',
                  width: '26%',
                  margin: 3
                }} onPress={() => {
                  // setInputModal(false)
                  // setEndModal(true);
                  stopWalk()
                  setClick(true)
                }}>
                  <Text >산책 끝</Text>
                </Pressable>


              </View>
            </View>
          </View>





          :
          <LottieView
            source={require('../../assets/dog.json') /** 움직이는 LottieView */
            }
            autoPlay loop
          />
      }



    </View >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  map: {
    width: "100%",
    height: "85%",
  },
  buttons: {
    padding: 15,
    height: "15%",
    flexDirection: 'row',
    widh: "100%",
    justifyContent: 'center',
    backgroundColor: 'yellow'
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
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewScroll: {
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
    width: '90%',
    height: '60%',
  },
  buttonOpen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#ffffff',
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
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});