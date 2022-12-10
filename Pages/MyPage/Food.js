import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import ListAlrams from '../../Components/ListAlrams';

const Stack = createStackNavigator();

//동물 info가져오기
export default function Food({navigation}) {




    return (
        <View style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').width * 1 }}>
            <View style={{ height: "25%", width: "100%", justifyContent: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>22시간 20분 후에{"\n"}알람이 울려요!</Text>
                <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>12월 08일 (금) 오전 8:20</Text>
            </View>
            <View style={{ height: "5%", width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => navigation.push("AddFood")}>
                    <Icon name="add-outline" size={26} />
                </TouchableOpacity>
            </View>

            <ListAlrams></ListAlrams>
        </View>


    )
}