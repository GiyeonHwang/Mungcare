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
const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail({  navigation  , route}) {
    const [aName, setAnimalName] = React.useState(route.params.info[0]); //애완동물 이름
    const [aSex, setAnimalSex] = React.useState(route.params.info[1]); //성별
    const [aBirth, setAnimalBirth] = React.useState(route.params.info[2]); //생일
    const [aBreed, setAnimalBreed] = React.useState(route.params.info[3]); //종류
    const [aNeat, setAnimalNeat] = React.useState(route.params.info[4]); //중성화 여부


    React.useEffect(() => {
        console.log("animal")
        //선택한 동물의 정보 가져오려면 props사용해야함
        console.log(route);
        load()
    }, []);
    
    const load = async () => {
        try {
            const value = await AsyncStorage.getItem('key');
            const infoString = await AsyncStorage.getItem('info');
            const info = JSON.parse(infoString); // 저장된 객체 변환
            console.log(value);
        } catch (e) {
            // 오류 예외 처리
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> 애완동물 정보 </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>이름</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>{aName}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>성별</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>{aSex}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>생일</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>{aBirth}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>종류</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 15 }}>{aBreed}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>중성화 여부</Text>
                        </View>
                        {/* 중성화 여부는 체크박스 */}
                        <View style={{ flexDirection: 'row', padding: 10, width: "55%", alignItems: 'center', }}>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={aNeat}/>
                                <Text style={styles.paragraph}>중성화 여부</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Button title="수정" onPress={() => {
                        console.log(aName)
                        // HomeScreen()
                        navigation.navigate("ModifyAnimal",{
                            info: [ aName, aSex, aBirth, aBreed, aNeat ],
                            title: "title",
                        })
                    }} />
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