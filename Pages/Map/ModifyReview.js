import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as Location from 'expo-location';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//npm i react-native-gesture-handler

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

const ModifyReview = ({ navigation, route }) => {
    // const [mapRegion, setmapRegion] = useState()
    const [mapRegion, setmapRegion] = useState({});
    const [region, setRegion] = React.useState({
        latitude: route.params.info[0], //위도
        longitude: route.params.info[1], //경도
        latitudeDelta: 0.07, //확대되는 범위
        longitudeDelta: 0.07, //확대되는 범위});
    })
    //이미지
    const [imguri, setImgUri] = useState(route.params.info[2]);
    //갤러리 권한 요청이 되어있는지 확인
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();


    //에니메이션으로 이동
    const mapRef = React.useRef(null);
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

    //리뷰내용
    const [rating, setRating] = useState(route.params.info[5]);
    const [text, setText] = useState(route.params.info[3]);
    const [address, setAddress] = useState(route.params.info[4]);
    const [errormessage, setErrorMessage] = useState("");
    const [okReivew, setOkReview] = useState(true);
    const [okAddress, setOkAddress] = useState("")

    const [id, setId] = React.useState();
    useEffect(() => {
        (async () => {
            console.log(route.params.info[6])
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
            
            // id 가져오기
            // const value = await AsyncStorage.getItem("id");
            // setId(value)

            onDetail(route.params.info[0], route.params.info[1])


        })();
    }, []);

    //이동할 때의 위도 경도
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
            url: 'http://192.168.2.77:5000/upload',
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


    //이동하기
    const onDetail = (lat, lon) => { // 병원 리스트 중 하나 클릭하면 해당 위도, 경도 가져옴....
        console.log('onDetail')
        setmapRegion({ // 현재 위치
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        })
        mapRef.current.animateToRegion({ // 해당 위치로 지도 이동
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }, 3 * 1000);
    }


    //리뷰내용 확인
    const valuecheck = (len) => {
        if (len.length > 2) {
            return true;
          } else {
            return false
          }
    }

    //리뷰 장소 내용 핸들러
    const handleAddressChange = (text) => {
        if ((text.includes('읍')) || (text.includes('면')) || (text.includes('동'))) {
            
            setOkAddress(true)
            setAddress(text)
            return(true)
        } else {
            setOkAddress(false)
            return (false)
        }
        
    }

    //리뷰 내용 확인 핸들러
    const handleReviewChange = (text) => {
        console.log(text)
        setText(text);
        setErrorMessage(
            valuecheck(text) ? "리뷰 내용은 2~50자로 작성해주세요" : null
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
        console.log('address', address)
        console.log('text', text)
        console.log('rating', rating)
        console.log(valuecheck(text))
        console.log(handleAddressChange(address))

        const date = new Date();
        const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        if (valuecheck(text) && handleAddressChange(address)) {
            if (rating === 0) {

                Alert.alert("별점을 꼭 체크해주셔야합니다")

            } else {
                console.log('왕')

                //서버에 값 보내기
                axios.post("http://192.168.2.94:5000/review/modify", null, {
                  params: {
                    vNo: route.params.info[6], //async
                    vContent:text,
                    latitude: region.latitude,
                    longitude: region.longitude,
                    star: rating,
                    vPhoto: imguri,
                  }
                })
                  .then(function (res) {
                    console.log("resgister", res.data);
                    if (res.data){
                        Alert.alert('수정되었습니다')
                      navigation.push('Review')
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
            }
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
                            <Text>내 위치</Text>
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
                        imguri === null ? <Button title='이미지 넣기' onPress={uploadImage}></Button> :
                            <View>
                                <Image style={{ resizeMode: "cover", width: '100%', height: '100%', }} source={{ uri: imguri }}></Image>
                            </View>
                    }
                </View>
                <View style={styles.inputarea}>
                    {
                        imguri != null?
                            <Button title='이미지 넣기' onPress={uploadImage}></Button> : null
                    }
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View>
                            <Text></Text>
                            <TextInput
                                style={styles.textinput}
                                maxLength={10}
                                multiline={true}
                                onChangeText={handleAddressChange}
                                value={address}
                                placeholder="장소의 정보(읍/면/동)를 작성해주세요"
                            />
                            <Text></Text>
                            {/* 리뷰내용 */}
                            <TextInput
                                style={[styles.textinput, { height: '45%' }]}
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
                        }}>
                        <Text style={[styles.textStyle, { color: '#FE7474' }]}>취소</Text>
                    </Pressable>
                    <Text>    </Text>
                    <Pressable
                        style={[styles.button, { backgroundColor: '#FE7474', }]}
                        onPress={() => {
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
export default ModifyReview;

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