import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Alert,useWindowDimensions,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Comment from '../../../Components/Comment';
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FreeBoardDetail({ navigation, route }) {

    const [bno, setBno] = React.useState(route.params.no);
    const [detailInfo, setDetailInfo] = React.useState({});
    const [content, setContent] = React.useState("");
    const contentWidth = useWindowDimensions().width;
    const [userToken, setuserToken] = React.useState("");



    React.useEffect(() => {
        console.log(bno);

        axios.post("http://192.168.2.94:5000/board/detailView", null, {
            params: { bNo: bno }
        })
            .then(function (res) {
                console.log(JSON.stringify(res.data, null, "\t"));
                setDetailInfo(res.data);
                setContent(res.data.bcontent);
                console.log(content);
            })
    }, [])

    const pressHandler = () => {
        // 뒤로 돌아가기. goBack = pop
        navigation.goBack();
        // navigation.pop();
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
        axios.post("http://192.168.2.94:5000/board/remove", null, {
            params: { bNo: bno }
        })
            .then(function (res) {
                // console.log("나는 Deleteres: ", res);
                // console.log("Deleteresres.data: ", res.data);
            })
            .catch(function (error) {
                console.log("삭제 실패: ", error);
            })
            Alert.alert("삭제완료");
            navigation.navigate("Main");
    }




    return (
        <ScrollView style={styles.container}>
            <View style={{ width: "100%", height: Dimensions.get('window').height * 0.1, borderTopWidth: 1, borderBottomWidth: 1, padding: 10 }}>
                <View style={{ width: "100%", height: "40%", flexDirection: "row", justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, textAlignVertical: "center" }}>{detailInfo.btitle}</Text>
                    <Text style={{ color: "red", fontSize: 15, textAlignVertical: "bottom" }}> {detailInfo.blike}<Text> 좋아요</Text></Text>
                </View>
                <View style={{ width: "100%", height: "60%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", width: "15%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, textAlignVertical: "center" }}>{detailInfo.id}</Text>
                        <View style={{ height: "100%", borderLeftWidth: 0.5, borderColor: "grey", alignItems: "center", marginLeft: 5, flexDirection: "row" }}>
                            <Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginLeft: 8 }}>조회수{detailInfo.bviewCount}</Text>
                        </View>
                    </View>

                    <View style={{ borderColor: "grey", flexDirection: "row" }}>
                        <TouchableOpacity><Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginRight: 5 }}>글 수정</Text></TouchableOpacity>
                        <View style={{ height: "50%", borderLeftWidth: 0.5, borderColor: "grey", alignItems: "center", marginLeft: 5, flexDirection: "row" }}>
                            <TouchableOpacity onPress={() =>
                                Alert.alert("잠깐만요!", "정말로 삭제 하실건가요?", [
                                    {
                                        text: "아니요",
                                        onPress: () => null,
                                    },
                                    {
                                        text: "예", onPress: () => {
                                            DeleteAction();
                                        }
                                    }
                                ])
                            }><Text style={{ textAlignVertical: "bottom", fontSize: 12, color: "grey", marginLeft: 8 }}>글 삭제</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
            <View>
                <HTML source={{ html: content }} contentWidth={contentWidth} />
            </View>
            <View style={{ width: "100%",height: Dimensions.get('window').height * 0.05, borderTopWidth: 0.7, borderBottomWidth: 0.5, justifyContent: "center", padding: 10 }}>
                <Text style={{ textAlignVertical: "center" }}><Text style={{ color: "red" }}>{detailInfo.breply}</Text> 댓글</Text>
            </View>
            <Comment />
            <Comment />
            <Comment />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#CCCCFF",
    }
});