import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import Comment from '../../../Components/Comment';

export default function FreeBoardDetail({ navigation }) {

    const pressHandler = () => {
        // 뒤로 돌아가기. goBack = pop
        navigation.goBack();
        // navigation.pop();
    }

    // 상세 정보 가져오기
    const[deData, setDeData] = React.useState();

    // const save = async () => {
    //     try {
    //         await AsyncStorage.setItem('key', 'value');
    //         await AsyncStorage.setItem('info', JSON.stringify(info)); // 객체 형태 저장
    //     } catch (e) {
    //         // 오류 예외 처리
    //     }
    // }

    React.useEffect(()=>{
        axios.post("http://192.168.2.94:5000/board/detailView", null,{
            params:{
                bNo:"13"//게시글 번호 13번 정보 요청합니다.
            }
        })
        .then(function(res){
            console.log("나는 res: ", res);
            console.log("호는 res.data: ",res.data);
            setDeData(res.data);
        })
        .catch(function (error){
            console.log("게시글 상세 가져오기 실패: ",error);
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={{width:"100%",height:"15%",borderTopWidth:1,borderBottomWidth:1,padding:10}}>
                <View style={{width:"100%",height:"40%",flexDirection:"row",justifyContent: 'space-between',marginBottom:5}}>
                    <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>제목자리제목자리제목자리</Text>
                    <Text style={{color:"red",fontSize:15,textAlignVertical:"bottom"}}> 30<Text> Like</Text></Text>
                </View>
                <View style={{width:"100%",height:"60%",flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>닉네임임</Text>
                    <View style={{width:"15%", height:"50%", borderLeftWidth:0.5,borderColor:"grey",marginLeft:5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{textAlignVertical:"bottom",fontSize:12, color:"grey",marginLeft:3}}>조회수 <Text>55</Text></Text>
                    </View>
                </View>
            </View>
        <View style={{padding:10}}>
            <Text>
                내용자리내용자리내용자리내용자리내용자리내용자리내용자리내용자리내용자리내용자리내용자리내용자리
            </Text>
        </View>
        <View style={{width:"100%",height:"8%",borderTopWidth:0.7,borderBottomWidth:0.5,justifyContent:"center",padding:10}}>
            <Text style={{textAlignVertical:"center"}}><Text style={{color:"red"}}>5</Text> 댓글</Text>
        </View>
        <Comment/>
        <Comment/>
        <Comment/>
            {/* <Button title="back to 자유게시판메인" onPress={pressHandler} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width : "100%",
        height: "100%",
        backgroundColor:"#CCCCFF",
    }
});