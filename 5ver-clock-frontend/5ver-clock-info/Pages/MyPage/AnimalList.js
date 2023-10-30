import axios from 'axios';
import React from "react";
import { Text, View, StyleSheet, Alert, Modal, Pressable, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ServerPort from '../../Components/ServerPort';
import AnimalListCard from '../../Components/AnimalListCard';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function AnimalList({ navigation: { navigate } }) {

    const [id,setId] = React.useState(""); //접속중인 유저의 아이디
    const [data, setData] = React.useState(); // 유저의 AnimalList

    const removeAnimal = (id, aName) => //반려동물 삭제
    {
        console.log("removeAnimal--------------------",id,", aname----------",aName);
        axios.post(`${IP}/animal/remove`, null, {
        params: {
            id: id,
            aName: aName
        }
        })
        .then(function(res) {
        console.log("removeAnimal--",res.data);
        info()
        })
        .catch(function(error) {
        console.log("반려동물 삭제 실패- ", error)
        })
    }

    const info = async () => {

        const ID = await load();
        // 서버에 요청
        // 애완동물 목록 불러오기
        console.log("ID : " , ID);
        axios.post(`${IP}/animal/list`, null, {
            params: {
                id: ID //sessionStorage에 있는 id값
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(function (error) {
                console.log("AnimallList DB연동 실패,,,,",error);
            })
    }


    const load = async () => {
        try{
            const id = await AsyncStorage.getItem('id');
            console.log(id);
            setId(id);
            return id;
        }
        catch(e)
        {
            console.log("로드 에러" , e);
        }
    }

    React.useEffect(() => {
        info();
    }, []);

    return (

        <View style={styles.container}>
            <ScrollView>
                <View>
                    {/* map형식으로 계속 부름 */}
                    {
                        data && data.map((e, index) => {
                            return (
                                <AnimalListCard
                                key = {index}
                                animalData = {e}
                                info = {info}
                                removeAnimal = {removeAnimal}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
            
            <View style={styles.addanimal}>
                    <Icon name="pluscircle" size={70} color="#F7931D" style={{padding:"5%", borderWidth:1, borderColor:'#EBE3D7'}}  
                    onPress={() => {
                        navigate("AddAnimal", {
                            id: id,
                            info: info
                        })
                    }} />
                    
                </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor: '#EBE3D7',
    },
    addanimal:{
        flex:1,
        position: 'absolute',
        // borderWidth:1,
        height:100,
        width:100,
        // marginTop:"3%",
        marginLeft:"70%",
        // marginTop:"75%",
        bottom:0,
        alignSelf:'flex-end',
        alignItems: 'center',
        
        
        // flexDirection: 'row', 
        // borderWidth:1
    }
});
