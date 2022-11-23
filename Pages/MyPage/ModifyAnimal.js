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
import { TextInput } from 'react-native-gesture-handler';
import { installReactHook } from 'react-native/Libraries/Performance/Systrace';
import { arMA } from 'date-fns/locale';

const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail({ navigation, route }) {
    const [aName, setAnimalName] = React.useState(route.params.info[0]); //애완동물 이름
    const [aSex, setAnimalSex] = React.useState(route.params.info[1]); //성별
    const [aBirth, setAnimalBirth] = React.useState(route.params.info[2]); //생일
    const [aBreed, setAnimalBreed] = React.useState(route.params.info[3]); //종류
    const [aNeat, setAnimalNeat] = React.useState(route.params.info[4]); //중성화 여부

    const [checkbool, setCheckBool] = React.useState(false);
    const [change, setChange] = React.useState(false);

    React.useEffect(() => {
        console.log("ModifyAnimal");
        //선택한 동물의 정보 가져오려면 props사용해야함
        //아직 미완
        console.log(route);

    }, []);

    const check = () => {
        if (aName != route.params.info[0] || aSex != route.params.info[1] || aBirth != route.params.info[2] || aBreed != route.params.info[3] || aNeat != route.params.info[4]) {
            console.log("check")
            setCheckBool(true);
            insert();
        }
    }

    const insert = () => {
        console.log(checkbool);
        if (checkbool) {
            console.log("check is true")

            /*
            axios.post("http://192.168.2.94:5000/animal/modify", null, {
                params: {
                    aName: aName,
                    id: "user",
                    aBirth: aBirth,
                    aBreed: aBreed,
                    aNeat: aNeat,
                    aSex: aSex,
                }
            })
                .then(function (res) {
                    console.log(res);
                    console.log(res.data);
                    if (res.data === route.params.info[0]){
                        Alert.alert("수정 완료!")
                        setChange(true);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
                */
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 애완동물 정보 수정</Text>
            <View style={styles.title}>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>애완동물 이름</Text>
                        </View>
                        <View style={styles.info}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setAnimalName}
                                placeholder={aName}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>성별</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={setAnimalSex}
                                placeholder={aSex}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>생일</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={setAnimalBirth}
                                placeholder={aBirth}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>견종</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={setAnimalBreed}
                                placeholder={aBreed}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>중성화 여부</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, width: "55%", alignItems: 'center', }}>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat} />
                                <Text style={styles.paragraph}>중성화 여부</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Button title="저장" onPress={() => {
                        //서버에 저장하는 함수 실행
                        check()
                        if (change) {
                            navigation.navigate("AnimalList");
                        }
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
    input: {
        fontSize: 20
    },
});
