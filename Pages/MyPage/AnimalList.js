import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail(navigation) {

    React.useEffect(() => {
        //선택한 애완동물의 정보를 가져오려면 props사용해야함
        //아직 미완

        // 서버에 요청
        // 애완동물 목록 불러오기
        /*
        axios.post("http://192.168.2.94:5000/member/mypage", null, {
            params : {
                id: "user3" //sessionStorage에 있는 id값
            }
        })
        .then(function (res){
            console.log(res.data);
            //data를 저장해야함
            
            setAnimalName(res.data.aName);
            setAnimalSex(res.data.aSex);
            setAnimalBirth(res.data.abirth);
            setAnimalBreed(res.data.abreed);
            setAnimalNeat(res.data.aNeat);
        })
        .catch(function (error){
            console.log(error)
        })*/

    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 애완동물 목록 </Text>
            <View style={styles.title}>
                {/* map형식으로 계속 부름 */}

                <Pressable onPress={() => Alert.alert('AnimalDetail 페이지로 전환')}>
                    <View style={{ padding: 10, backgroundColor: "red" }} onPress={() => Alert.alert('ModifyAnimalInfo 페이지로 전환')}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                            <View style={styles.infoName}>
                                <Text style={{ fontSize: 20 }}>애완동물 이름</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={{ fontSize: 15 }}>dfdfdf</Text>
                            </View>
                        </View>
                        <View>
                            <Button title="수정" onPress={() => Alert.alert('ModifyAnimalInfo 페이지로 전환')} />
                        </View>
                    </View>
                </Pressable>
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
    infoName: {
        padding: 10,
        alignItems: 'center',
        width: "45%",
    },
    info: {
        padding: 10,
        width: "55%",
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
