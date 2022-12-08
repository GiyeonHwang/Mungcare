import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from "react";
import { Text, View, Image, ScrollView, SafeAreaView, Button, TouchableOpacity, TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeButton from 'rn-swipe-button';

export default function ListAlrams({navigation}) {

    return(
        <View style={{height: Dimensions.get('window').height * 0.125, width:Dimensions.get('window').width * 1,backgroundColor:"#E2E2E2", borderRadius:20,padding:20,justifyContent:"center"}}>
           <View style={{height:"100%",width:"100%",alignItems:"center",flexDirection:"row",justifyContent:"space-between",padding:10}}>
                <View style={{alignItems:"flex-end",flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold",fontSize:17}}>오전 <Text style={{fontSize:30,fontWeight:"normal"}}>10:30</Text></Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{color:"#22B727"}}>일 </Text><Text>월 </Text><Text>화 </Text><Text>수 </Text><Text style={{color:"#22B727"}}>목 </Text><Text>금 </Text><Text>토</Text>
                </View>
                <SwipeButton width={50} height={20} railBackgroundColor="#F1E7DD"  railFillBackgroundColor="#743727" title='' railFillBorderColor='#743727' railBorderColor='#F1E7DD' thumbIconBackgroundColor='#3B1E1E' thumbIconBorderColor='#3B1E1E'/>
                </View>
           </View>
        </View>
    )
}