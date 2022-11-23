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
export default function AddFood(navigation) {
    const [aName, setAnimalName] = React.useState(""); // 애완동물 이름
    const [aSex, setAnimalSex] = React.useState(""); // 성별
    const [aBirth, setAnimalBirth] = React.useState(""); // 생일
    const [aBreed, setAnimalBreed] = React.useState(""); // 종류
    const [aNeat, setAnimalNeat] = React.useState(false); // 중성화 여부


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
        })*/

    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}> 봡 체크 </Text>
            <View style={styles.title}>
                <View style={{ padding: 10, backgroundColor: "red" }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <Text style={{ fontSize: 30 }}>
                            우리 {aName}의 밥먹는 시간
                        </Text>
                    </View>
                </View>
                {/* map 형식으로 돌면서 등록했던 내용 보여주기 */}
                <View style={{ paddingHorizontal: 10,}}>
                    <View style={{ padding: 10, flexDirection: 'row', width: '100%', }}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%', backgroundColor:"white"}}>
                            <View style={styles.num}>
                                {/*맵 인덱스 */}
                                <Text style={{ fontSize: 20 }}>d</Text> 
                            </View>
                            <View style={styles.infoName}>
                                <Text style={{ fontSize: 20 }}>시간</Text>
                            </View>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat}/>
                                <Text style={styles.paragraph}>확인</Text>
                            </View>
                        </View>
                    </View>
                </View>

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
    num:{
        padding:10,
        alignItems:'center',
        width:'10%',
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
