import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert,Image } from 'react-native';
import Constants from 'expo-constants';

// import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


const FreeView = () => {


    return(
        <View style={{alignItems:"center",width:"45%",height:"70%",backgroundColor:"tomato",margin:10}}>
            <View style={{alignItems:"center", justifyContent: "center",width:"100%",borderWidth:2,borderBottomWidth:0,height:"70%",borderColor:"black"}}>
            <Image
            source={{uri: 'https://picsum.photos/id/237/200/300'}}
            style={{width:"100%",height:"100%"}}
            />
            </View>
            <View  style={{alignItems:"center",width:"100%",height:"40%",borderWidth:2,borderTopWidth:0,borderColor:"black",backgroundColor: "#F1E7DD",padding: 10}}>
                <View  style={{flexDirection: "row",justifyContent: 'space-between',alignItems:"center",width:"100%",height:"30%",backgroundColor:"#F1E7DD"}}>
                    <Text style={{fontWeight:"bold",fontSize:10}}>제목제목제목</Text>
                    <Text style={{fontWeight:"bold",fontSize:10}}>댓글수</Text>
                </View>
                <View  style={{width:"100%",height:"50%",backgroundColor:"#F1E7DD"}}>
                    <Text style={{fontWeight:"bold"}}>여기는 내용부분</Text>
                </View>
                <View  style={{flexDirection: "row",justifyContent: 'space-between',alignItems:"center", width:"100%",height:"20%",backgroundColor:"#F1E7DD"}}>
                    <Text style={{fontWeight:"bold",fontSize:10}}>닉네임</Text><Text style={{fontWeight:"bold",fontSize:10}}>조회수<Text> 55</Text></Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato",
        alignItems: "center",
        justifyContent: "center",
    },
});


export default FreeView;
