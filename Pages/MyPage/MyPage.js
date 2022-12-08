import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet,  Alert, Image, ProgressBarAndroid } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

// 버튼 스타일npm install @rneui/themed <- 필요
import { Button } from '@rneui/themed';

// 사진 import해줌
import coin from '../../assets/images/coin.png';

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

export default function MyPage({navigation}) {
    const [id, setId] = React.useState(""); // 아이디
    const [pw, setPw] = React.useState(""); // 비밀번호
    const [name, setName] = React.useState(""); // 이름
    const [nickname, setNickname] = React.useState(""); //닉네임
    const [phone, setPhone] = React.useState(""); // 전화번호
    const [address, setAddress] = React.useState(""); // 주소
    const [detailaddress, setDetailAddress] = React.useState("");//상세주소
    const [location_Num, onChangeLocationNum] = React.useState(""); // 우편번호
    const [check, setCheck] = React.useState(true); //스피너 위치기반 서비스 허용 여부
    const [point, setPoint] = React.useState();
    const [profile, setProFile] =React.useState();
    
    React.useEffect(() => {

        // 서버에 요청
        
        axios.post("http://192.168.2.94:5000/member/info", null, {
            params : {
                id: "user" //sessionStorage에 있는 id값
            }
        })
        .then(function (res){
            console.log(res.data);

            setId(res.data.id);
            setPw(res.data.pw);
            setName(res.data.name);
            setNickname(res.data.nickname);
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setDetailAddress(res.data.detail_Address);
            onChangeLocationNum(res.data.location_Num);
            //setCheck(res.data.check);
            setPoint(res.data.accurePoint);
            setPoint(12345)
        })
        .catch(function (error){
            console.log(error)
        })

    }, []);

    // AsyncStorage.setItem("check", "cccc", () => {
    //     console.log("저장완료")
    // });
    const checkAsy = () => {
        AsyncStorage.getItem("check", (e, result) => {
            console.log(result)
        })
    }
    // AsyncStorage.removeItem("check")

    return (
        <View style={styles.container}>
           <View style={styles.pointbox}>

            {/* username */}
                <View style={styles.infobox}>
                    <View style={styles.infoimg}>
                        <Icon name="user" size={70} color="#F7931D" style={{marginTop:"15%", marginRight:"5%"}} />
                    </View>
                    <View style={styles.infotext}>
                        <Text style={styles.infotextstyle}>User name</Text>
                    </View>
                </View>


            {/* 게시글 수 */}
                <View style={styles.infobox}>
                    <View style={styles.infoimg}>
                        <Text style={styles.infodbnum}>5{/*db에서 불러온 게시글 수 숫자 들어갈 자리*/}</Text>
                    </View>
                    <View style={styles.infotext}>
                        <Text style={styles.infotextstyle}>게시글 수</Text>
                    </View>
                </View>


            {/* 포인트 현황 */}
                <View style={styles.infobox}>
                    <View style={styles.infoimg}>
                        <Image source={coin} style={{width:100, height:100, marginTop:"10%"}}/>
                    </View>
                    <View style={styles.infotext}>
                        <Button
                            containerStyle={{
                                bottom:"3.5%"
                            }}
                            title="포인트 현황"
                            type="clear"
                            titleStyle={{ color: 'black' }}
                            onPress={() =>{
                                // navigation.navigate("AnimalList") -> 포인트 현황 보러가는 곳으로 바꿔줘야 함
                                }} 
                            />
                    </View>
                </View>
            </View>


            {/* 포인트 보이기 */}
            <View style={styles.box2}>
                <View style={styles.mypointbox}>
                    {/*db에서 값 꺼내오고 넣어주기*/}
                    <Text style={styles.mypointtext}>내 포인트: {'50point'}</Text> 
                </View>
                <View style={styles.androidbox}>
                    <View style={styles.example}>
                        <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5} //1등%만 보이니까 0으로 고정 / 실제 코드 밑에있는 주석으로 바꿔야 됌.

                        //   progress={rdata.length !=0?rdata[0].totalPoint/100:null} //1등%만 보이니까 0으로 고정
                        />
                    </View>
                </View>
            </View>


            {/* 정보 더보기 */}
            <View style={styles.box3}>
                <View style={styles.nextinfo}>
                    <Text>
                        정보 더보기
                    </Text>
                </View>
                <View style={styles.buttonbox}>

                    <View style={styles.buttonback}>
                        <Text style={styles.buttontext}  
                            onPress={() => {
                                navigation.navigate("MyInfo", {
                                    info : [id, pw, name, nickname, phone, address, detailaddress, location_Num, check, point],
                                    title : "user Info"
                                })
                            }}>
                            상세 정보 페이지
                        </Text>
                       
                    </View>

                    <View style={styles.buttonback}>
                        <Text style={styles.buttontext}  
                           onPress={() =>{
                            navigation.navigate("AnimalList")
                         }} >
                            애완동물정보
                        </Text>
                    </View>

                    <View style={styles.buttonback}>
                        <Text style={styles.buttontext}onPress={() =>{
                            // navigation.navigate("AnimalList") -> 알람 페이지 넣어주기
                         }}>
                            알람설정 - no!!!
                        </Text>
                    </View>

                    <View style={styles.buttonback}>
                        <Text style={styles.buttontext}
                        onPress={() =>{
                            navigation.navigate("CalenderMain")
                         }}>
                            캘린더
                        </Text>
                    </View>

                    <View style={styles.buttonback}>
                        <Text style={styles.buttontext}>
                            놀아주기
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EBE3D7"
    },
    pointbox:{
        flex: 2,
        // borderWidth:1,
        flexDirection: 'row',
        marginHorizontal:"3%",
        marginTop:"6%",
        borderWidth:3,
        borderColor:"#b8997c",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor:"white"
    },
    infobox:{
        flex:1,
        flexDirection: 'column',
        // borderWidth:1,
        
    },
    infoimg:{
        flex:2,
        // borderWidth:1,
        // borderColor:'blue',
        justifyContent: "center",
        alignItems: "center"
    },
    infotext:{
        flex:1,
        // borderWidth:1,
        borderColor:'green',
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"10%"
        
    },
    infodbnum:{
        fontSize:50,
        marginTop:"5%"

    },
    infotextstyle:{
        fontSize:17
    },
    box2:{
        flex:1
    },
    mypointbox:{
        marginHorizontal:"3%",
        marginTop:"3%",
    },
    mypointtext:{
        marginTop:"6%"
        // borderWidth:1
    },
    androidbox:{
        marginHorizontal:"3%",
        // borderTopWidth:3,
        // borderBottomWidth:3,
        // borderColor:'#EFEFEF',
    },
    example: {
        marginVertical: 10,
    },

    box3:{
        // borderWidth:1,
        flex:5, 
        width: '100%', 
        height: '70%', 
        marginTop:"2%"
        // backgroundColor:'lightgreen'
    },
    nextinfo:{
        marginHorizontal:"2%",
        marginTop:"6%",
        // borderWidth:1,
        width:"38%",
        // borderRadius: 50,
        // borderTopLeftRadius:50,
        // borderTopRightRadius:50,

    },
    buttonbox:{
        // backgroundColor:'#ffffff'
    },
    buttonback:{
        // padding: 10, 
        width: '100%', 
        // backgroundColor: 'red',
    },
    buttontext:{
        fontSize:20,
        // marginVertical:"10%",
        borderBottomWidth:1,
        margin:"3%",
        marginTop:"5%",
        color: '#F7931D',
        fontWeight: "bold",
        fontSize:18,
        borderColor:"#b8997c",

    }
});