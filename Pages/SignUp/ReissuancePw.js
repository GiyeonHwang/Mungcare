import { Text , TextInput , StyleSheet , View, Button, Alert, Dimensions, TouchableOpacity} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import axios from 'axios';
import ServerPort from '../../Components/ServerPort';

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
export default function ReissuancePw({navigation}){
    
    const IP = ServerPort();
    const [email,setEmail] = React.useState("") // 아이디
    const [name,setName] = React.useState("") // 비밀번호

    //이메일을 입력하면 비밀번호를 변경
    async function changePw(){

        console.log("이메일 : ",email)
        console.log("이름 : ",name)

        const changePw = Math.random().toString(36).slice(2)+"@" // 랜덤 난수
        console.log("랜덤 비밀번호 : ",changePw)

        //해당 유저가 있는지 확인
        await axios.post(`${IP}/member/changeUser`,null,{
            params:{
                id : email,
                name : name
            }
        })
        .then(res => {
            console.log("아이디 확인 결과 : ",res.data)
            if(res.data == false)
            {
                Alert.alert("해당하는 아이디가 없습니다.")
                return
            }
        })
        .catch(e => {
            console.log("UserCheck 오류")
        })

        // 비밀번호
        await axios.post(`${IP}/member/changePw`,null,{
            params:{
                id : email,
                pw : changePw,
                name : name
            }
        })
        .then(res => {
            console.log("비밀번호 변경 결과 : ",res.data)
            if(res.data == false)
            {
                Alert.alert("비밀번호 변경 실패")
                return
            }

        })
        .catch(e => {
            console.log("changePw 오류")
        })
    }


    return(
        <View style={styles.container} >
          
            <TouchableOpacity
                style={{right:'20%',top:'3%', marginBottom:"60%"}}
                onPress={() => navigation.navigate("Login")}>
                      <View style={{flexDirection: 'row',}}>
                        <Icon name="keyboard-backspace" size={40} color="#00000" style={{marginTop:"12%", marginRight:"5%"}} />
                        <Text style={{marginTop:"12%", marginLeft:"5%", fontSize:20}}>비밀번호 찾기</Text>
                    </View>
                
            </TouchableOpacity>

            <View style={styles.inputView}>
                <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => setEmail(e)}
                        placeholder='이메일 입력'
                    />
            </View>
            <View style={styles.inputView}>
                <TextInput
                     style={styles.textInput}
                    onChangeText={(e) => setName(e)}
                    placeholder='이름 입력'
                />
            </View>
            <View style={{flex:1,flexDirection: 'row',}}>
                <TouchableOpacity 
                style={styles.loginBtn}
                onPress={changePw}
                >
                <Text style={styles.whiteColor}>비밀번호 재발급</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity 
                style={styles.loginBtn}
                >
                <Text style={styles.whiteColor}>취소</Text>
                </TouchableOpacity> */}
            </View>

           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#e9e9e9",
        alignItems: "center",
        // justifyContent: "center",
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.06,
        backgroundColor:"#EBE3D7"
    },
    pw:{
        marginBottom:"5%"

    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        // flex:0.13,
        backgroundColor: "#ffc0cb",
        borderRadius: 30,
        width: "70%",
        // height: 45,
        marginBottom: 20,
        // bottom:"5%",
        alignItems: "center",
    },
    textInput: {
        height: 50,
        // flex: 1,
        padding: 10,
        // marginLeft: 10,
        // justifyContent: "center",
        // alignItems: "center"
    },
    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ff1493",
        bottom:"10%",
    },
    whiteColor: {
        color: "#ffffff"
    }
    
})