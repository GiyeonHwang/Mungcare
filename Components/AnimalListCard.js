
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
                    <View style={styles.listtext}>
                        <Text style={styles.puppyname}>{animalData.aname}</Text>
                        <Text style={styles.puppytext}>자세한 정보를 보려면 눌러주세요.</Text>
                    </View>

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
        borderWidth: 3,
    },
    listbox:{
        flexDirection: 'row', 
        margin:"3%", 
        marginTop:"5%",
        // backgroundColor:"blue" 
    },
    listimg:{
        // borderWidth:1,
        height:110,
        width:110,
        marginLeft:'10%',
        marginTop:"3%",
        borderRadius:50
    },
    listtext:{
        // borderWidth:1,
        padding:"2%",
        width:200,
        margin:'2%',
        marginTop:"6%",
        // marginLeft:"5%"
    },
    puppyname:{
        fontSize:18,
        marginBottom:"5%",
        // backgroundColor:"red"
    },
    puppytext:{
        fontSize:10,
        bottom:"2%"
    }


})