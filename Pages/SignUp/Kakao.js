import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

// other import settings...
const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({navigation}) => {
    const [val, setVal] =useState();
    const [userdata, setuserData] = useState();
    
    const id = "74dcd7c8555b0f1c9d94f04c363cdbed";
    const redirect ="http://192.168.2.94:5000";

    function LogInProgress(data) {
        console.log("loginProgress");
        console.log(data);
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        const exp = "code=";
        var condition = data.indexOf(exp);
        console.log("code=",condition);

        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            console.log("access code :: " + request_code);
            // 토큰값 받기
            requestToken(request_code);
        }
    };



    const requestToken = async (request_code) => {
        var returnValue = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";
        console.log(request_code);
        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: id,
                redirect_uri: redirect,
                client_secret:'GPRmgKG1aipbEtHeENEQSiY4b76XR22A', //있어도 되고 없어도 됨
                code: request_code,
            },
        }).then(function (response) {
            console.log(response.data); //값 모두 출력
            console.log(response.data.access_token); //토큰 출력
            returnValue = response.data.access_token; //변수에 저장
            console.log("Bearer "+ response.data.access_token)   // 헤더에 넣을 내용 잘나오는지 확인
            
            const request = "https://kapi.kakao.com/v2/user/me" //사용자의 정보가져올 때 쓰는 링크?
            
            axios({
                method:"post", //post방식으로
                url : request, // 위 링크를 요청함
                headers:{
                    "Authorization": "Bearer "+response.data.access_token //토큰을 넣음
                },
            }).then(function(response){
                console.log(response) // 받은 데이터를 모두 출력
                console.log(response.data.kakao_account.email)
                console.log(response.data.properties.nickname)
                navigation.navigate("Join",{
                    info:[response.data.kakao_account.email, response.data.properties.nickname]
                }) // 회원가입 페이지로 이동
            })

        }).catch(function (error) {
            console.log('error', error);
        });

    };
    

    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <Text>dfdffd</Text>
            <Text>dfdffd</Text>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                source={{uri : 'https://kauth.kakao.com/oauth/authorize?client_id='+id+'&redirect_uri='+redirect+'&response_type=code'}}
                injectedJavaScript={runFirst}
                javaScriptEnabled={true}
                onMessage={(event) => { 
                    console.log('event',event.nativeEvent);
                    LogInProgress(event.nativeEvent['url'])}}
            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
            />
        </View>
    );
};



export default KakaoLogin;

const styles = StyleSheet.create({
    container: {
        flex:1, 
        width:Dimensions.get('window').width, 
        height:Dimensions.get('window').height *1 , 
        justifyContent:'center'
    },
})
