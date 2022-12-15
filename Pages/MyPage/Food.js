import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import ListAlrams from '../../Components/ListAlrams';
import { ScrollView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
const Stack = createStackNavigator();

export default function Food({ navigation }) {


    const [storageDataList, setStorageDataList] = useState([]);

    React.useEffect(() => {
        async function tempFunction() {
            await getItemList();
        }

        tempFunction();

        return () => { };
    });

    const getItemList = async () => {
        try {
            const data = await AsyncStorage.getItem('itemList');

            const output = JSON.parse(data);

            setStorageDataList(output);
        } catch (err) {
            console.log(err);
        }
    };

    function cancelNotification(notifId) {
        console.log("삭제할 알람Id:", notifId)
        notifId.forEach(async (v) => {
            try {
                await Notifications.cancelScheduledNotificationAsync(v);
            } catch (err) {
                console.log("알람id삭제하는데 에러발생:",err);
            }
        });
    }

    const checkidx = async (e) => {
        // console.log("선택한 리스트 id:",e.Id);
        // console.log("스토리지 리스트 id:",e);
        //핸드폰에 저장된 알람 삭제
        cancelNotification(e.Id)
        //어싱크 스토리지에 저장된 아이템 필터링
        const removeItem = storageDataList.filter((item) => item !== e);
        console.log("한번 걸렀다", removeItem);
        // setStorageDataList(removeItem);
        const output = JSON.stringify(removeItem);
        await AsyncStorage.setItem('itemList', output);
        // console.log("걸러졌다", storageDataList);
    }
    // console.log("현재 알람1 : ", storageDataList);
    // console.log("현재 알람2 : ", storageDataList[0]);


    return (
        <View style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').width * 1 }}>
            {/* <View style={{ height: "25%", width: "100%", justifyContent: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>22시간 20분 후에{"\n"}알람이 울려요!</Text>
                <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>12월 08일 (금) 오전 8:20</Text>
                
            </View> */}
            <View style={{ height: "5%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => navigation.push("AddFood")}>
                    <Icon name="add-outline" size={30} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {storageDataList ? <>
                    {storageDataList.map((e, idx) => (
                        <TouchableHighlight key={idx}
                            onLongPress={() =>
                                Alert.alert("잠깐만요!", "정말로 삭제 하실건가요?", [
                                    {
                                        text: "취소",
                                        onPress: () => null,
                                    },
                                    {
                                        text: "삭제", onPress: () => {
                                            checkidx(e)
                                        }
                                    }
                                ])
                            }
                        >
                            <ListAlrams key={idx} {...e} />
                        </TouchableHighlight>
                    )
                    )
                    }
                </>
                    : <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 40, color: "gray" }}>알람을 추가해주세요</Text>
                    </View>
                }
            </ScrollView>
        </View>


    )
}