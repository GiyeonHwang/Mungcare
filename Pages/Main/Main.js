import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert,ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import FreeView from '../../Components/FreeView';

export default function Main(){
    return(
    <View style={{width:"100%",height:"100%",borderWidth:1}}>
      <View style={{width:"100%",height:"15%",flexDirection:"row",justifyContent:"center",marginBottom:5}}>
        <View style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>게시판들!</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Board</Text>
        </View>   
        <View style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",marginTop:7,marginBottom:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>캘린더</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Calender</Text>
        </View>
        <View style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>함께하는공간</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Map</Text>
        </View> 
      </View>
      <View style={{width:"100%",height:"15%",flexDirection:"row",justifyContent:"center",marginBottom:5}}>
        <View style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>캘린더</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Calender</Text>
        </View> 
        <View style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",marginTop:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>애완뉴스</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>News</Text>
        </View> 
        <View style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>최고의 견주</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Ranking</Text>
        </View> 
      </View>
      <View style={{width:"100%",height:"15%",flexDirection:"row",justifyContent:"flex-start",marginBottom:5,marginLeft:5}}>
        <View style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>피부검사</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Skin</Text>
        </View> 
        <View style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",marginTop:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>내정보</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>MyPage</Text>
        </View> 
      </View>
      <View style={{width:"100%",height:"100%",marginTop:10,flexDirection:"row"}}>
      <FreeView/>
      <FreeView/>
      </View>
    </View>
    )
}


