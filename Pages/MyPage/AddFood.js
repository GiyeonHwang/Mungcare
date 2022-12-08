import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';
import concat from "react";
//npm install expo-checkbox
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-date-picker'
//expo install @react-native-async-storage/async-storage

import { asPickerFormat } from '../../Components/utils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../Components/values';
import TimePicker from '../../Components/TimePicker';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from 'react-native-gesture-handler';
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
const Stack = createStackNavigator();


export default function AddFood(navigation) {

    const [time, setTime] = React.useState(asPickerFormat(new Date()));


    return (
        <View style={{ height: Dimensions.get('window').height * 1, width: Dimensions.get('window').width * 1 }}>
            <View style={{ height: "40%", width: "100%", justifyContent: "center" }}>
                <View style={styles.view}>
                    <TimePicker
                        value={time}
                        onChange={setTime}
                        // VIEW_WIDTH
                        width={"100%"}
                        // BUTTON_HEIGHT
                        buttonHeight={BUTTON_HEIGHT}
                        visibleCount={3}
                    />
                </View>
            </View>
            <View style={{ height: Dimensions.get('window').height * 0.4, width: Dimensions.get('window').width * 1, backgroundColor: "#E2E2E2", borderRadius: 20, padding: 20, justifyContent: "center" }}>
                <Text>여긴가?</Text>
                <Text>{time.toTimeString()}</Text>
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
        backgroundColor: '#ecf0f1',
        padding: 8,
        borderWidth:0
    },
});
