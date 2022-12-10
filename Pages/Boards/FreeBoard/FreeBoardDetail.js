import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from "react";
import { Text, View, Image, ScrollView, SafeAreaView, Button, TouchableOpacity, TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Comment from '../../../Components/Comment';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerPort from '../../../Components/ServerPort';
// import Heart from './assets/images/heart.png';
// import Beanheart from './assets/images/beanheart.png';


export default function FreeBoardDetail({ navigation, route }) {


    const [sid, setSid] = React.useState("");
    const contentWidth = useWindowDimensions().width;

    const [replyList, setReplyList] = React.useState([]);
    const [rContent, setRContent] = React.useState("");

    const [likeCheck, setLikeCheck] = React.useState(false); // 좋아요 여부 체크

    const [bno, setBno] = React.useState(route.params.no);
    const [id, setId] = React.useState("");
    const [content, setContent] = React.useState("");
    const [blike, setBlike] = React.useState("");
    const [btitle, setBtitle] = React.useState("");
    const [btype, setBtype] = React.useState("");
    const [bviewCount, setBviewCount] = React.useState("");
    const [breply, setBreply] = React.useState("");

    const [WriterId, setWriterId] = React.useState("");

    const IP = ServerPort();

    const getSid = async () => {

        setSid(await load());

        await axios.post(`${IP}/board/detailView`, null, {
            params: { bNo: bno }
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
        axios.post(`${IP}/reply/list`, null, {
            params: { bNo: bno }
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
    }, [])

    React.useEffect(() => {
        replyClear();
    }, [])

    React.useEffect(() => {

        axios.post(`${IP}/like/check`, null, {
            params: {
                id: sid,
                bNo: bno
            }
        })
            .then((res) => {
                console.log("좋아요 체크 : ", res.data);
                setLikeCheck(res.data);
            })
            .catch((e) => {
                console.log("좋아요 체크 오류");
            })
    }, [])

    const sendReply = () => {
        console.log("현재 세션 id : ", sid);
        axios.post(`${IP}/reply/write`, null, {
            params: {
                id: sid,
                rContent: rContent,
                bNo: route.params.no
            }
        })
            .then(function (res) {
                setRContent("");
                console.log(res.data);
                getSid();
                replyClear();
            })
    }

    const clickLike = () => {
        axios.post(`${IP}/like/likeAction`, null, {
            params: {
                id: sid,
                bNo: bno
            }
        })
            .then((res) => {
                console.log("결과: ", res.data);
                setLikeCheck(res.data);
                if (likeCheck === false) {
                    setBlike(blike + 1);
                }
                else {
                    setBlike(blike - 1);
                }
            })
            .catch((e) => {
                console.log("좋아요액션 실패");
            })
    }

    const load = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            setWriterId(id);
            console.log("아이디: ", id);
            return id;
        }
        catch (e) {
            console.log("로드 에러", e);
        }
    }

    // 상세 정보 가져오기
    const [deData, setDeData] = React.useState();

    // const save = async () => {
    //     try {
    //         await AsyncStorage.setItem('key', 'value');
    //         await AsyncStorage.setItem('info', JSON.stringify(info)); // 객체 형태 저장
    //     } catch (e) {
    //         // 오류 예외 처리
    //     }
    // }

    // React.useEffect(() => {
    //     axios.post("http://192.168.2.94:5000/board/detailView", null, {
    //         params: {
    //             bNo: "13"//게시글 번호 13번 정보 요청합니다.
    //         }
    //     })
    //         .then(function (res) {
    //             console.log("나는 res: ", res);
    //             console.log("호는 res.data: ", res.data);
    //             setDeData(res.data);
    //         })
    //         .catch(function (error) {
    //             console.log("게시글 상세 가져오기 실패: ", error);
    //         })
    // }, []);

    //삭제하기
    const DeleteAction = () => {
        axios.post(`${IP}/board/remove`, null, {
            params: { bNo: bno }
        })
            .then(function (res) {
                // console.log("나는 Deleteres: ", res);
                // console.log("Deleteresres.data: ", res.data);
                if (res) {
                    Alert.alert("삭제완료");
                    navigation.navigate("Main");
                }
            })
            .catch(function (error) {
                console.log("삭제 실패: ", error);
            })
    }

    //수정하기
    const ModifyAction = () => {
        navigation.push("ModifyBoard", { bno: bno, btitle: btitle, bcontent: content, });
    }




    return (
       
        <View>
        <ScrollView>

            <View style={{ width: "100%", borderTopWidth: 1, borderBottomWidth: 1, padding: 10 }}>
                <View style={{ width: "100%", height: Dimensions.get('window').height * 0.03, flexDirection: "row", justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ maxWidth: "50%", fontWeight: "bold", fontSize: 18, textAlignVertical: "center" }}>{btitle}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "red", fontSize: 16, textAlignVertical: "bottom" }}> {blike} </Text>
                        {
                            likeCheck
                                ?
                                <TouchableOpacity onPress={clickLike}><Image source={require('../../../assets/beanheart.jpeg')} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                                :
                                <TouchableOpacity onPress={clickLike}><Image source={require('../../../assets/heart.jpeg')} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ width: "100%", height: Dimensions.get('window').height * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", width: "15%", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, textAlignVertical: "center" }}>{id}</Text>
                        <View style={{ height: "100%", borderLeftWidth: 0.5, borderColor: "grey", alignItems: "center", marginLeft: 5, flexDirection: "row" }}>
                            <Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginLeft: 8 }}>조회수 </Text>
                            <Text style={{ fontSize: 12, color: "gray" }}>{bviewCount}</Text>
                        </View>
                    </View>


                    {id === WriterId &&
                        <View style={{ borderColor: "grey", flexDirection: "row" }}>
                            <View>
                                <TouchableOpacity onPress={() =>

                                    ModifyAction()

                                }><Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginRight: 5 }}>글 수정</Text></TouchableOpacity>
                            </View>
                            <View style={{ height: "50%", borderLeftWidth: 0.5, borderColor: "grey", alignItems: "center", marginLeft: 5, flexDirection: "row" }}>
                                <TouchableOpacity onPress={() =>
                                    Alert.alert("잠깐만요!", "정말로 삭제 하실건가요?", [
                                        {
                                            text: "취소",
                                            onPress: () => null,
                                        },
                                        {
                                            text: "삭제", onPress: () => {
                                                DeleteAction();
                                            }
                                        }
                                    ])
                                }><Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginLeft: 8 }}>글 삭제</Text></TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
                <View style={{padding:8 ,borderTopWidth:0.7}}>
                    <HTML source={{ html: content }} contentWidth={contentWidth} />
                </View>
                <View style={{ width: "100%", height: Dimensions.get('window').height * 0.05, borderTopWidth: 0.7, borderBottomWidth: 0.5, justifyContent: "center", padding: 10 }}>
                    <Text style={{ textAlignVertical: "center", color: "gray" }}><Text style={{ color: "red" }}>{breply}</Text> 댓글</Text>
                    {/* {
                    likeCheck 
                    ? 
                    <TouchableOpacity onPress={clickLike}><Text>좋아요 취소</Text></TouchableOpacity>  
                    : 
                    <TouchableOpacity onPress={clickLike}><Text>좋아요</Text></TouchableOpacity>                      
                } */}
                </View>
                <View > 
                {
                    replyList.map((e, index) => {

                        return (
                            <Comment
                                key={index}
                                nickname={e.id}
                                content={e.rcontent}
                                rNo={e.rno}
                                bNo={e.bno}
                                reply={replyClear}
                            />
                        )
                    })
                }
                </View>
            </View>
           
        </ScrollView>
        <View style={{backgroundColor: "#EBE3D7",maxHeight:Dimensions.get('window').height * 0.1 ,flexDirection: "row",marginTop:"auto",height:"auto",padding:8,paddingRight:3}}>
                    <View style={{ width: Dimensions.get('window').width * 0.8,justifyContent:"center"}}>
                        <TextInput
                            style={{width:"100%",fontSize:15}}
                            onChangeText={setRContent}
                            placeholder="댓글쓰기"
                            value={rContent}
                            multiline={true}
                            cursorColor="red"
                            
                        />
                    </View>
                    <View style={{ justifyContent: "center",alignItems:"center",width:Dimensions.get('window').width * 0.2 }}>
                        <TouchableOpacity
                            onPress={sendReply}
                        >
                            <Image source={require('../../../assets/write.png')} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "##EBE3D7",
    }
});