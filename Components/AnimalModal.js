import React from "react";
import { StyleSheet , Modal , View , Text , Alert , Pressable } from "react-native";
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function AnimalModal({animalData,setModalVisible})
{
    const navigation = useNavigation();
   

    return (
        <View style={styles.box1}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                                </View>
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={styles.animalText}>생일</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={styles.animalText}>{animalData.abirth}</Text>
                                    </View>
                                </View>
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={styles.animalText}>성별</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={styles.animalText}>{animalData.asex}</Text>
                                    </View>
                                </View>
                                <View style={styles.modalContainer}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={styles.animalText}>중성화</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "60%", alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", backgroundColor: 'lightgreen', justifyContent:'center' }}>
                                            <Checkbox style={styles.checkbox}/>
                                            <Text style={styles.paragraph}>중성화 여부</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
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
    modalContainer :{
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
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
    modalContainer :{
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1:{
        alignContent: 'center',
        justifyContent: 'center'
    },
})