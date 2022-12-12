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

// 버튼 스타일 적용
import { Button } from '@rneui/themed';

// icon 적용
import { IconName } from "react-icons/io5";

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function AnimalDetail({ navigation: { navigate } }) {
    const [id, setId] = React.useState(""); //세션에 저장된 아이디
    const [data, setData] = React.useState();
    // 모달
    const [modalVisible, setModalVisible] = React.useState(false);
    // 모달에 보이는 데이터 값
    const [modalData, setModalData] = React.useState("");
    const [mImg, setMImg] = React.useState("");


    const save = async () => {
        try {
            setId(await AsyncStorage.getItem('id'));
        } catch (e) {
            console.log("유저 세션 안불러와짐");
        }
    }
    


    // 로그인 유지
    const getId = async () =>{
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                console.log("id---: ", value);
                return value;
            }
        } catch (e) {
            console.log("not session... ", e);
        }
    }

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
        animalList(id);
        })
        .catch(function(error) {
        console.log("반려동물 삭제 실패- ", error)
        })
    }

    const animalList = (id) => {
        axios.post(`${IP}/animal/list`, null, {
            params: {
                id: id //sessionStorage에 있는 id값
            }
        })
        .then(function (res) {
            console.log(res);
            console.log("animalList--",res.data);
            setData(res.data);
            setId(id);

        })
        .catch(function (error) {
            console.log(error)
        })
    }

    React.useEffect(() => {
        (async () => {
            const id = await getId(); //세션 id값 가져옴
            animalList(id);
        })();
    }, []);

    


    return (

        <View style={styles.container}>
            <View style={styles.box1}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* <View sytle={{ alignContent: 'center', width: '100%', padding: 10, alignItems: 'center'}}> */}
                            <View style={styles.modalback}>
                                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                                {/* <View> */}
                                    <View style={{ width: '50%', backgroundColor: 'yellow', alignItems: 'center', }}>
                                        {
                                            mImg === null ? <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: "https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif" }} />:
                                            <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: mImg }} />
                                        }
                                    </View>

                                    <View style={{ backgroundColor: 'red', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 30, padding: 10 }}>{modalData.aname}</Text>
                                        <Text style={{ fontSize: 20, padding: 10 }}>{modalData.abreed}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>생일</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abirth}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>성별</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abreed}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>중성화</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "60%", alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", backgroundColor: 'lightgreen', justifyContent:'center' }}>
                                            <Checkbox style={styles.checkbox} value={modalData.aneut} />
                                            <Text style={styles.paragraph}>중성화 여부</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigate("ModifyAnimal", {
                                            info: [modalData.aname, modalData.asex, modalData.abirth, modalData.abreed, modalData.aneut, modalData.aphoto, id],
                                            title: modalData.aName,
                                            id: id,
                                            animalList: animalList
                                        })
                                    }}>
                                    <Text style={styles.textStyle}>Modify</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setModalVisible(!modalVisible); removeAnimal(id, modalData.aname);}}>
                                    <Text style={styles.textStyle}>Remove</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>



            {/* <View style={styles.animalbox}>
                <Text style={styles.introtext}> 애완동물 목록 </Text>
            </View> */}
            <ScrollView>
                <View style={styles.animalinfobox}>
                    {/* map형식으로 계속 부름 */}
                    {
                        data && data.map((e, index) => {
                            return (
                                <AnimalListCard
                                key = {index}
                                img = {e.aphoto}
                                aname = {e.aname}
                                setModalVisible = {setModalVisible}
                                />
                            )
                        })
                    }


                </View>
                

            </ScrollView>
            <View style={styles.addanimal}>
                    {/* <Button title="추가" onPress={() => {
                        navigate("AddAnimal")
                    }} 
                    buttonStyle={{
                        borderColor: 'rgba(78, 116, 289, 1)',
                    }}
                    type="outline"
                    titleStyle={{ color: '#F7931D', fontSize:20 }}
                    containerStyle={{
                        width: 200,
                        marginLeft:"28%",
                        // marginHorizontal: 50,
                        // marginVertical: 10,
                        marginTop:"0.5%",
                        
                    }}
                    
                    /> */}
                    <Icon name="pluscircle" size={70} color="#F7931D" style={{padding:"5%", borderWidth:1, borderColor:'#EBE3D7'}}  onPress={() => {
                        navigate("AddAnimal")
                    }} />
                    
                </View>
            
                

            <View >

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
    modalback:{
        backgroundColor:'#EBE3D7'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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




  



    // animalbox:{
    //     flex:1,
    //     // borderWidth:1,
    //     // borderColor:'#b8997c',
    //     justifyContent: "center",
    //     alignItems: "center",
        
    // },
    // introtext:{
    //     fontSize:20
    // },
    // animalinfobox:{
    //     flex:10,
    //     // borderWidth:1
    // },
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