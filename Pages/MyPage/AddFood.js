import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import concat from "react";
//npm install expo-checkbox
import AsyncStorage from '@react-native-async-storage/async-storage';
//expo install @react-native-async-storage/async-storage


//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from 'react-native-gesture-handler';
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
const Stack = createStackNavigator();

//동물 info가져오기
export default function AddFood(navigation) {
    const [aName, setAnimalName] = React.useState(""); // 애완동물 이름
    const [aSex, setAnimalSex] = React.useState(""); // 성별
    const [aBirth, setAnimalBirth] = React.useState(""); // 생일
    const [aBreed, setAnimalBreed] = React.useState(""); // 종류
    const [aNeat, setAnimalNeat] = React.useState(false); // 중성화 여부

    const [insertTag, setInsertTag] = React.useState([]); // 저장을 누르면 생기는 
    const [valueTag, setValueTag] = React.useState(); // 추가버튼을 누르면 생기는 



    const [time, setTime] = React.useState(0);
    const [okTime, setOKTime] = React.useState(false);

    React.useEffect(() => {
        //선택한 동물의 정보 가져오려면 props사용해야함


        // 서버에 요청
        // 애완동물 정보 불러오기
        /*
        axios.post("http://192.168.2.94:5000/member/mypage", null, {
            params : {
                id: "user3" //sessionStorage에 있는 id값
            }
        })
        .then(function (res){
            console.log(res.data);

            setAnimalName(res.data.aName);
            setAnimalSex(res.data.aSex);
            setAnimalBirth(res.data.abirth);
            setAnimalBreed(res.data.abreed);
            setAnimalNeat(res.data.aNeat);
        })
        .catch(function (error){
            console.log(error)
        })
        */

    }, []);


    const validateTime = time => {
        const regex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
        return regex.test(time);
    }

    const handleChangeTime = (time) => {
        const changedTime = autoHyphen(time);
        console.log(changedTime);
        setTime(changedTime);
        setOKTime(validateTime(changedTime));
    };

    //자동 땡땡 생성
    const autoHyphen = (target) => {
        return target.replace(/[^0-9]/g, '').replace(/^(\d{2})(\d{2})$/g, "$1:$2").replace(/(\:{1})$/g, "");
    }
    const getData = async () => {
        try {
            // 'tasks'항목에 저장된 자료 
            const loadedData = await AsyncStorage.getItem('tasks');
            // 자료가 없을 때 에러가 뜨지 않도록 빈객체를 반환하도록 한다
            setTasks(JSON.parse(loadedData) || "{}");
        } catch (e) {
            // error reading value
        }
    }
    
    const storeData = async tasks => {
        try {
            // 'tasks' 라는 항목에 tasks 저장
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            // saving error
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 봡 ㄷㅡㅇㄹㅗㄱ </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, backgroundColor: "red" }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <Text style={{ fontSize: 30 }}>
                            우리 {aName}의 밥먹는 시간
                        </Text>
                    </View>
                </View>
                {/* map 형식으로 돌면서 등록했던 내용 보여주기 */}
                <View style={{ paddingHorizontal: 10, }}>
                    <View style={{ padding: 10, flexDirection: 'row', width: '100%', }}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%', backgroundColor: "white" }}>
                            <View style={styles.num}>
                                {/*맵 인덱스 */}
                                <Text style={{ fontSize: 20 }}>d</Text>
                            </View>
                            <View style={styles.infoName}>
                                <Text style={{ fontSize: 20 }}>시간</Text>
                            </View>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* 추가하고 저장한 내용 */}
                {insertTag}




                {/* 추가버튼을 누르면 나오는 태그 */}
                {valueTag}

                <Button title="추가" onPress={() => {

                    console.log(insertTag.length);
                    // 버튼을 누를 때마다 태그 추가 
                    // 하나를 추가, 저장해야함
                    setValueTag(<View style={{ paddingHorizontal: 10, }}>
                        <View style={{ padding: 10, flexDirection: 'row', width: '100%', }}>
                            <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%', backgroundColor: "white" }}>
                                <View style={styles.num}>
                                    {/*맵 인덱스 
                                       맵 인덱스 + 저장된 값
                                    */}

                                    <Text style={{ fontSize: 20 }}>d</Text>
                                </View>
                                <View style={styles.infoName}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChangeTime}
                                        value={time}
                                        placeholder="시간"
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={styles.section}>
                                    <Button title="저장" onPress={(time) => {
                                        //저장버튼을 누르면 setValueTag 초기화
                                        setValueTag("");
                                        // 서버에 전송 및 체크박스 활성화
                                        valuetime = time;
                                        setInsertTag(insertTag.concat(<View style={{ paddingHorizontal: 10, }}>
                                            <View style={{ padding: 10, flexDirection: 'row', width: '100%', }}>
                                                <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%', backgroundColor: "white" }}>
                                                    <View style={styles.num}>
                                                        {/*맵 인덱스 */}
                                                        <Text style={{ fontSize: 20 }}>d</Text>
                                                    </View>
                                                    <View style={styles.infoName}>
                                                        <Text style={{ fontSize: 20 }}>{t}</Text>
                                                    </View>
                                                    <View style={styles.section}>
                                                        <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        ))
                                        setTime(0);

                                    }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    )

                }
                } />


                <View>
                    <Button title="수정" onPress={() => Alert.alert('Food 페이지로 전환')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    num: {
        padding: 10,
        alignItems: 'center',
        width: '10%',
    },
    infoName: {
        padding: 10,
        alignItems: 'center',
        width: "55%",
    },
    info: {
        padding: 10,
        width: "35%",
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    paragraph: {
        fontSize: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',

    },
});
