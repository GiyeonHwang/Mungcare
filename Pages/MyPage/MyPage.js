import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function MyPage(navigation) {
    const [id, setId] = React.useState(""); // 아이디
    const [pw, setPw] = React.useState(""); // 비밀번호
    const [name, setName] = React.useState(""); // 이름
    const [nickname, setNickname] = React.useState(""); //닉네임
    const [phone, setPhone] = React.useState(""); // 전화번호
    const [address, setAddress] = React.useState(""); // 주소
    const [detailaddress, setDetailAddress] = React.useState("");//상세주소
    const [location_Num, onChangeLocationNum] = React.useState(""); // 우편번호
    const [check, setCheck] = React.useState(true); //스피너 위치기반 서비스 허용 여부

    React.useEffect(() => {

        // 서버에 요청
        /*
        axios.post("http://192.168.2.94:5000/member/mypage", null, {
            params : {
                id: "user3" //sessionStorage에 있는 id값
            }
        })
        .then(function (res){
            console.log(res.data);

            setId(res.data.id);
            setPw(res.data.pw);
            setName(res.data.name);
            setNickname(res.data.nickname);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setDetailAddress(res.data.detail_Address);
            onChangeLocationNum(res.data.location_Num);
            //setCheck(res.data.check);
        })
        .catch(function (error){
            console.log(error)
        })*/



    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 회원 정보 </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>닉네임</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{nickname}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>이메일</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{id}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>이름</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>비밀번호</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{pw}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>전화번호</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{phone}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>주소</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>상세주소</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{detailaddress}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>우편번호</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>dfdfdf{location_Num}</Text>
                        </View>
                    </View>
                </View>
                {/* 스피너 
                {
                    check ? <Button title="cTrue">dfdf</Button> : <Button title="cFalse">dfdf</Button>
                }*/}

                <View>
                    <Button title="수정" onPress={() => Alert.alert('MypageModify 페이지로 변환')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    infoName: {
        backgroundColor :"red",
        padding: 10,
        alignItems: 'center',
        width: 130,
    },
    info: {
        backgroundColor :"blue",
        padding: 10,
        width: 184,
        alignItems: 'center',
    },

});