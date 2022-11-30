// import React, { useEffect, useState } from "react";
// import { Text, View ,  StyleSheet,Image, TouchableOpacity,ScrollView,SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function FreeView ({bno,btitle,bcontent,id})  {

//     // const [cardInfo,setCardInfo] = useState(props.items);

//     console.log("보드 메인에서 보낸 bno:",bno);
//     const navigation = useNavigation();

//     const onDetail = () => {
//       navigation.navigate("FreeBoardDetail",{no:33});
//     }
  
//     return(
//       <View>
//         <ScrollView nestedScrollEnabled>
//       <SafeAreaView>
      
//               <TouchableOpacity onPress={() => onDetail()}>
//               <View style={styles.container}>   
//                 <View style={styles.imageView}>
//                 <Image
//                 source={{uri: 'https://picsum.photos/id/237/200/300'}}
//                 style={styles.image}
//                 />
//                 </View>
//                 <View  style={styles.contentBox}>
//                     <View  style={styles.title}>
//                         <Text style={styles.titleText}>{btitle}</Text>
//                         <Text style={styles.titleText}> 댓글수</Text>
//                     </View>
//                     <View  style={styles.content}>
//                         <Text style={{fontWeight:"bold"}}>내용부분</Text>
//                     </View>
//                     <View  style={styles.bottomContent}>
//                         <Text style={styles.titleText}>{id}</Text><Text style={styles.titleText}><Text></Text></Text>
//                     </View>
//                 </View>
//             </View>
//             </TouchableOpacity>
           
      
//       </SafeAreaView>
//       </ScrollView>
//     </View>
//     )
        
// };

// const styles = StyleSheet.create({
//     container: {
//       alignItems:"center",
//       width:"100%",
//       height:"100%",
//       marginBottom:20,
//       padding:5
//     },
//     imageView : {
//       alignItems:"center",
//       justifyContent: "center",
//       width:"100%",
//       borderWidth:3,
//       borderBottomWidth:0,
//       height:"70%",
//       borderColor:"black"
//     },
//     image : {
//       width:"100%",
//       height:"100%"
//     },
//     contentBox : {
//       alignItems:"center",
//       width:"100%",
//       height:"40%",
//       borderWidth:2,
//       borderTopWidth:0,
//       borderColor:"black",
//       backgroundColor: "#F1E7DD",
//       padding: 10
//     },
//     title : {
//       flexDirection: "row",
//       justifyContent: 'space-between',
//       alignItems:"center",
//       width:"100%",
//       height:"30%",
//       backgroundColor:"#F1E7DD"
//     },
//     titleText : {
//       fontWeight:"bold",
//       fontSize:10
//     },
//     content : {
//       width:"100%",
//       height:"50%",
//       backgroundColor:"#F1E7DD"
//     },
//     bottomContent : {
//       flexDirection: "row",
//       justifyContent: 'space-between',
//       alignItems:"center",
//       width:"100%",
//       height:"20%",
//       backgroundColor:"#F1E7DD"
//     },

// });

import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


const FreeView = (items) => {


  const navigation = useNavigation();

  const clickCard = () => {
    navigation.navigate("FreeBoardDetail",{no:39});
  }

    return(
      <TouchableOpacity onPress={clickCard}>
        <View style={{alignItems:"center",width:"50%",height:"60%",margin:0, marginBottom:40,padding:5}}>
            <View style={{alignItems:"center", justifyContent: "center",width:"100%",borderWidth:3,borderBottomWidth:0,height:"70%",borderColor:"black"}}>
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
      </TouchableOpacity>
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