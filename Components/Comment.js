import axios from "axios";
import React, { Component, forwardRef, useCallback, useState } from "react";
import { Text, View, StyleSheet , Button ,TextInput,Dimensions,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Comment({ nickname , content , rNo , bNo , reply}) {
    
    

    const [rContent,setRContent] = React.useState("");
    const [okModify,setOkModify] = React.useState(false); // 댓글 수정 
    const [modifyContent,setModifyContent] = React.useState("");
    const [sid,setSid] = React.useState("");

    const getSid = async () => {
        setSid(await load());
    }

    React.useEffect(() => {
        setRContent(content);
        getSid();
    })

    const load = async () => {
        try{
            const id = await AsyncStorage.getItem('id');
            return id;
        }
        catch(e)
        {
            console.log("로드 에러" , e);
        }
    }

    function modifyReplyAction()
    {
        console.log("rNo" , rNo , "rContent" , modifyContent);
        axios.post("http://192.168.2.94:5000/reply/modifyAction",null,{
            params:{
                rNo: rNo,
                rContent : modifyContent
            }
        })
        .then((res) => {
            console.log("모디파이 액션 결과: ",res.data);
            setModifyContent(modifyContent);
            setOkModify(false);
            reply();
        })
    }

    function deleteReply()
    {
        console.log(typeof(rNo));
        axios.post("http://192.168.2.94:5000/reply/remove",null,{
            params:
            {
                rNo: rNo,
                bNo: bNo
            }
        })
        .then((res) => {
            console.log(res.data);
            reply();
        })
    }

    return (
        
        <View>
            <View style={styles.comment}>
                {
                    //닉네임 일치 및 모디파이 버튼을 누르지 않으면 
                    sid == nickname && !okModify 
                    ?
                    <View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={styles.nickname}>{nickname}</Text>
                    <View style={{flexDirection:"row"}}>     
                    <TouchableOpacity style={{height: "50%", borderRightWidth: 0.5,borderColor:"gray"}} onPress={() => {setOkModify(true); setModifyContent(rContent)}}><Text style={{color:"gray",fontSize:12}}>글 수정  </Text></TouchableOpacity> 
                    <TouchableOpacity onPress={() => deleteReply()}><Text style={{color:"gray",fontSize:12}}>  글 삭제</Text></TouchableOpacity>
                    </View>
                    </View>
                    <View>
                        <Text>{rContent}</Text>
                    </View>
                    </View>
                    :
                    (
                    //닉네임 일치 및 모디파이 버튼을 누름
                    sid == nickname && okModify
                    ?
                    <View style={{width:"100%",flexDirection:"row"}}>
                        <TextInput
                            value = {modifyContent}
                            onChangeText = {setModifyContent}
                            placeholder="글 수정"
                            style={{width:"70%"}}
                            cursorColor="red"
                        />
                        <View  style={{width:"30%",flexDirection:"row",justifyContent:"center"}}>
                        <TouchableOpacity style={{borderRightWidth:0.5,borderColor:"gray",justifyContent:"center"}} onPress={() => modifyReplyAction()}><Text style={{fontSize:12,color:"gray"}}>글 수정하기  </Text></TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:"center"}} onPress={() => {setOkModify(false); setModifyContent("")}}><Text style={{fontSize:12,color:"gray"}}>  취소</Text></TouchableOpacity>
                        </View>
                    </View>
                    :
                    // 닉네임 불일치
                    <View>
                    <Text style={styles.nickname}>{nickname}</Text>    
                    <Text>{rContent}</Text>
                    </View>
                    )
                }
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        width : "100%",
       
    },
    comment : {
        padding: 10, 
        // height: Dimensions.get('window').height * 0.075,
        borderColor:"black",
        borderTopWidth:0,
        borderBottomWidth: 0.3
    },
    nickname : {
        fontWeight:"bold",
        fontSize:15,
        marginBottom:10
    },
    button : {
        marginBottom : 10
    },
});