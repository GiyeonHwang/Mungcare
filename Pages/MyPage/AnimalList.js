import axios from 'axios';
import React from "react";
import { Text, View, StyleSheet, Alert, Modal, Pressable, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ServerPort from '../../Components/ServerPort';
import AnimalListCard from '../../Components/AnimalListCard';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";

// 버튼 스타일 적용
import { Button } from '@rneui/themed';

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
                console.log("AnimallList 값이지롱: ",res.data);
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
            <View style={styles.animalbox}>
                <Text style={styles.introtext}> 애완동물 목록 </Text>
            </View>
            <View style={styles.animalinfobox}>
                {/* map형식으로 계속 부름 */}
                {
                    data && data.map((e, index) => {
                        console.log(`${index}번째 e 데이터 : ` ,JSON.stringify(e, null, "\t"));
                        return (
                            <AnimalListCard
                            key = {index}
                            animalData = {e}
                            />
                        )
                    })
                }
            </View>
            
                <View style={styles.addanimal}>
                    <Button title="추가" onPress={() => {
                        navigate("AddAnimal", {
                            id: id
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
    red:{
        padding: 10,
         backgroundColor: "red"
    },
    redbox:{
        borderBottomWidth: 1,
         flexDirection: 'row',
          width: '100%'
    },
    textsize:{
        fontSize: 20
    },

    box1:{
        alignContent: 'center',
        justifyContent: 'center'
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },




  



    animalbox:{
        flex:1,
        borderWidth:1,
        justifyContent: "center",
        alignItems: "center"
    },
    introtext:{
        fontSize:20
    },
    animalinfobox:{
        flex:10,
        borderWidth:1
    },
    listbox:{
        // flex:1,
        flexDirection: 'row', 
    },
    listimg:{
        borderWidth:1,
        height:100,
        width:100,
        // margin:'2%',
        marginLeft:'5%',
        marginTop:"3%"
    },
    listtext:{
        borderWidth:1,
        height:80,
        width:200,
        margin:'2%',
        // marginRight:"100%",
        marginTop:"4%"
    },

    addanimal:{
        flex:1,
        height:100,
        borderWidth:1
    },
    animalText :{
        fontSize: 15
    },








});
