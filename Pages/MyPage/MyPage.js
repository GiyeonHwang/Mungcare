import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function MyPage({navigation}) {
    const [id, setId] = React.useState(""); // 아이디
    const [pw, setPw] = React.useState(""); // 비밀번호
    const [name, setName] = React.useState(""); // 이름
    const [nickname, setNickname] = React.useState(""); //닉네임
    const [phone, setPhone] = React.useState(""); // 전화번호
    const [address, setAddress] = React.useState(""); // 주소
    const [detailaddress, setDetailAddress] = React.useState("");//상세주소
    const [location_Num, onChangeLocationNum] = React.useState(""); // 우편번호
    const [check, setCheck] = React.useState(true); //스피너 위치기반 서비스 허용 여부
    const [point, setPoint] = React.useState();
    const [profile, setProFile] =React.useState();
    
    React.useEffect(() => {

        // 서버에 요청
        
        axios.post("http://192.168.2.94:5000/member/info", null, {
            params : {
                id: "user" //sessionStorage에 있는 id값
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
            setPoint(res.data.accurePoint);
            setPoint(12345)
        })
        .catch(function (error){
            console.log(error)
        })

    }, []);

    // AsyncStorage.setItem("check", "cccc", () => {
    //     console.log("저장완료")
    // });
    const checkAsy = () => {
        AsyncStorage.getItem("check", (e, result) => {
            console.log(result)
        })
    }
    // AsyncStorage.removeItem("check")

    return (
        <>
            <View style={{ width: '100%', height: '25%', padding: 10,  alignItems: 'center', }}>
                <View style={{ padding: 10, width:'80%', height:'100%'}}>
                    {/* 포인트, 프로필 */}
                    <View style={{ flexDirection: 'row', backgroundColor:'red', height : '65%' , borderBottomWidth: 1,}}>
                        <View style={{ backgroundColor: 'blue', width: '65%', padding: 10 }}>
                            <View style={{ backgroundColor: 'white', height: '25%'}}>
                                <Text style={{fontSize:13, }}>내 포인트</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: '75%', }}>
                                <View style={{ width: '30%', height: '100%', backgroundColor: 'red', }}>
                                    <View style={{ alignItems: 'center'}}>
                                        <Image source={require('../../assets/images/coin.png')} style={{width:'100%',height:'100%'}} />
                                    </View>
                                </View>
                                <View style={{ width: '70%', height: '100%', backgroundColor: 'yellow' }}>
                                    <Text>{point}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'red', width: '35%', padding: 10 }}>
                            {/* 프로필 */}
                            <View style={{ alignItems: 'center'}}>
                                <Image source={require('../../assets/images/coin.png')} style={{ width: '100%', height: '100%' }} />
                            </View>
                        </View>
                    </View>
                    {/* 포인트 현황, 닉네임 */}
                    <View style={{ flexDirection: 'row', backgroundColor:'red', height : '30%'}}>
                        <View style={{ backgroundColor:'lightgreen', width:'65%'}}>
                            <Button title='포인트 현황보기' ></Button>
                        </View>
                        <View style={{padding:10, backgroundColor:'blue', width:'35%', alignContent:'center', }}>
                            <Text >{nickname}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', height: '75%', backgroundColor: 'lightgreen' }}>
                <View style={{ padding: 30 }}>
                    <View style={{ padding: 10, width: '100%', backgroundColor: 'red', }}>
                        <Button title="상세 정보 페이지" onPress={() => {
                            navigation.navigate("MyInfo", {
                                info : [id, pw, name, nickname, phone, address, detailaddress, location_Num, check, point],
                                title : "user Info"
                            })
                        }}></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="애완동물정보" onPress={() =>{
                            navigation.navigate("AnimalList")
                        }} ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="밥 알람"  onPress={() =>{
                            navigation.navigate("Food")
                        }} ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="켈린더" ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="놀아주기" ></Button>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: '#eaeaea',
        backgroundColor:"#c9fffe"
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