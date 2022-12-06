import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Image, ProgressBarAndroid } from 'react-native';
import Constants from 'expo-constants';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

// 사진 import해줌
import coin from '../../assets/images/coin.png';

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
                <View style={styles.mypagebox}>
                    {/* <Text style={styles.mypagetext}>이곳은 MY PAGE입니다.</Text> */}
                    <Image source={coin} style={styles.mypageimg}/>
                    <View style={styles.mypagebox2}>
                        <Text style={styles.mypagename}>username</Text>
                        <View style={styles.mypagebox3}>
                            <Text style={styles.mypageinfo}>받은 좋아요</Text>
                            <Text style={styles.mypageinfo}>작성한 게시글</Text>
                            <Text style={styles.mypageinfo}>강아지 이름</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.box2}>
                <View>
                    <Text>내 포인트</Text>
                </View>
                <View style={styles.androidbox}>
                    <View style={styles.example}>
                        <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5} //1등%만 보이니까 0으로 고정

                        //   progress={rdata.length !=0?rdata[0].totalPoint/100:null} //1등%만 보이니까 0으로 고정
                        />
                    </View>
                </View>

            </View>
            
            








            <View style={{flex:5, width: '100%', height: '70%', backgroundColor: 'lightgreen' }}>
                <View style={{ padding: 30 }}>
                    <View style={{ padding: 10, width: '100%', backgroundColor: 'red', }}>
                        <Button title="상세 정보 페이지" onPress={() => {
                            navigation.navigate("MyInfo", {
                                info : [id, pw, name, nickname, phone, address, detailaddress, location_Num, check, point],
                                title : "user Info"
                            })
                        }}></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="애완동물정보" onPress={() =>{
                            navigation.navigate("AnimalList")
                        }} ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="알람설정 - no!!!" ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="켈린더" ></Button>
                    </View>
                    <View style={{padding:10, width:'100%', backgroundColor:'red'}}>
                        <Button title="놀아주기" ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pointbox:{
        flex: 2,
        borderWidth:1,
        marginHorizontal:"3%",
        marginTop:"3%"
    },
    mypagebox:{
        flexDirection: 'column',
        // margin:"5%",
        
    },
    mypagebox2:{
        flexDirection: 'row',
    },
    mypagebox3:{
        flexDirection: 'row',
        // margin:'2%'
        marginHorizontal:"2%"
    },
    mypagename:{
        fontweight:'bold',
        marginBottom:"30%",
        marginLeft:"5%"
        // marginHorizontal:"3%"
        // left:"2%"
    },
    mypageimg:{
        width:120,
        height:120,
        // bottom:"5%",
        // left:"80%",
        // marginBottom:"80%",

    },
    mypageinfo:{
        // borderWidth:1,
        marginLeft:'2%'
    },
    box2:{
        flex:1
    },
    androidbox:{
        marginHorizontal:"3%",

    },
    example: {
        marginVertical: 10,
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
        backgroundColor :"red",
        padding: 10,
        alignItems: 'center',
        width: 130,
    },
    info: {
        backgroundColor :"blue",
        padding: 10,
        width: 184,
        alignItems: 'center',
    },

});