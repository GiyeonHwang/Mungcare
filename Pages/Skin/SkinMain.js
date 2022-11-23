import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
// import React from "react";
// import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert } from 'react-native';
import Constants from 'expo-constants';

// // import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';


 //사진 업로드
 import * as ImagePicker from 'expo-image-picker';
export default function SkinMain({navigation}){


   //사진등록 관련임
   
   const [image, setImage] = useState(null);

   const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    return(
    <View style={styles.Box}>
      <View style={styles.TitleBox}>
        <Text style={styles.TitleBoxIn}> 강아지 피부 진단하기 </Text>
      </View>
      <View style={styles.InputImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
      </View>

      <View style={styles.Bottom}>
        <Text>하단바 들어갈 자리</Text>
      </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
  Box:{
    flex: 1,
  },
  TitleBox:{
    flex:1,
    backgroundColor:"tomato",
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌
  },
  TitleBoxIn:{
    fontSize: 20
  },
  InputImage:{
    flex:8,
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌

  },
  Bottom:{
    flex: 1,
    backgroundColor: "white"
  }


})




