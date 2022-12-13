import { Text , TextInput , StyleSheet , View, Button, Alert} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import axios from 'axios';
import ServerPort from '../../Components/ServerPort';

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
        <View style = {styles.container}>
            <View style = {{borderWidth:1}}>
                <Text>아이디</Text>
                <TextInput
                    onChangeText={(e) => setEmail(e)}
                    placeholder='이메일 입력'
                />
            </View>
            <View style = {{borderWidth:1}}>
                <Text>이름</Text>
                <TextInput
                    onChangeText={(e) => setName(e)}
                    placeholder='이름 입력'
                />
            </View>
            <Button 
            onPress={changePw}
            title='비밀번호 재발급'
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