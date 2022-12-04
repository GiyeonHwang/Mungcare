import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkboxdfdfdd

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail({ navigation: { navigate } }) {

    const [data, setData] = React.useState();


    React.useEffect(() => {
        

        //포인트 내역 확인하기
        /*
        axios.post("http://192.168.2.94:5000/animal/list", null, {
            params: {
                id: "user" //sessionStorage에 있는 id값
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
*/

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
                            <Text style={{ fontSize: 40 }}>포인트</Text>
                        </View>
                    </View>
                </View>


                <View style={{ padding: 10, backgroundColor: "blue" }}>
                    {/* map 돌리기 */}
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={{
                            backgroundColor: "white",
                            padding: 10,
                            alignItems: 'center',
                            width: "15%"
                        }}>
                            <Text style={{ fontSize: 20 }}>N</Text> 
                        </View>
                        <View style={{
                            backgroundColor: "yellow",
                            padding: 10,
                            alignItems: 'center',
                            width: "50%"
                        }}>
                            <Text style={{ fontSize: 20 }}>포인트</Text>
                        </View>
                        <View style={{
                            backgroundColor: "lightgreen",
                            padding: 10,
                            alignItems: 'center',
                            width: "35%"
                        }}>
                            <Button title="기록" />
                        </View>
                    </View>
                </View>

                {/* map형식으로 계속 부름 
                {
                    data && data.map((e,idx)=>{
                        return (
                        <Pressable onPress={() => {
                            navigate("AnimalDetail", {
                                info: [ e.aname, e.asex, e.abirth, e.abreed, e.aneut, ],
                                title: e.aName,
                            })
                            // navigation.navigate({name : "AnimalDetail", key :{e}})
                            // <AnimalDetail name={e}/>
                            //console.log(e)
                        }}>
                            <View style={{ padding: 10, backgroundColor: "red" }} onPress={() => Alert.alert('ModifyAnimalInfo 페이지로 전환')}>
                                <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                                    <View style={styles.infoNum}>
                                        <Text style={{ fontSize: 20 }}>{idx+1}</Text>
                                    </View>
                                    <View style={styles.infoName}>
                                        <Text style={{ fontSize: 20 }}>이름</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 20 }}>{e.aname}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>);
                    })
                }*/}


                <View>
                    <Button title="추가" onPress={() => {
                        navigate("AddAnimal")
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
        width: "30%",
    },
    infoNum: {
        backgroundColor: "white",
        padding: 10,
        alignItems: 'center',
        width: "20%"
    },
    info: {
        backgroundColor: "blue",
        padding: 10,
        width: "50%",
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
