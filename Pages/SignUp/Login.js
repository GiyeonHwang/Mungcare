import 'react-native-gesture-handler';
// import React from "react";


//페이지 import
import Join from './Join';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, 
         View, 
         TextInput, 
         Text, 
         TouchableOpacity, 
         Alert
} from "react-native";

const Login = () => {       // 화면 이동을 위해 매개변수 navigation 넣어주기

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    function login(navigation) {
      console.log(id);
      console.log(pw);
        if (id.trim() === "") {
            Alert.alert("아이디 입력 확인", "아이디가 입력되지 않았습니다.");
        } else if (pw.trim() === "") {
            Alert.alert("비밀번호 입력 확인", "비밀번호가 입력되지 않았습니다.");
        } else {
            axios.post("http://192.168.2.94:5000/member/login", 
                null, 
                { params: {
                  id: id, 
                  pw: pw
                } }
            ).then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.data = "Success") {
                    console.log("로그인 성공");
                } else {
                    Alert.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
                    setId("");
                    setPw("");
                }
            }).catch(function(err) {
                console.log(`Error Message: ${err}`);
                console.log(err.res.data)
            })
        }
    }

    return (
        <View style={styles.container}>
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

            {/* TouchableOpacity == Anchor */}
            <TouchableOpacity 
                onPress={() => navigation.navigate("account")}
            >
                <Text style={styles.forgotButton}>회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.loginBtn} 
                onPress={() => login()}
            >
                <Text style={styles.whiteColor}>로그인</Text>
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
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#ffc0cb",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
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
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ff1493",
    },
    whiteColor: {
        color: "#ffffff"
    }
});

export default Login;


