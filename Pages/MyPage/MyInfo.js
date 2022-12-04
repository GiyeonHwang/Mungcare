import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Image, ScrollView, } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [check, setCheck] = React.useState(route.params.info[8]); //스피너 위치기반 서비스 허용 여부
    const [point, setPoint] = React.useState(route.params.info[9]); // 포인트



    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    
                    <View style={styles.title}>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>닉네임</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{nickname}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>이메일</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{id}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>이름</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>전화번호</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{phone}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>주소</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{address}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>상세주소</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{detailaddress}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                <View style={styles.infoName}>
                                    <Text style={{ fontSize: 20 }}>우편번호</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={{ fontSize: 15 }}>{location_Num}</Text>
                                </View>
                            </View>
                        </View>
                        {/* 스피너 */}
                        {
                            check ? <Button title="cTrue">dfdf</Button> : <Button title="cFalse">dfdf</Button>
                        }
                        <View>
                            <Button title="수정" onPress={() => {
                                Alert.alert('MypageModify 페이지로 변환')
                                navigation.navigate("MyPageModify",{
                                    info : [id, pw, name, nickname, phone, address, detailaddress, location_Num, check, point],
                                    title : "user Info"
                                });
                            }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: '#eaeaea',
        backgroundColor: "#c9fffe"
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
        backgroundColor: "red",
        padding: 10,
        alignItems: 'center',
        width: 130,
    },
    info: {
        backgroundColor: "blue",
        padding: 10,
        width: 184,
        alignItems: 'center',
    },

});