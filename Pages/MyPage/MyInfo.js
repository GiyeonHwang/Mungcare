import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Alert, Image, ScrollView, } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

// 버튼 스타일
import { Button } from '@rneui/themed';

const Stack = createStackNavigator();

export default function MyPage({ navigation, route }) {
    const [id, setId] = React.useState(route.params.info[0]); // 아이디
    const [pw, setPw] = React.useState(route.params.info[1]); // 비밀번호
    const [name, setName] = React.useState(route.params.info[2]); // 이름
    const [nickname, setNickname] = React.useState(route.params.info[3]); //닉네임
    const [phone, setPhone] = React.useState(route.params.info[4]); // 전화번호
    const [address, setAddress] = React.useState(route.params.info[5]); // 주소
    const [detailaddress, setDetailAddress] = React.useState(route.params.info[6]);//상세주소
    const [location_Num, onChangeLocationNum] = React.useState(route.params.info[7]); // 우편번호
    const [point, setPoint] = React.useState(route.params.info[9]); // 포인트


    return (
        <View style={styles.container}>
                <View style={styles.title}>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>닉네임</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{nickname}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>이메일</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{id}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>이름</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>전화번호</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{phone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>주소</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>상세주소</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{detailaddress}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>우편번호</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infotextsize}>{location_Num}</Text>
                            </View>
                        </View>
                         {/* 스피너 */}
                         <View style={styles.box2}>
                         {
                        check ? 
                        <Button title="cTrue"  
                        buttonStyle={{
                            marginLeft:"10%",
                            marginTop:"25%",

                            // borderColor: '#ffffff', 
                            borderColor:"black"
                        }}
                        type="outline"
                        titleStyle={{ color: '#F7931D',fontWeight: "bold", fontSize:18 }}
                        containerStyle={{
                            // width: 200,
                            // marginHorizontal: 50,
                            // marginVertical: 15,
                        }}>
                            dfdf</Button> 
                            : <Button title="cFalse"  
                            buttonStyle={{
                                marginLeft:"10%",
                                marginTop:"25%",
                                // borderColor: '#ffffff', 
                                borderColor:"black"
                            }}
                            type="outline"
                            titleStyle={{ color: '#F7931D',fontWeight: "bold", fontSize:18 }}
                            containerStyle={{
                                // width: 200,
                                // marginHorizontal: 50,
                                marginVertical: 15,
                            }}>
                                dfdf</Button>
                    }
                    <View>
                        <Button title="수정하러 가기"
                                buttonStyle={{
                                    marginLeft:"30%",
                                    marginTop:"10%",
                                    // borderColor: '#ffffff', 
                                    borderColor:"black"

                                }}
                                type="outline"
                                titleStyle={{ color: '#F7931D',fontWeight: "bold", fontSize:18 }}
                                containerStyle={{
                                    // width: 200,
                                    // marginHorizontal: 50,
                                    // marginVertical: 15,
                                }}
                                onPress={() => {
                                    navigation.navigate("MyPageModify",{
                                        info : [id, pw, name, nickname, phone, address, detailaddress, location_Num, point],
                                        title : "user Info",
                                        mypageInfo: route.params.mypageInfo
                                    });
                                }}/>
                    </View>
                            
                         </View>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: '#eaeaea',
        backgroundColor: "#EBE3D7"
    },
    title: {
        flex:1,
        margin:"2%",
        // marginTop: 16,
        // paddingVertical: 8,
        // borderWidth: 1,
        // borderColor: '#20232a',
        // borderRadius: 6,
        // backgroundColor: '#61dafb',
        // color: '#20232a',
        // textAlign: 'center',
        // fontSize: 30,
        // fontWeight: 'bold',
    },
    box1:{
        // padding: 10,
        margin:"5%",
        // borderWidth:1
    },
    infobox:{
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginTop:"0.5%"
        // width: '100%'
    },
    infotext:{
        fontSize: 20
    },
    infoName: {
        // backgroundColor: "red",
        // padding: 10,
        alignItems: 'center',
        width: 130,
    },
    info: {
        // backgroundColor: "blue",
        padding: 9,
        width: 184,
        alignItems: 'center',
    },
    infotextsize:{
        fontSize: 15
    },
    box2:{
        flexDirection: 'row',
    }

});