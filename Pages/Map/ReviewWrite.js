import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as Location from 'expo-location';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//npm i react-native-gesture-handler
import ServerPort from '../../Components/ServerPort';

//로그인 유지
import AsyncStorage from '@react-native-async-storage/async-storage';

import StarRating from 'react-native-star-rating-widget';
//expo install react-native-svg
//npm i react-native-star-rating-widget

//이미지 업로드
import * as ImagePicker from 'expo-image-picker';


const initialRegion = {
  latitude: 51.1261218,
  longitude: 3.347519199999965,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const Write = ({ navigation, route }) => {

  const [mapRegion, setmapRegion] = React.useState({})
  const [region, setRegion] = React.useState(initialRegion);

  //이미지
  const [imguri, setImgUri] = useState(null);
  //갤러리 권한 요청이 되어있는지 확인
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();


  //에니메이션으로 이동
  const mapRef = React.useRef(null);
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  //리뷰내용
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [okReivew, setOkReview] = useState("");

  const [id, setId] = React.useState();

  const IP = ServerPort();
  
  useEffect(() => {

    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // id 가져오기
      const value = await AsyncStorage.getItem("id");
      console.log("id-------------------",value);
      if (value!=null){
        setId(value)
      }
      
      let location = await Location.getCurrentPositionAsync({});
      
      setmapRegion({ //현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
    })();
  }, []);

  //이동할때의 위도 경도
  const mapRegionChangehandle = (region) => {
    setRegion(region);
  };

  const uploadImage = async () => {

    if (!status.granted) { // status로 권한이 있는지 확인
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    console.log('이미지피커', ~ImagePicker.MediaTypeOptions.Images)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1]
    });

    if (result.canceled) {
      return null;
    }
    console.log(result)
    setImgUri(result.uri);

    const localUri = result.assets[0].uri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('multipartFileList', { uri: localUri, name: filename, type });


    console.log('formData', formData)


    await axios({
        method: 'post',
        url: `${IP}/upload`,
        headers: {
            'content-type': 'multipart/form-data',
        },
        data: formData
    })
        .then((res) => {
            console.log(res.data);
            setImgUri(res.data[0]);
        })


  }



  //리뷰내용 확인
  const valuecheck = (len) => {
    if (len.length > 2) {
      return true;
    } else {
      return false
    }
  }
  
  //리뷰 내용 확인 핸들러
  const handleReviewChange = (text) => {
    setText(text);
    setErrorMessage(
      valuecheck(text) ? null : "리뷰 내용은 2~50자로 작성해주세요" 
    );
    setOkReview(valuecheck(text));
  }

  //별점
  const Star = () => {
    return (
      <StarRating
        rating={rating}
        onChange={setRating}
      />
    );
  };


  const sendServer = () => {
    console.log('text', text)
    console.log('rating', rating)
    console.log(okReivew)
    console.log('region', region)

    const date = new Date();
    const day = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    
    if (okReivew) {
      if (rating === 0) {

        Alert.alert("별점을 꼭 체크해주셔야합니다")

      } else {
        console.log('왕')

        // 서버에 값 보내기
        axios.post(`${IP}/review/register`, null, {
          params: {
            id: id, //async
            vContent:text,
            latitude: region.latitude.toFixed(10),
            longitude: region.longitude.toFixed(10),
            star: rating,
            vPhoto: imguri,
            vDate : day,
          }
        })
          .then(function (res) {
            console.log("resgister", res.data);
            console.log(id);
            if (res.data){
              Alert.alert("등록되었습니다")
              navigation.push('Review')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }else{
      Alert.alert("리뷰 내용을 작성해주세요")
    }

  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

      <View style={styles.mapbox}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
          ref={mapRef}
          onRegionChange={mapRegionChangehandle}
          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(region.latitude),
              longitude: parseFloat(region.longitude),
            }}
          >
            <Callout>
              <Text>현재 위치</Text>
            </Callout>
          </Marker>

          <View style={{ padding: 10 }}>
            <Text>* 추천할 곳을 드래그하여 선택해주세요</Text>
          </View>

        </MapView>
      </View>
      <View style={styles.review}>
        <View style={styles.imagearea}>
          {
            imguri === null? <Button title='이미지 넣기' onPress={uploadImage}></Button> : 
            <Image style={{ resizeMode: "cover", width: '100%', height: '100%', }} source={{ uri: imguri }}></Image>
          }
        </View>
        <View style={styles.inputarea}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View>
              <Text></Text>
              {/* 리뷰내용 */}
              <TextInput
                style={[styles.textinput, { height: '80%' }]}
                maxLength={50}
                multiline={true}
                numberOfLines={4}
                onChangeText={handleReviewChange}
                value={text}
                placeholder="리뷰 내용"
              />
              <Text>{errormessage}</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>

        {/* 별점 */}
        <View style={{ alignItems: 'center' }}>
          <Star></Star>
        </View>

        <View style={styles.buttonarea}>
          <Pressable
            style={[styles.buttonOpen, { backgroundColor: 'white', borderWidth: 2, borderColor: '#FE7474' }]}
            onPress={() => {
              console.log('press')
              navigation.navigate('Review')
            }}>
            <Text style={[styles.textStyle, { color: '#FE7474' }]}>취소</Text>
          </Pressable>
          <Text>    </Text>
          <Pressable
            style={[styles.button, { backgroundColor: '#FE7474', }]}
            onPress={() => {
              console.log('server')
              sendServer()
            }}>
            <Text style={styles.textStyle}>저장</Text>
          </Pressable>

        </View>
      </View>


    </KeyboardAvoidingView>
  );
};
//{latitudeDelta: 0.0922, longitudeDelta: 0.0421}
export default Write;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  mapbox: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.25,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  review: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.51,
    borderColor: '#FE7474',
    borderWidth: 3,
    borderRadius: 15,
    padding: 10
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  imagearea: {
    height: '40%',
    backgroundColor: 'yellow',
    justifyContent:'center'
  },
  inputarea: {
    height: '40%',
  },
  buttonarea: {
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textinput: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#FE7474',
    borderRadius: 8,
  }
});