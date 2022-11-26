import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet,useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';
import Comment from '../../../Components/Comment';
import HTML from 'react-native-render-html';


export default function FreeBoardDetail({ navigation , route}) {

    const [bno,setBno] = React.useState(route.params.no);
    const [detailInfo,setDetailInfo] = React.useState({});
    const CONTENT = "<div>안쪽에 넣을게~</div><div><img src=\"https://giyeon-bucket.s3.ap-northeast-2.amazonaws.com/1641A178-4255-4074-9C16-080CAA7AF4C6.jpg\"><br></div>";
    const contentWidth = useWindowDimensions().width;

    React.useEffect(() => {
        console.log(bno);

        axios.post("http://192.168.2.94:5000/board/detailView",null,{
            params:{bNo : bno}
        })
        .then(function(res){
            console.log(JSON.stringify(res.data, null, "\t"));
            setDetailInfo(res.data);
        })
    },[])

    const pressHandler = () => {
        // 뒤로 돌아가기. goBack = pop
        navigation.goBack();
        // navigation.pop();
    }

    return (
        <View style={styles.container}>
            <View style={{width:"100%",height:"15%",borderTopWidth:1,borderBottomWidth:1,padding:10}}>
                <View style={{width:"100%",height:"40%",flexDirection:"row",justifyContent: 'space-between',marginBottom:5}}>
                    <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>{detailInfo.btitle}</Text>
                    <Text style={{color:"red",fontSize:15,textAlignVertical:"bottom"}}> {detailInfo.blike}<Text> 좋아요</Text></Text>
                </View>
                <View style={{width:"100%",height:"60%",flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>{detailInfo.id}</Text>
                    <View style={{width:"15%", height:"50%", borderLeftWidth:0.5,borderColor:"grey",marginLeft:5,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{textAlignVertical:"bottom",fontSize:12, color:"grey",marginLeft:3}}>조회수<Text>{detailInfo.bviewCount}</Text></Text>
                    </View>
                </View>
            </View>
        <View>
            <HTML source={{html:CONTENT}} contentWidth={contentWidth}/>
        </View>
        <View style={{width:"100%",height:"8%",borderTopWidth:0.7,borderBottomWidth:0.5,justifyContent:"center",padding:10}}>
            <Text style={{textAlignVertical:"center"}}><Text style={{color:"red"}}>{detailInfo.breply}</Text> 댓글</Text>
        </View>
        <Comment/>
        <Comment/>
        <Comment/>
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