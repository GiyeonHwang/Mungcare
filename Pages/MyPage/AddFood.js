import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Text ,View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
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
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';


import * as DocumentPicker from 'expo-document-picker';
const Stack = createStackNavigator();




export default function AddFood(navigation) {


    const [time, setTime] = React.useState(asPickerFormat(new Date()));
    const [mp3,setMp3] = React.useState("");


    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);
        console.log(result);
        setMp3(result.name)
      };

    // {time.toTimeString()} -> 선택시간 문자열로 변환
    return (
        <View style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').width * 1}}>
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
                        borderWidth = {0}
                    />
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.5, width: Dimensions.get('window').width * 1, backgroundColor: "#E2E2E2",marginTop:20 ,borderRadius: 20, padding: 20}}>
                <View style={{height:"10%",width:"100%",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold",color:"red"}}>일</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold"}}>월</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold"}}>화</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold"}}>수</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold"}}>목</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold"}}>금</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={{fontSize:15,fontWeight:"bold",color:"blue"}}>토</Text></TouchableOpacity>
                </View>
                <View style={{height:"20%",width:"100%",borderBottomWidth:1,justifyContent:"flex-end"}}>
                    <TextInput style={{fontSize:20}} placeholder='알람 이름' maxLength={10}></TextInput>
                    <Button title='눌러' onPress={pickDocument}></Button>
                    <Text>고른 파일은 : {mp3}</Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width:"100%",
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,

    },
});
