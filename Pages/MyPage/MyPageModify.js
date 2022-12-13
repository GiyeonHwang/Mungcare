import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Modal from "react-native-modal";
import Postcode from '@actbase/react-daum-postcode';
import ServerPort from '../../Components/ServerPort';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from 'react-native-gesture-handler';
const Stack = createStackNavigator();
const IP = ServerPort();
// 버튼 스타일npm install @rneui/themed <- 필요
import { Button } from '@rneui/themed';



export default function MyPage({ navigation, route }) {
    const [id, setId] = React.useState(route.params.info[0]); // 아이디
    const [pw, setPw] = React.useState(route.params.info[1]); // 비밀번호
    const [pwEq, setPwEq] = React.useState(""); // 비밀번호 확인
    const [name, setName] = React.useState(route.params.info[2]); // 이름
    const [nickname, setNickname] = React.useState(route.params.info[3]); //닉네임
    const [phone, setPhone] = React.useState(route.params.info[4]); // 전화번호
    const [address, onChangeAddress] = React.useState(route.params.info[5]); // 도로명 주소
    const [detail_Address, setDetailAddress] = React.useState(route.params.info[6]); // 상세 주소
    const [location_Num, onChangeLocationNum] = React.useState(route.params.info[7]); // 우편번호

    //해당 페이지 on , off
    const [isModal, setModal] = React.useState(false); // 도로명 주소 찾기 api 모달창 on,off
    const [detailEditable, setDetailEditable] = React.useState(false); // 도로명 주소가 입력되어야만 켜진다.  *이거 있어야 세부주소 회원가입 버튼 활성화 되게 해줄것.

    //회원가입 버튼 활설화
    const [okId, setOkId] = React.useState(false);
    const [okPw, setOkPw] = React.useState(false);
    const [okPwEq, setOkPwEq] = React.useState(false);
    const [okName, setOkName] = React.useState(false);
    const [okNickname, setOkNickname] = React.useState(false);
    const [okPhone, setOkPhone] = React.useState(false);
    const [okDetail, setOkDetail] = React.useState(false);

    //정규식 메시지 check
    const [errorMessage, setErrorMessage] = React.useState(""); //id
    const [errorMessagePw, setErrorMessagePw] = React.useState(""); // pw
    const [errorMessagePwEq, setErrorMessageEq] = React.useState(""); // pwEq
    const [errorMessageName, setErrorMessageName] = React.useState(""); // name
    const [errorMessageNickname, setErrorMessageNickname] = React.useState(""); // nickname 
    const [errorMessagePhone, setErrorMessagePhone] = React.useState(""); // phone
    const [errorMessageDetail, setErrorMessageDetail] = React.useState("");


    const regiButton = () => {
        if (okPw & okPwEq & okNickname & okName & okPhone & okDetail & detailEditable) {
          return false;
        }
        return true;
      }
    
      //아이디 정규식
      const validateId = id => {
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        return regex.test(id);
      }
    
      //패스워드 정규식
      const validatePw = pw => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(pw);
      }
    
      //패드워드 같은지
      const validateEq = eq => {
        if (eq === pw) { return true; }
        else { return false; }
      }
    
      //이름 정규식
      const validateName = name => {
        const regex = /^[가-힣]{2,20}$/;
        return regex.test(name);
      }
    
      //닉네임 정규식
      const validateNickname = nickname => {
        const regex = /^[가-힣a-zA-Z0-9]{2,20}$/;
        return regex.test(nickname);
      }
    
      //전화번호 정규식
      const validatePhone = phone => {
        const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        return regex.test(phone);
      }
    
      const validateDetail = detail_Address => {
        if (detail_Address !== "") { return true; }
        else { return false; }
      }
    
      //띄어쓰기 고로시
      const removespace = text => {
        const regex = /\s/g;
        return text.replace(regex, '');
      }
    
      //자동 하이픈 생성
      const autoHyphen = (target) => {
        return target.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
      }
    
      //아이디 핸들러
      const handleIdChange = (id) => {
        const changedId = removespace(id);
        setId(changedId);
        setErrorMessage(
          validateId(changedId) ? "올바른 아이디 형식입니다." : "이메일 형식을 확인해주세요."
        );
        setOkId(validateId(changedId));
      };
    
      //비밀번호 핸들러
      const handlePwChange = (pw) => {
        const changedPw = removespace(pw);
        setPw(changedPw);
        setErrorMessagePw(
          validatePw(changedPw) ? "올바른 비밀번호 형식입니다." : "영어 한개이상 숫자 한개 이상 특수문자 한개이상 8자리 이상."
        );
        setOkPw(validatePw(changedPw));
      }
    
      //비밀번호 확인 핸들러
      const handlePwEqChange = (eq) => {
        const changedPwEq = removespace(eq);
        setPwEq(changedPwEq);
        setErrorMessageEq(
          validateEq(changedPwEq) ? "비밀번호가 일치합니다." : "비밀번호가 다릅니다!"
        );
        setOkPwEq(validateEq(changedPwEq));
      }
      //이름 핸들러
      const handleNameChange = (name) => {
        const changedName = removespace(name);
        setName(changedName);
        setErrorMessageName(
          validateName(changedName) ? "올바른 이름 형식입니다." : "이름을 올바르게 입력해주세요."
        );
        setOkName(validateName(changedName));
      }
    
      //닉네임 핸들러
      const handleNicknameChange = (nickname) => {
        const changedNickname = removespace(nickname);
        setNickname(changedNickname);
        setErrorMessageNickname(
          validateNickname(changedNickname) ? "올바른 닉네임 형식입니다." : "2~20자리 특수문자 제외"
        );
        setOkNickname(validateNickname(changedNickname));
      }
    
      //전화번호 핸들러
      const handlePhoneChange = (phone) => {
        const changedPhone = autoHyphen(phone);
        setPhone(changedPhone);
        setErrorMessagePhone(
          validatePhone(changedPhone) ? "올바른 휴대전화 번호입니다" : "올바른 휴대전화 번호가 아닙니다."
        );
        setOkPhone(validatePhone(changedPhone));
      }
      // 상세주소
      const handleDetailChange = (detail_Address) => {
        setDetailAddress(detail_Address);
        setErrorMessageDetail(
          validateDetail(detail_Address) ? "" : "세부 주소를 입력해 주세요."
        );
        setOkDetail(validateDetail(detail_Address));
      }


    function update() {
        console.log("update");
        //update하기
        axios.post(`${IP}/member/modify`, null, {
            params : {
                id : id, //sessionStorage에 있는 id값
                pw : pw,
                name: name,
                nickname : nickname,
                phone : phone,
                address : address,
                detail_Address : detail_Address,
                location_Num: location_Num
            }
        })
        .then(function (res){
            console.log("수정 완료---")
            console.log(res.data);
            if(res.data) {
                Alert.alert("수정 완료!")
                route.params.mypageInfo(id)
                navigation.navigate("MyPage")
            }

        })
        .catch(function (error){
            console.log("수정 실패---", error)
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.title}>
                    <View style={styles.box}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>이메일(아이디)</Text>
                            </View>
                            <View style={styles.info}>
                                {/* 이메일은 수정X */}
                                <Text>{id}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>닉네임</Text>
                            </View>
                            <View style={styles.info}>
                                <TextInput
                                    style={styles.input}
                                    value={nickname}
                                    onChangeText={handleNicknameChange}
                                    placeholder="useless placeholder"
                                />
                                <Text style={styles.text}>{errorMessageNickname}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.infobox}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>이름</Text>
                            </View>
                            <View style={styles.info}>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={handleNameChange}
                                    placeholder="useless placeholder"
                                />
                                <Text style={styles.text}>{errorMessageName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>비밀번호</Text>
                            </View>
                            <View style={styles.info}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handlePwChange}
                                    value={pw}
                                    placeholder="useless placeholder"
                                />
                                <Text style={styles.text}>{errorMessagePw}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>비밀번호 확인</Text>
                            </View>
                            <View style={styles.info}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handlePwEqChange}
                                    value={pwEq}
                                    placeholder="useless placeholder"
                                />
                                <Text style={styles.text}>{errorMessagePwEq}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                            <View style={styles.infoName}>
                                <Text style={styles.infotext}>전화번호</Text>
                            </View>
                            <View style={styles.info}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handlePhoneChange}
                                    value={phone}
                                    placeholder="useless placeholder"
                                />
                                <Text style={styles.text}>{errorMessagePhone}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.addressbox}>
                        <TouchableOpacity onPress={() => setModal(true)}>
                            <Text style={styles.addressinfo}>우편번호</Text>
                            <TextInput
                                editable={false}
                                style={styles.input}
                                value={location_Num}
                                placeholder="우편번호"
                            />
                            <Text style={styles.addressinfo}>주소지</Text>
                            <TextInput
                                editable={false}
                                style={styles.input}
                                value={address}
                                placeholder="주소지 입력"
                            />
                            <Modal isVisible={isModal}>
                                <Postcode
                                    style={{ width: "100%", height: "80%" }}
                                    jsOptions={{ animation: true, hideMapBtn: true }}
                                    onSelected={data => { // 주소를 선택하면
                                        //  alert(JSON.stringify(data)); // 데이터가 제이손 형태
                                        console.log(JSON.stringify(data)); // 도로명 주소 콘솔로 출력
                                        onChangeLocationNum(data.zonecode); // 우편번호 기입
                                        onChangeAddress(data.address); // 주소명 기입
                                        setDetailEditable(true); // 상세 주소 활성화
                                        setModal(false); // 주소찾기 종료
                                    }}
                                />
                                <Button
                                    title="닫기"
                                    color="#3AB5A9"
                                    onPress={() => setModal(false)} // 도로명 주소찾기 강제 종료
                                />
                            </Modal>
                        </TouchableOpacity>
                        <Text style={styles.addressinfo}>세부주소</Text>
                        <TextInput
                            editable={detailEditable}
                            onChangeText={handleDetailChange}
                            style={styles.input}
                            value={detail_Address}
                            placeholder="세부 주소"
                        />
                        <Text style={styles.text}>{errorMessageDetail}</Text>
                    </View>
                    <View>
                         {/* <Button title="수정" onPress={() => Alert.alert('ModifyInfo 페이지로 변환')} /> */}
                         <Button
                            disabled={regiButton()}
                            type="outline"
                            
                            color="#CCCCFF"
                            title="저장"
                            onPress={() => update()}
                        />
                     
                    </View>
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
    box:{
        padding: 10,
    },
    infobox:{
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginTop:"0.5%"
        // width: '100%'
    },
    infotext:{
        fontSize: 20
    },
    infoName:{
        // backgroundColor: "red",
        // padding: 10,
        alignItems: 'center',
        width: 130,
    },
    info:{
        // backgroundColor: "blue",
        // pa     dding:4,
        width: 184,
        alignItems: 'center',
    },
    title: {
        marginTop: "5%",
        margin:"3%"
        // paddingVertical: 8,
        // borderWidth: 4,
        // borderColor: '#20232a',
        // borderRadius: 6,
        // backgroundColor: '#61dafb',
        // color: '#20232a',
        // textAlign: 'center',
        // fontSize: 30,
        // fontWeight: 'bold',
        
    },
    // infoName: {
    //     backgroundColor: "red",
    //     padding: 10,
    //     alignItems: 'center',
    //     width: 130,
    // },
    // info: {
    //     // width: 184,
    //     // alignItems: 'center',
    //     // backgroundColor: "blue",
    //     padding: 9,
    //     width: 184,
    //     alignItems: 'center',
    // },
    input: {
        // width: '100%',
        // borderWidth: 1,
        // padding: 10,
        // backgroundColor: "blue"
        fontSize: 15
    },
    inputinfo:{
        width:"100%"
    },
    addressbox:{
        marginHorizontal:'6%'
    },
    addressinfo:{
        marginTop:"3%",
    }
});
