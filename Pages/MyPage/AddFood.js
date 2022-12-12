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


import * as DocumentPicker from 'expo-document-picker';
import Write from '../Boards/Write';
const Stack = createStackNavigator();




export default function AddFood({ navigation }) {

    //시간
    const [time, setTime] = React.useState(asPickerFormat(new Date()));
    //고른 mp3 파일 이름
    const [mp3, setMp3] = React.useState("");
    //진동 여부
    const [vibrate, setVibrate] = React.useState(false);
    //이름
    const [name, setName] = React.useState("");
    //날짜
    const [monday, setMonday] = React.useState("");
    const [tuesday, setTuesday] = React.useState("");
    const [wednesday, setWednesday] = React.useState("");
    const [thursday, setThursday] = React.useState("");
    const [friday, setFriday] = React.useState("");
    const [saturday, setSaturday] = React.useState("");
    const [sunday, setSunday] = React.useState("");

    //시간 스트링변환
    const SelectTime = time.toTimeString()
    //알람 객체들
    const AlarmData = {
        "Time": SelectTime ,
        "Mp3":  mp3 ,
        "Vibrate": vibrate ,
        "Name":  name ,
        "Days":  [monday, tuesday, wednesday, thursday, friday, saturday, sunday] 
    }
    //어싱크 스토리지에 담을 배열
    const [storageDataList, setStorageDataList] = useState([]);

    //헤더에 작성버튼 만들기
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: "10%" }} onPress={() => Write()}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>저장</Text>
                </TouchableOpacity>
            ),
        });
    })

    //저장버튼 누르면 어싱크에 객체담기
    const Write = async () => {


        try {
            storageDataList.push(AlarmData);
      
            const output = JSON.stringify(storageDataList);
      
            await AsyncStorage.setItem('itemList', output);
            // alert('Data Is Added');
          } catch (err) {
            console.log(err);
          }

        navigation.navigate("Food");
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
        if(sunday == "sunday"){
            setSunday("");
        }
        else{
            setSunday("sunday");
        }

        // setSunday(current => !current);
    }
    function checkMonday() {
        if(monday == "monday"){
            setMonday("");
        }
        else{
            setMonday("monday");
        }
        // setMonday(current => !current);
    }
    function checkTuesday() {
        if(tuesday == "tuesday"){
            setTuesday("");
        }
        else{
            setTuesday("tuesday");
        }
        // setTuesday(current => !current);
    }
    function checkWednesday() {
        if(wednesday == "wednesday"){
            setWednesday("");
        }
        else{
            setWednesday("wednesday");
        }
        // setWednesday(current => !current);
    }
    function checkThursday() {
        if(thursday == "thursday"){
            setThursday("");
        }
        else{
            setThursday("thursday");
        }
        // setThursday(current => !current);
    }
    function checkFriday() {
        if(friday == "friday"){
            setFriday("");
        }
        else{
            setFriday("friday");
        }
        // setFriday(current => !current);
    }
    function checkSaturday() {
        if(saturday == "saturday"){
            setSaturday("");
        }
        else{
            setSaturday("saturday");
        }
        // setSaturday(current => !current);
    }

    function checkVibrate(){
        setVibrate(current => !current);
        // console.log("진동설정 :" ,vibrate);
    }

    // {time.toTimeString()} -> 선택시간 문자열로 변환

    console.log("알람객체:",AlarmData);
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
                <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, justifyContent: "flex-end", padding: 10, marginTop: "5%" }}>
                    <TouchableOpacity onPress={pickDocument}><Text style={{ fontSize: 20 }}>알람음</Text><Text style={{ fontSize: 15, color: "blue",marginTop:10 }}>{mp3}</Text></TouchableOpacity>
                </View>
                <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 10, }}>
                    <Text style={{ fontSize: 20 }}>진동 설정</Text>
                    <SwipeButton  width={50} height={20} onSwipeFail={checkVibrate} onSwipeSuccess={checkVibrate} railBackgroundColor="#F1E7DD" railFillBackgroundColor="#743727" title='' railFillBorderColor='#743727' railBorderColor='#F1E7DD' thumbIconBackgroundColor='#3B1E1E' thumbIconBorderColor='#3B1E1E' />
                </View>


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
