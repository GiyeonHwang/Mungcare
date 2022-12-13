import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

import ServerPort from '../../Components/ServerPort';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Play({ navigation }) {

    const [modalVisible, setModalVisible] = React.useState(true); //산책 전 안내사항
    const [finalModal, setFinalModal] = React.useState(false); // 산책 완료 모달

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    //아마존에 올린 사진 링크
    const [imgUri, setImgUri] = React.useState();

    const IP = ServerPort();

    // 로그인 유지
    const getId = async () =>{
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                console.log("id---: ", value);
                setId(value);
                console.log("id---------------: ", id);
            }
        } catch (e) {
            console.log("not session... ", e);
        }
    }
    const [id, setId] = React.useState();

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            await getId();
            console.log("----------id: ",id);
        })();
    }, []);

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
          url: `${IP}/upload`,
          headers: {
            'content-type': 'multipart/form-data',
          },
          data: formData
        })
            .then((res) => {
                console.log(res.data);
                setFinalModal(true)
                setImgUri(res.data[0]); // 링크
            })
    }

    const sendServer = () => {
        console.log("sendServer")
        console.log('imgUri', imgUri);
        const date = new Date();
        const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        console.log("id...",id);
        axios.post(`${IP}/calendar/start`, null, {
          params: {
            id: id,
            cDate: day,
            cType:"play",
            cPhoto: imgUri
          }
        })
            .then(function (res) {
                console.log(res.data);
                Alert.alert("등록 완료!")
                navigation.navigate("Main") //메인으로 돌아가기
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
                            <View >
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 18 }}>애완동물과 놀때 사진을 찍어주세요!</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 18 }}>놀기는 회당 5Point입니다</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 18 }}>놀때 사진을 꼭 찍어야 포인트가 인정됩니다</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 18 }}>사진은 갤러리에서 가져올 수 없으며 카메라를 허용해줘야지 인증할 수 있습니다</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ fontSize: 18 }}>사진이 없다면 데이터베이스에 저장되지 않습니다.. </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', padding: 10 }}>
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
                                    <Text style={{ fontSize: 30 }}>놀기 완료!</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10 }}>
                                <View style={{ backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', height: 350, width: 250 }}>
                                    <Image source={{ uri: image }} style={{ resizeMode: "cover", height: '100%', width: '100%', borderWidth: 3 }} />
                                </View>
                            </View>
                            <View style={{ padding: 10, alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20 }}>5Point적립 완료!</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>확인을 눌러야 데이터가 저장됩니다1</Text>
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








            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    type={type}
                />
                <View >
                    <Text></Text>
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
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.7,
        justifyContent: 'center',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F7931D',
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
})