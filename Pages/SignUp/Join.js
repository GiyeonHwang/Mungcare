import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert } from 'react-native';
import Constants from 'expo-constants';
// import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function Join(navigation){
    const [id, onChangeId] = React.useState("");
    const [pw, onChangePw] = React.useState("");
    const [name,onChangeName] = React.useState("");
    const [nickname,onChangeNickname] = React.useState("");
    const [phone,onChangePhone] = React.useState("");
    const [address,onChangeAddress] = React.useState("");
  
    function login(){
  
      axios.post("http://192.168.2.77:5000/member/register",null,{
        params:{
          id:id,
          pw:pw,
          name:name,
          nickname:nickname,
          phone:phone,
          address:address
        }
      })
      .then((res) => {
        Alert.alert("회원가입 성공");
      })
    }
  
    return (
       <SafeAreaView style={styles.box}>
        <Text style = {styles.text}>아이디</Text>
       <TextInput
         style={styles.input}
         onChangeText={onChangeId}
         value={id}
         placeholder="아이디 입력"
       />
       <Text style = {styles.text}>비밀번호</Text>
       <TextInput
         style = {styles.input}
         onChangeText={onChangePw}
         value = {pw}
         placeholder="비밀번호"
       />
       <Text style = {styles.text}>이름</Text>
        <TextInput
         style = {styles.input}
         onChangeText={onChangeName}
         value = {name}
         placeholder="이름 입력"
       />
       <Text style = {styles.text}>닉네임</Text>
        <TextInput
         style = {styles.input}
         onChangeText={onChangeNickname}
         value = {nickname}
         placeholder="별명 입력"
       />
       <Text style = {styles.text}>전화번호</Text>
        <TextInput
         style = {styles.input}
         onChangeText={onChangePhone}
         value = {phone}
         placeholder="전화번호 입력"
       />
       <Text style = {styles.text}>주소지</Text>
        <TextInput
         style = {styles.input}
         onChangeText={onChangeAddress}
         value = {address}
         placeholder="주소지 입력"
       />
       <View style={styles.button}>
          <Button 
          color="#CCCCFF"
          margin="12"
          title = "회원가입"
          onPress = {() => login()}
          />
       </View> 

      
     </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    box:{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 61,
        

    },
  input: {
    height: 40,

    borderWidth: 1,
    padding: 10,
  },
  text: {
    marginTop:12,
    marginLeft : 12
  },
  button:{
    marginTop:12,
  }
  
});
