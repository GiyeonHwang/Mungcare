import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
//npm install expo-checkboxdfdfdd
import ServerPort from '../../Components/ServerPort';


//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function AnimalDetail({ navigation, route }) {
    const [point, setPoint] = React.useState(route.params.point); // 포인트
    const [data, setData] = React.useState();

    React.useEffect(() => {
        //포인트 내역 확인하기
        axios.post(`${IP}/point/weekPoint`, null, {
            params: {
                id: route.params.id //sessionStorage에 있는 id값
            }
        })
        .then(function (res) {
            console.log(res);
            console.log(res.data);
            setData(res.data);
        })
        .catch(function (error) {
            console.log(error)
        })

    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 포인트 </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, backgroundColor: "red" }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{
                            backgroundColor: "white",
                            padding: 10,
                            alignItems: 'center',
                            width: "30%"
                        }}>
                            <Text style={{ fontSize: 10 }}>내 전체 포인트</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={{
                            backgroundColor: "white",
                            padding: 10,
                            alignItems: 'center',
                            width: "60%"
                        }}>
                            <Text style={{ fontSize: 40 }}>{point}</Text>
                        </View>
                    </View>
                </View>

                <ScrollView>
                <View style={{ padding: 10, backgroundColor: "blue" }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoNum}>
                            <Text style={{ fontSize: 20 }}>날짜</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 20 }}>playPoint</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 20 }}>walkPoint</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ fontSize: 20 }}>totalPoint</Text>
                        </View>
                    </View>
                    {/* map 돌리기 */}
                    {
                        data && data.map((e, idx) => {
                            return (
                                    <View key={idx} style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                        <View style={styles.infoNum}>
                                            <Text style={{ fontSize: 20 }}>{e.pointDate}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text style={{ fontSize: 20 }}>{e.playPoint}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text style={{ fontSize: 20 }}>{e.walkPoint}</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text style={{ fontSize: 20 }}>{e.totalPoint}</Text>
                                        </View>
                                    </View>
                            )
                        })
                    }
                </View>
                </ScrollView>
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
        width: "30%",
    },
    infoNum: {
        backgroundColor: "white",
        padding: 10,
        alignItems: 'center',
        width: "40%"
    },
    info: {
        backgroundColor: "blue",
        padding: 10,
        width: "20%",
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
