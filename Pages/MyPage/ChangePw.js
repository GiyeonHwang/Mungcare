import { View , StyleSheet , Text , TextInput , Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ServerPort from "../../Components/ServerPort";
import { Alert } from "react-native";
import axios from "axios";

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
            <View style = {{borderWidth:1}}>
                <Text>변경할 비밀번호</Text>
                <TextInput
                    onChangeText={(e) => handlePwChange(e)}
                    placeholder='변경할 비밀번호 입력'
                />
                <Text>{errorMessagePw}</Text>
            </View>
            <View style = {{borderWidth:1}}>
                <Text>변경 비밀번호 확인</Text>
                <TextInput
                    onChangeText={(e) => handlePwEqChange(e)}
                    placeholder='변경할 비밀번호 확인'
                />
                <Text>{errorMessagePw2}</Text>
            </View>

            <Button 
            disabled={okChangePw()}
            onPress={changePw}
            title='비밀번호 변경'
            />
            <Button
            title='취소'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: "RED",
        alignItems: "center",
        justifyContent: "center",
    }
})