
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, ProgressBarAndroid, Image, Dimensions } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
//npm install expo-checkboxdfdfdd
import ServerPort from '../../Components/ServerPort';

// 사진 import해줌
import coin from '../../assets/images/coin.png';

// bar import
import ProgressBar from "react-native-animated-progress";

// 아이콘 import해줌
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Fontisto';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function AnimalDetail({ navigation, route }) {
    const [point, setPoint] = React.useState(route.params.point); // 포인트
    const [data, setData] = React.useState();

    React.useEffect(() => {
        //포인트 내역 확인하기
        axios.post(`${IP}/point/weekPoint`, null, {
            params: {
                id: route.params.id //sessionStorage에 있는 id값
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

    }, []);


    return (
        <View style={styles.container}>
             {/* 포인트 보이기 */}
            
            <View style={styles.mybox}>
                <View style={styles.mypointtext}>
                    <Text style={styles.mypointtextsize}>총 포인트</Text>
                </View>
                <View style={styles.mypointbox}>
                    <Image source={coin} style={styles.mypointcoin}/>
                    <Text style={styles.mypointnum}>{point}</Text> 
                </View>
                
            </View>
            
            {/* ProgressBar */}
            <View style={styles.androidbox}>
                <View style={styles.example}> 
                    <ProgressBar progress={point/10} height={20} backgroundColor="#3AB5A9" />
                </View>
            </View>

            <ScrollView>
                <View style={{flex:9.5}}>
                    {/* map 돌리기 */}
                    {
                        data && data.map((e, idx) => {
                            return (
                                <View key={idx} style={styles.infoday}>
                                    <View style={styles.infoNum}>
                                        <Text style={{ fontSize: 20, }}> <Icon3 name="date" size={20} color="#F7931D" style={{marginTop:"15%", marginRight:"10%"}} />  {e.pointDate}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 20 }}> <Icon2 name="bone" size={20} color="#F7931D" style={{marginTop:"15%", marginRight:"10%"}} />  playPoint: {e.playPoint}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 20 }}> <Icon name="dog-service" size={30} color="#F7931D" style={{marginTop:"15%", marginRight:"10%"}} /> walkPoint: {e.walkPoint}</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={{ fontSize: 20 }}> <Icon2 name="coins" size={20} color="#F7931D" style={{marginTop:"15%", marginRight:"10%",}} />   totalPoint: {e.totalPoint}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.06,
        // padding: 24,
        backgroundColor: '#EBE3D7',
    },
    infoday:{
        // borderWidth: 1,
        borderBottomWidth:1,
        borderColor:"#b8997c", 
        width: '100%', 
        padding:"5%",
    },
    infoNum: {
        backgroundColor: "white",
        // padding: 10,
        // alignItems: 'center',
        borderRadius:10,
        width:"51%"
        // width: "40%",
        // flexDirection: 'column'
    },
    info: {
        // backgroundColor: "skyblue",
        padding: 10,
        // width: "40%",
        // alignItems: 'center',
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
    mypointbox:{
        marginHorizontal:"3%",
        marginLeft:"48%",
        marginTop:"3%",
        flexDirection: 'row',
     
    },
    mypointcoin:{
        width:40, 
        height:40, 
        marginTop:'10%',
        marginRight:"5%"
    },
    mybox:{
        flexDirection: 'row',
        padding:"2%"
    },
    mypointtext:{
        marginLeft:'3%',
        marginTop:'6%'
    },
    mypointtextsize:{
        fontSize:20
    },
    mypointnum:{
        marginTop:"10%",
        fontSize:20
        // borderWidth:1
        
    },
    androidbox:{
        marginHorizontal:"3%",
    },
    example: {
        // height: '8%',
        marginVertical: 10,
        // backgroundColor:"white"
    },

});