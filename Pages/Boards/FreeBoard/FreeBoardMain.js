import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import FreeView from '../../../Components/FreeView';



export default function FreeBoardMain({ navigation }) {

  const pressHandler = () => {
    // 페이지 이동. navigate = push
    // 변수는 routes 파일 screens 내 키값을 사용한다
    navigation.navigate('FreeBoardDetail');
    // navigation.push('ReviewDetail');
  }

  return (
    <View style={{ width: "100%", height: "100%",borderWidth:1}}>
      
      <FreeView/>
      <View>
      <Button title="자유게시판 디테일로 이동"
          onPress={pressHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderWidth:1

  },

});


