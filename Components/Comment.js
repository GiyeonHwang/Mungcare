import axios from "axios";
import React, { Component, useCallback } from "react";
import { Text, View, StyleSheet , Button ,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Comment({ nickname , content , rNo , bNo}) {
    
    const [rContent,setRContent] = React.useState("");
    const [okModify,setOkModify] = React.useState(false); // 댓글 수정 
    const [modifyContent,setModifyContent] = React.useState("");
    const [sid,setSid] = React.useState("");

    React.useEffect(() => {
        const getSid = async () => {
            setSid(await load());
            setRContent(content);
        }
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
            forceUpdate;
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
        })
    }

    return (
        
        <View>
            <View style={styles.comment}>
                <Text style={styles.nickname}>{nickname}</Text>
                {
                    sid == nickname && !okModify
                    ?
                    <View>
                        <Text>{rContent}</Text>
                        <Button onPress={() => {setOkModify(true); setModifyContent(rContent)}} title="수정" />
                        <Button onPress={() => deleteReply()} title="삭제" />
                    </View>
                    :
                    (
                    sid == nickname && okModify
                    ?
                    <View>
                        <TextInput
                            value = {modifyContent}
                            onChangeText = {setModifyContent}
                        />
                        <Button onPress={() => modifyReplyAction()} title="수정하기" />
                        <Button onPress={() => {setOkModify(false); setModifyContent("")}} title="취소" />
                    </View>
                    :
                    <Text>{content}</Text>
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
        borderTopWidth:0,
        borderBottomWidth:0.5
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