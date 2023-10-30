import { View , StyleSheet , Text , TextInput , Button, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ServerPort from "../../Components/ServerPort";
import { Alert } from "react-native";
import axios from "axios";

// 아이콘 import해줌
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ChangePw({navigation}){

    const IP = ServerPort();
    const [newPw1,setNewPw1] = React.useState("") // 변경할 비밀번호
    const [newPw2,setNewPw2] = React.useState("") // 변경할 비밀번호 확인
    const [errorMessagePw,setErrorMessagePw] = React.useState("")
    const [errorMessagePw2,setErrorMessageEq] = React.useState("")
    const [okPw1,setOkPw1] = React.useState("") 
    const [okPw2,setOkPw2] = React.useState("") 

    const okChangePw = () => {
        if (okPw1 & okPw2 == true) {
    
          return false;
        }
        return true;
    }

    //패스워드 정규식
    const validatePw = pw => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pw);
    }

    //패드워드 같은지
    const validateEq = eq => {
    if (eq === newPw1) { return true; }
    else { return false; }
    }

    //띄어쓰기 고로시
    const removespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
    }

    //비밀번호 핸들러
    const handlePwChange = (pw) => {
        const changedPw = removespace(pw);
        setNewPw1(changedPw);
        setErrorMessagePw(
        validatePw(changedPw) ? "올바른 비밀번호 형식입니다." : "영어 한개이상 숫자 한개 이상 특수문자 한개이상 8자리 이상."
        );
        setOkPw1(validatePw(changedPw));
    }

    //비밀번호 확인 핸들러
    const handlePwEqChange = (eq) => {
        const changedPwEq = removespace(eq);
        setNewPw2(changedPwEq);
        setErrorMessageEq(
        validateEq(changedPwEq) ? "비밀번호가 일치합니다." : "비밀번호가 다릅니다!"
        );
        setOkPw2(validateEq(changedPwEq));
    }

    async function changePw(){

        const ID = await AsyncStorage.getItem('id');

        console.log("아이디 : ",ID)
        console.log("비밀번호 : ",newPw1)

        // 비밀번호 변경
        await axios.post(`${IP}/member/myPwChange`,null,{
            params:{
                id : ID,
                pw : newPw1
            }
        })
        .then(res => {
            console.log("비밀번호 변경 결과 : ",res.data)
            if(res.data == false)
            {
                Alert.alert("비밀번호 변경 실패")
                return
            }
            Alert.alert("비밀번호가 변경되었습니다.")
            navigation.navigate("MyPage");
        })
        .catch(e => {
            console.log("changePw 오류")
        })
    }

    return(
        <View style = {styles.container}>
            <View style={styles.warning}>
                <Icon name="exclamation-triangle" size={70} color="#F7931D" style={{marginTop:"15%",  marginBottom:"5%" , borderWidth:1, borderColor:'#EBE3D7'}} />

                <Text style={{fontWeight: "bold", fontSize:20, marginBottom:"5%"}}>
                    비밀번호 변경 시 주의사항!
                </Text>
                <Text style={{alignItems: "center", justifyContent: "center",}}>
                    형식에 맞춰서 비밀번호 변경을 해주세요. 
                </Text>
                <Text style={styles.hidden}>
                    ex)영어 한개이상 숫자 한개 이상 특수문자 한개이상 8자리 이상
                </Text>
            </View>

            <View style={{bottom:"20%"}}>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => handlePwChange(e)}
                        placeholder='변경할 비밀번호 입력'
                    />
                </View>
                <Text style={styles.hidden}>{errorMessagePw}</Text>
            
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => handlePwEqChange(e)}
                        placeholder='변경할 비밀번호 확인'
                    />
                </View>
                <Text style={styles.hidden}>{errorMessagePw2}</Text>
               

            </View>

            <View style={{flex:1,flexDirection: 'row',}}>
                <TouchableOpacity 
                style={styles.loginBtn}
                disabled={okChangePw()}
                onPress={changePw}
                >
                <Text style={styles.whiteColor}>비밀번호 변경</Text>
                </TouchableOpacity>
            </View>
            

            {/* <Button 
            disabled={okChangePw()}
            onPress={changePw}
            title='비밀번호 변경'
            /> */}
            {/* <Button
            title='취소'
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.06,
        backgroundColor:"#EBE3D7",
        alignItems: "center",
        justifyContent: "center",
    },
    warning:{
        alignItems: "center", 
        justifyContent: "center",
        marginBottom:"45%"
    },
    inputView:{
        borderBottomWidth:1,
        width: Dimensions.get('window').width * 0.9,
        marginBottom:"2%"
    },
    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#b8997c",
        bottom:"20%",
    },
    whiteColor: {
        color: "#ffffff"
    },
    hidden:{
        fontSize:10,
        marginBottom:'1%', 
        marginTop:'1%', 
        color:"gray"
    }
  
})