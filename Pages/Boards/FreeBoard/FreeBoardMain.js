import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import FreeView from '../../../Components/FreeView';



export default function FreeBoardMain({ navigation }) {

  //서버랑 연결
  const [frData, setFrData] = React.useState();

  React.useEffect(()=>{
    axios.post("http://192.168.2.94:5000/board/list", null,{
      params:{
        page:1,
        size:10
      }
    })
    .then(function(res){
      console.log("전체 나는 res: ",res);
      console.log("전체 호는 res.data: ", res.data);
      setFrData(res.data);
    })
    .catch(function(error){
      console.log("게시판 전체 데이터 가져오기 실패: ",error)
    })
  },[]);

  const pressHandler = () => {
    // 페이지 이동. navigate = push
    // 변수는 routes 파일 screens 내 키값을 사용한다
    navigation.navigate('FreeBoardDetail');
    // navigation.push('ReviewDetail');
  }

  return (
    <View style={{ width: "100%", height: "100%"}}>
      
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

