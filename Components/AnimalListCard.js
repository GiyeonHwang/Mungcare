import { Image , StyleSheet , View , Text,TouchableOpacity} from "react-native";
import AnimalModal from "./AnimalModal";
import React,{useState} from "react";

export default function AnimalListCard({ animalData }){


    const [modalVisible,setModalVisible] = useState(false);

    return (
        
        <View> 
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                { 
                //true false 여부에 따라 모달을 띄워준다.
                modalVisible && 
                <AnimalModal 
                animalData={animalData}
                setModalVisible={setModalVisible}/>
                }
                <View style={styles.listbox}>
                    <View style={styles.listimg}>
                    {
                        animalData.aphoto === null ? <Image style={styles.imgBox} />:
                        <Image style={styles.imgBox} source={{ uri: animalData.aphoto }} />
                    }
                    </View>
                    <Text style={styles.listtext}>
                        {animalData.aname}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imgBox : {
        resizeMode: "cover", 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 3
    },
    listbox:{
        flexDirection: 'row', 
    },
    listimg:{
        borderWidth:1,
        height:100,
        width:100,
        marginLeft:'5%',
        marginTop:"3%"
    },
    listtext:{
        borderWidth:1,
        height:80,
        width:200,
        margin:'2%',
        marginTop:"4%"
    },

})