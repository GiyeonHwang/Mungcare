import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import ServerPort from '../../Components/ServerPort';
const Stack = createStackNavigator();

import axios from "axios";
import React, { useState } from "react";
import {
    StyleSheet,View,TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, Dimensions, Image} from "react-native";


import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';



const Login = ({ navigation }) => {       // 화면 이동을 위해 매개변수 navigation 넣어주기
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const isFocused = useIsFocused();
    const navigatePage = useNavigation();
    const [Token, setToken] = useState(0);
    const IP = ServerPort();


    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('id', value);
        } catch (e) {
            console.log("예외발생", e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                console.log("유저 아이디 가져오기", value);
            }
        } catch (e) {
            console.log("getData 실패");
        }
    }



    function login() {
        if (id.trim() === "") {
            Alert.alert("아이디 입력 확인", "아이디가 입력되지 않았습니다.");
        } else if (pw.trim() === "") {
            Alert.alert("비밀번호 입력 확인", "비밀번호가 입력되지 않았습니다.");
        } else {
            axios.post(`${IP}/member/login`,
                null,
                {
                    params: {
                        id: id,
                        pw: pw
                    }
                }
            ).then((res) => {
                if (res.data === id) {
                    storeData(res.data)
                    navigatePage.navigate('DrawerNavigater');
                    console.log(getData());
                } else {
                    Alert.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
                    setId("");
                    setPw("");
                }
            }).catch(function (err) {
                console.log(`Error Message: ${err}`);
                console.log(err.data)
            })
        }
    }

    return (
        <View style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.touchable}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="아이디"
                        placeholderTextColor="#003f5c"
                        onChangeText={(id) => setId(id)}
                        value={id}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        textContentType="pw"
                        placeholder="비밀번호"
                        placeholderTextColor="#003f5c"
                        value={pw}
                        onChangeText={(pw) => setPw(pw)}
                        secureTextEntry={true}
                    />
                </View>
            </TouchableWithoutFeedback>


            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TouchableOpacity
                >
                    <Text style={styles.forgotButton}>아이디 찾기</Text>
                </TouchableOpacity>
                <Text>   |   </Text>
                <TouchableOpacity
                >
                    <Text style={styles.forgotButton}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <Text>   |   </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Join")}
                >
                    <Text style={styles.forgotButton}>회원가입</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => login()}
            >
                <Text style={styles.whiteColor}>로그인</Text>
            </TouchableOpacity>

            <View style={{width:'60%', borderBottomWidth:2, height:'3%', borderColor:'gray'}}></View>

            <TouchableOpacity
                style={styles.kakaobt}
                onPress={() => navigation.navigate("Kakao")}
            >
                <Image style={{ resizeMode: "cover", width: '20%', height: '80%', }} source={{ uri: "https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd" }}></Image>
                <Text style={{color:'#3B1C1C', fontWeight:'bold'}}>  카카오톡으로 회원가입</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e9e9e9",
        alignItems: "center",
        justifyContent: "center",
        width:Dimensions.get('window').width ,
        height:Dimensions.get('window').height ,
    },
    touchable:{
        justifyContent: 'center', 
        alignItems: 'center',
        width:Dimensions.get('window').width ,
    },
    inputView: {
        backgroundColor: "#FFAF9B",
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        width:'70%'
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20
    },
    forgotButton: {
        height: 30,
        marginBottom: 30
    },
    loginBtn: {
        width: "45%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8B190",
    },
    whiteColor: {
        color: "#ffffff"
    },
    kakaobt:{
        backgroundColor:'#F9E000', 
        width:'50%', 
        marginTop:20, 
        height:'6%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:10
    }
});

export default Login;

