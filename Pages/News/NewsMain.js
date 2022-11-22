import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import NewsCard from '../../Components/NewsCard';


export default function NewsMain({ navigation }) {

  const pressHandler = () => {
    // 페이지 이동. navigate = push
    // 변수는 routes 파일 screens 내 키값을 사용한다
    navigation.navigate('NewsDetail');
    // navigation.push('ReviewDetail');
  }

  return (
    <View style={{ width: "100%", height: "100%",borderWidth:1}}>
      
      <NewsCard/>
      <View>
      <Button title="뉴스 디테일로 이동"
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