import React from "react";
import { StyleSheet , Modal , View , Text , Alert , Pressable, Image } from "react-native";
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default function AnimalModal({animalData,setModalVisible})
{
    const navigation = useNavigation();
    console.log("뭐가 있을까요?",animalData)
    return (
        <View style={styles.box1}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    >
                    <View style={styles.centeredView}>
                    {/* backgroundColor:"#EBE3D7", */}
                        <View style={styles.modalView}>         
                            <View style={{borderWidth:3, borderColor:"#b8997c", borderRadius: 20, backgroundColor:"#EBE3D7",}}>
                                <View style={{ alignContent: 'center', flexDirection: 'row', }}>
                                    
                                        <View style={{ width: '50%', alignItems: 'center', borderBottomWidth:1, justifyContent: "center", borderTopLeftRadius:20 }}>
                                            {
                                                animalData.aphoto === null ? <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3, }} source={{ uri: "https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif" }} />:
                                                <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: animalData.aphoto }} />
                                            }
                                        </View>

                                        <View style={{ width: '50%', justifyContent: 'center', borderBottomWidth:1, alignItems: 'center', borderTopRightRadius:20 }}>
                                            <Text style={{ fontSize: 30, padding: 10 }}>{animalData.aname}</Text>
                                            <Text style={{ fontSize: 20, padding: 10 }}>{animalData.abreed}</Text>{/*견종  */}
                                        </View>
                                </View>
                                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                                </View>
                                {/* venus-mars */}
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", }}>
                                        <Icon name="birthday-cake" size={30} color="#F7931D" style={{padding:"5%", borderWidth:1, borderColor:'#EBE3D7'}}/>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%",}}>
                                        <Text style={styles.animalText}>{animalData.abirth}</Text>
                                    </View>
                                </View>
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%",}}>
                                        <Icon2 name="venus-mars" size={30} color="#F7931D" style={{padding:"5%", borderWidth:1, borderColor:'#EBE3D7'}}/>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%",}}>
                                        <Text style={styles.animalText}>{animalData.asex}</Text>
                                    </View>
                                </View>
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", borderBottomLeftRadius:20 }}>
                                        <Icon name="clipboard-check" size={30} color="#F7931D" style={{padding:"5%", borderWidth:1, borderColor:'#EBE3D7'}}/>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "60%", alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent:'center', borderBottomRightRadius:20 }}>
                                            <Checkbox style={styles.checkbox}/>
                                            <Text style={styles.paragraph}>  중성화 여부</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10, marginTop:"5%" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(false)
                                        console.log(animalData)
                                        navigation.navigate("ModifyAnimal", {
                                            animalData : animalData
                                        })
                                    }}>
                                    
                                    <Text style={styles.textStyle}>Modify</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setModalVisible(false); removeAnimal(animalData.id, animalData.aname);}}
                                >
                                    <Text style={styles.textStyle}>Remove</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() =>setModalVisible(false) }>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
    )
}

const styles = StyleSheet.create({
    animalText :{
        fontSize: 15
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
    modalContainer :{
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        
    },
    buttonClose: {
        backgroundColor: '#F7931D',
    },
    modalContainer :{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1:{
        alignContent: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        color:'white'
    }
})