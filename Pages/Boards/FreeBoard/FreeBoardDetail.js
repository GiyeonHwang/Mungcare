import axios from 'axios';
import React, { useCallback, useEffect} from "react";
import { Text, View,ScrollView, SafeAreaView, StyleSheet,useWindowDimensions, TextInput ,Button} from 'react-native';
import Comment from '../../../Components/Comment';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FreeBoardDetail({ navigation , route }) {


    const [sid,setSid] = React.useState("");
    const contentWidth = useWindowDimensions().width;

    const [replyList,setReplyList] = React.useState([]);
    const [rContent,setRContent] = React.useState("");

    const [likeCheck,setLikeCheck] = React.useState(false); // 좋아요 여부 체크

    const [bno,setBno] = React.useState(route.params.no);
    const [id,setId] = React.useState("");
    const [content,setContent] = React.useState("");
    const [blike,setBlike] = React.useState("");
    const [btitle,setBtitle] = React.useState("");
    const [btype,setBtype] = React.useState("");
    const [bviewCount,setBviewCount] = React.useState("");
    const [breply,setBreply] = React.useState("");

    const getSid = async () => {

        setSid(await load());

        await axios.post("http://192.168.2.94:5000/board/detailView",null,{
            params:{bNo : bno}
        })
        .then((res) => {
            console.log(JSON.stringify(res.data, null, "\t"));
            setId(res.data.id);
            setContent(res.data.bcontent);
            setBlike(res.data.blike);
            setBtitle(res.data.btitle);
            setBtype(res.data.btype);
            setBviewCount(res.data.bviewCount)
            setBreply(res.data.breply);
        })
        .catch(e => {
            console.log("디테일 로드 실패");
        })
        
    }

    const replyClear = () => {
        axios.post("http://192.168.2.94:5000/reply/list",null,{
                    params:{bNo : bno}
                })
                .then((res) => {
                    setReplyList(res.data);
                })
                .catch(e => {
                    console.log("댓글 로드 실패");
                })
    }

    React.useEffect(() => { 
        getSid();
    },[])

    React.useEffect(() => {
        replyClear();
    },[])

    React.useEffect(() => {

        axios.post("http://192.168.2.94:5000/like/check",null,{
            params:{
                id : sid,
                bNo : bno
            }
        })
        .then((res)=> {
            console.log("좋아요 체크 : ",res.data);
            setLikeCheck(res.data);
        })
        .catch((e)=>{
            console.log("좋아요 체크 오류");
        })
    },[])

    const sendReply = () =>
    {
        console.log("현재 세션 id : " , sid);
        axios.post("http://192.168.2.94:5000/reply/write",null,{
            params:{
                id:sid,
                rContent:rContent,
                bNo:route.params.no
            }
        })
        .then(function(res){
            setRContent("");
            console.log(res.data);
            getSid();
        })
    }

    const clickLike = () => {
        axios.post("http://192.168.2.94:5000/like/likeAction",null,{
            params:{
                id : sid,
                bNo : bno
            }
        })
        .then((res) => {
            console.log("결과: ",res.data);
            setLikeCheck(res.data);
            if(likeCheck===false)
            {
                setBlike(blike+1);
            }
            else
            {
                setBlike(blike-1);
            }
        })
        .catch((e)=>{
            console.log("좋아요액션 실패");
        })
    }

    const load = async () => {
        try{
            const id = await AsyncStorage.getItem('id');
            console.log("아이디: " ,id);
            return id;
        }
        catch(e)
        {
            console.log("로드 에러" , e);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={{width:"100%",height:"15%",borderTopWidth:1,borderBottomWidth:1,padding:10}}>
                    <View style={{width:"100%",height:"40%",flexDirection:"row",justifyContent: 'space-between',marginBottom:5}}>
                        <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>{btitle}</Text>
                        <Text style={{color:"red",fontSize:15,textAlignVertical:"bottom"}}> {blike}<Text> 좋아요</Text></Text>
                    </View>
                    <View style={{width:"100%",height:"60%",flexDirection:"row",alignItems:"center"}}>
                        <Text style={{fontWeight:"bold",fontSize:18,textAlignVertical:"center"}}>{id}</Text>
                        <View style={{width:"15%", height:"50%", borderLeftWidth:0.5,borderColor:"grey",marginLeft:5,alignItems:"center",justifyContent:"center"}}>
                        <Text style={{textAlignVertical:"bottom",fontSize:12, color:"grey",marginLeft:3}}>조회수<Text>{bviewCount}</Text></Text>
                        </View>
                    </View>
                </View>
            <View>
                <HTML source={{html:content}} contentWidth={contentWidth}/>
            </View>
            <View style={{width:"100%",height:"8%",borderTopWidth:0.7,borderBottomWidth:0.5,justifyContent:"center",padding:10}}>
                <Text style={{textAlignVertical:"center"}}><Text style={{color:"red"}}>{breply}</Text> 댓글</Text> 
                {
                    likeCheck 
                    ? 
                    <Button
                        title = "좋아요 취소"
                        onPress={clickLike}
                    />
                    : 
                    <Button
                        title = "좋아요"
                        onPress={clickLike}
                    />
                }
            </View>
            <View>  
                <TextInput
                    onChangeText={setRContent}
                    value={rContent}
                />
                <Button
                    title = "입력"
                    onPress={sendReply}
                />
            </View>
            {
                replyList.map((e,index) =>{

                    return (
                        <Comment
                        key = {index}
                        nickname = {e.id}
                        content = {e.rcontent}
                        rNo = {e.rno}
                        bNo = {e.bno}
                        reply = {replyClear}
                    />
                    )
                })
            }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width : "100%",
        height: "100%",
        backgroundColor:"#CCCCFF",
    },
    detailBox: {
        
    },

});