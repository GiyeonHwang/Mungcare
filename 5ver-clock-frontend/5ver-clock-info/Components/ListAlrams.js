import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from "react";
import { Text, View, Image, ScrollView, SafeAreaView, Button, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeButton from 'rn-swipe-button';

export default function ListAlrams({ Id,Days, Mp3, Name, Time, Vibrate }) {

    //날짜
    const [monday, setMonday] = React.useState("");
    const [tuesday, setTuesday] = React.useState("");
    const [wednesday, setWednesday] = React.useState("");
    const [thursday, setThursday] = React.useState("");
    const [friday, setFriday] = React.useState("");
    const [saturday, setSaturday] = React.useState("");
    const [sunday, setSunday] = React.useState("");


    var checkTime = '12:00';
    var changedTime = Time.substr(0, 5);
    // const result1 = Days.filter(item => item === 1);
    // const result2 = Days.filter(item => item === 2);
    // const result3 = Days.filter(item => item === 3);
    // const result4 = Days.filter(item => item === 4);
    // const result5 = Days.filter(item => item === 5);
    // const result6 = Days.filter(item => item === 6);
    // const result7 = Days.filter(item => item === 7);
    // setSunday(result1)
    // setMonday(result2)
    // setTuesday(result3)
    // setWednesday(result4)
    // setThursday(result5)
    // setFriday(result6)
    // setSaturday(result7)
    React.useEffect(() => {
        // setSunday(Days[0])
        // setMonday(Days[1])
        // setTuesday(Days[2])
        // setWednesday(Days[3])
        // setThursday(Days[4])
        // setFriday(Days[5])
        // setSaturday(Days[6])
        const result1 = Days.filter(item => item === 1);
        const result2 = Days.filter(item => item === 2);
        const result3 = Days.filter(item => item === 3);
        const result4 = Days.filter(item => item === 4);
        const result5 = Days.filter(item => item === 5);
        const result6 = Days.filter(item => item === 6);
        const result7 = Days.filter(item => item === 7);
        setSunday(result1)
        setMonday(result2)
        setTuesday(result3)
        setWednesday(result4)
        setThursday(result5)
        setFriday(result6)
        setSaturday(result7)
    }, [])





    return (
        <View style={{ height: Dimensions.get('window').height * 0.125, width: Dimensions.get('window').width * 1, backgroundColor: "#E2E2E2", borderRadius: 20, padding: 20, justifyContent: "center", marginBottom: 10 }}>
            <View style={{ height: "100%", width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                    {Time < checkTime ? <Text style={{ fontWeight: "bold", fontSize: 17 }}>오전 <Text style={{ fontSize: 30, fontWeight: "normal" }}> {changedTime}</Text></Text>
                        :
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>오후 <Text style={{ fontSize: 30, fontWeight: "normal" }}> {changedTime}</Text></Text>
                    }
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* <Text style={{ color: "#22B727" }}>일 </Text><Text>월 </Text><Text>화 </Text><Text>수 </Text><Text style={{ color: "#22B727" }}>목 </Text><Text>금 </Text><Text>토</Text> */}
                        {sunday == 1 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>일 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>일 </Text></View>}
                        {monday == 2 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>월 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>월 </Text></View>}
                        {tuesday == 3 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>화 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>화 </Text></View>}
                        {wednesday == 4 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>수 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>수 </Text></View>}
                        {thursday == 5 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>목 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>목 </Text></View>}
                        {friday == 6 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>금 </Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>금 </Text></View>}
                        {saturday == 7 ? <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "#22B727" }}>토</Text></View> : <View><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>토</Text></View>}
                    </View>
                    {/* <SwipeButton width={50} height={20} railBackgroundColor="#F1E7DD" railFillBackgroundColor="#743727" title='' railFillBorderColor='#743727' railBorderColor='#F1E7DD' thumbIconBackgroundColor='#3B1E1E' thumbIconBorderColor='#3B1E1E' /> */}
                </View>
            </View>
        </View>
    )
}