import React from "react";
import { Image , Pressable , StyleSheet , View , Text} from "react-native";
import no from '../assets/images/no.png'

export default function AnimalListCard({img , aname , setModalVisible}){

    return (
        
        <View>
            {console.log("img : ",img, "aname : ",aname)}
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={styles.listbox}>
                    <View style={styles.listimg}>
                    {
                        img === null ? <Image source={no} style={styles.imgBox} />:
                        <Image style={styles.imgBox} source={{ uri: img }} />
                    }
                    </View>
                    <View style={styles.listtext}>
                        <Text style={styles.puppyname}>{aname}</Text>
                        <Text style={styles.puppytext}>자세한 정보를 보려면 눌러주세요.</Text>
                    </View>

                </View>
            </Pressable>
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