import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';
import concat from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asPickerFormat } from '../../Components/utils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../Components/values';
import TimePicker from '../../Components/TimePicker';
import Alarm from 'react-native-alarm-manager';
//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from 'react-native-gesture-handler';
import SwipeButton from 'rn-swipe-button';
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';

import * as Notifications from 'expo-notifications';
import * as DocumentPicker from 'expo-document-picker';
import Write from '../Boards/Write';
const Stack = createStackNavigator();




export default function AddFood({ navigation }) {

    //스케쥴 아이디
    const [id, setId] = React.useState();
    //시간
    const [time, setTime] = React.useState(asPickerFormat(new Date()));
    //고른 mp3 파일 이름
    const [mp3, setMp3] = React.useState("");
    //진동 여부
    const [vibrate, setVibrate] = React.useState(false);
    //이름
    const [name, setName] = React.useState("");
    //날짜
    const [monday, setMonday] = React.useState();
    const [tuesday, setTuesday] = React.useState();
    const [wednesday, setWednesday] = React.useState();
    const [thursday, setThursday] = React.useState();
    const [friday, setFriday] = React.useState();
    const [saturday, setSaturday] = React.useState();
    const [sunday, setSunday] = React.useState();
    const [dayArray,setdayArray] = React.useState([]);
    //시간 스트링변환
    const SelectTime = time.toTimeString()

    //어싱크 스토리지에 담을 배열
    const [storageDataList, setStorageDataList] = useState([]);

    //헤더에 작성버튼 만들기
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: "10%" }}  onPress={() => Write()}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>저장</Text>
                </TouchableOpacity>
            ),
        });
    })

    //여기서부터
    React.useEffect(() => {
        async function tempFunction() {
            await getItemList();
        }

        tempFunction();

        return () => { };
    }, []);
    //여기까지 리스트를 추가하는데 get어싱크를 하는 이유는 리엑트에서 배열에 푸쉬를 하려면 기존의 배열을 불러와서 값을 넣은다음에 푸쉬해야 다음 배열값으로 값이 추가됨
    const getItemList = async () => {
        try {
            const data = await AsyncStorage.getItem('itemList');

            const output = JSON.parse(data);
           

            if(data){
            setStorageDataList(output);
            }
            else{
                return false
            }
        } catch (err) {
            console.log(err);
        }
    };

    //저장버튼 누르면 어싱크에 객체담기
    const Write = async () => {
        // console.log("요일설정",AlarmData.Days);
        // if(AlarmData.Days.length === 0){
        //     Alert.alert("요일을 선택해주세요!")
        // }
        // else{
        if(dayArray.length===0){
            Alert.alert("요일을 선택해주세요!")
        }
        else{
        try {
            
           
            //여부터
            const idarray = [];
            const weekday = dayArray;
            const hours = time.getHours();
            const minutes = time.getMinutes();
            let writeid
           
          
            console.log("시작!!!")
            //weekday에 배열값을 동적으로 담아서 forEach를 사용해 엘리먼트 값대로 트리거에 넣어준다 v가 forEach를 사용해 나오는 엘리멘트값임
            weekday.forEach(async (v) => {
                writeid = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "확인해주세요",
                        body: "밥시간이 되었어요",
                        sound: 'default',
                        vibrate: vibrate,
                    },
                    trigger: {
                        weekday: v,
                        hour: hours,
                        minute: minutes,
                        repeats: true,
                    },
                }
            )
            idarray.push(writeid)
        });

            setTimeout(async () => {
                let AlarmData = {
                    "Id": idarray,
                    "Time": SelectTime,
                    // "Mp3": mp3,
                    "Vibrate": vibrate,
                    "Name": name,
                    "Days": dayArray
                }

                console.log("알데", AlarmData)
                storageDataList.push(AlarmData)
                const output = JSON.stringify(storageDataList);
                await AsyncStorage.setItem('itemList', output);
                navigation.navigate("Food");
                console.log("끗!!!")

            }, 250)
        
        } catch (err) {
            console.log(err);
        }
    }
    }

    const pickDocument = async () => {
        //오디오 타입만 담기
        let result = await DocumentPicker.getDocumentAsync({
            type: "audio/*"
        });
        console.log(result.uri);
        console.log(result);
        setMp3(result.name)
    };

    //요일 선택 색
    function checkSunday() {
        if (sunday == 1) {
            const weekdayRemoved =dayArray.filter((element)=>element!=1);
            setdayArray(weekdayRemoved);
            setSunday("");
        }
        else {
            setSunday(1);
            setdayArray([...dayArray,1])
        }

        // setSunday(current => !current);
    }
    function checkMonday() {
        if (monday == 2) {
            const weekdayRemoved =dayArray.filter((element)=>element!=2);
            setdayArray(weekdayRemoved);
            setMonday("");
        }
        else {
            setMonday(2);
            setdayArray([...dayArray,2])
        }
        // setMonday(current => !current);
    }
    function checkTuesday() {
        if (tuesday == 3) {
            const weekdayRemoved =dayArray.filter((element)=>element!=3);
            setdayArray(weekdayRemoved);
            setTuesday("");
        }
        else {
            setTuesday(3);
            setdayArray([...dayArray,3])
        }
        // setTuesday(current => !current);
    }
    function checkWednesday() {
        if (wednesday == 4) {
            const weekdayRemoved =dayArray.filter((element)=>element!=4);
            setdayArray(weekdayRemoved);
            setWednesday("");
        }
        else {
            setWednesday(4);
            setdayArray([...dayArray,4])
        }
        // setWednesday(current => !current);
    }
    function checkThursday() {
        if (thursday == 5) {
            const weekdayRemoved =dayArray.filter((element)=>element!=5);
            setdayArray(weekdayRemoved);
            setThursday("");
        }
        else {
            setThursday(5);
            setdayArray([...dayArray,5])
        }
        // setThursday(current => !current);
    }
    function checkFriday() {
        if (friday == 6) {
            const weekdayRemoved =dayArray.filter((element)=>element!=6);
            setdayArray(weekdayRemoved);
            setFriday("");
        }
        else {
            setFriday(6);
            setdayArray([...dayArray,6])
        }
        // setFriday(current => !current);
    }
    function checkSaturday() {
        if (saturday == 7) {
            const weekdayRemoved =dayArray.filter((element)=>element!=7);
            setdayArray(weekdayRemoved);
            setSaturday("");
        }
        else {
            setSaturday(7);
            setdayArray([...dayArray,7])
        }
        // setSaturday(current => !current);
    }

    function checkVibrate() {
        setVibrate(current => !current);
        // console.log("진동설정 :" ,vibrate);
    }

    // const deleteNotifications = async()=>{
    //     Notifications.dismissAllNotificationsAsync();
    // }

    // function DeleteStorage(){
    //     AsyncStorage.removeItem('itemList')
    //     deleteNotifications()
    //     Alert.alert("삭제완료");
    //     navigation.navigate("Food");
    // }


    // {time.toTimeString()} -> 선택시간 문자열로 변환
    return (
        <View style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').width * 1 }}>
            <View style={{ height: "30%", width: "100%", justifyContent: "center" }}>
                <View style={styles.view}>
                    <TimePicker
                        value={time}
                        onChange={setTime}
                        // VIEW_WIDTH
                        width={"100%"}
                        // BUTTON_HEIGHT
                        buttonHeight={BUTTON_HEIGHT}
                        visibleCount={3}
                        borderWidth={0}
                    />
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.5, width: Dimensions.get('window').width * 1, backgroundColor: "#E2E2E2", marginTop: 20, borderRadius: 20, padding: 20 }}>
                <View style={{ height: "10%", width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    {/* <TouchableOpacity onPress={sundayCheck}><Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>일</Text></TouchableOpacity> */}
                    {sunday ? <TouchableOpacity onPress={checkSunday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>일</Text></TouchableOpacity> : <TouchableOpacity onPress={checkSunday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>일</Text></TouchableOpacity>}
                    {monday ? <TouchableOpacity onPress={checkMonday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>월</Text></TouchableOpacity> : <TouchableOpacity onPress={checkMonday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>월</Text></TouchableOpacity>}
                    {tuesday ? <TouchableOpacity onPress={checkTuesday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>화</Text></TouchableOpacity> : <TouchableOpacity onPress={checkTuesday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>화</Text></TouchableOpacity>}
                    {wednesday ? <TouchableOpacity onPress={checkWednesday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>수</Text></TouchableOpacity> : <TouchableOpacity onPress={checkWednesday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>수</Text></TouchableOpacity>}
                    {thursday ? <TouchableOpacity onPress={checkThursday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>목</Text></TouchableOpacity> : <TouchableOpacity onPress={checkThursday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>목</Text></TouchableOpacity>}
                    {friday ? <TouchableOpacity onPress={checkFriday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>금</Text></TouchableOpacity> : <TouchableOpacity onPress={checkFriday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>금</Text></TouchableOpacity>}
                    {saturday ? <TouchableOpacity onPress={checkSaturday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "#22B727" }}>토</Text></TouchableOpacity> : <TouchableOpacity onPress={checkSaturday}><Text style={{ fontSize: 15, fontWeight: "bold", color: "blue" }}>토</Text></TouchableOpacity>}
                </View>
                <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, justifyContent: "flex-end", padding: 10 }}>
                    <TextInput style={{ fontSize: 15 }} placeholder='알람 이름' maxLength={10} onChangeText={text => setName(text)}></TextInput>
                </View>
                {/* <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, justifyContent: "flex-end", padding: 10, marginTop: "5%" }}>
                    <TouchableOpacity onPress={pickDocument}><Text style={{ fontSize: 20 }}>알람음</Text><Text style={{ fontSize: 15, color: "blue", marginTop: 10 }}>{mp3}</Text></TouchableOpacity>
                </View> */}
                <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 10, }}>
                    <Text style={{ fontSize: 20 }}>진동 설정</Text>
                    <SwipeButton width={50} height={20} onSwipeFail={checkVibrate} onSwipeSuccess={checkVibrate} railBackgroundColor="#F1E7DD" railFillBackgroundColor="#743727" title='' railFillBorderColor='#743727' railBorderColor='#F1E7DD' thumbIconBackgroundColor='#3B1E1E' thumbIconBorderColor='#3B1E1E' />
                </View>

                {/* <Button onPress={DeleteStorage} title="알람지우기임시버튼"></Button> */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,

    },

});
