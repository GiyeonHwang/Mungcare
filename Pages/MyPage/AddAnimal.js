import axios from 'axios';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import Modal from "react-native-modal";
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox


//navigation 사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


export default function AddAnimal(navigation) {

    const [aName, setAnimalName] = React.useState(""); //애완동물 이름
    const [aSex, setAnimalSex] = React.useState(""); //성별
    const [aBirth, setAnimalBirth] = React.useState(""); //생일
    const [aBreed, setAnimalBreed] = React.useState(""); //종류
    const [aNeat, setAnimalNeat] = React.useState(false); //중성화 여부

    const [errorMessage, setErrorMessage] = React.useState(""); //이름
    const [errorMessageSex, setErrorMessageSex] = React.useState(""); //성별
    const [errorMessageBirth, setErrorMessageBirth] = React.useState(""); // 생일
    const [errorMessageBreed, setErrorMessageBreed] = React.useState(""); // 종류

    const [okName, setOkName] = React.useState(false);
    const [okSex, setOkSex] = React.useState(false);
    const [okBirth, setOkBirth] = React.useState(false);
    const [okBreed, setOkBreed] = React.useState(false);

    const regiButton = () => {
        if (okName & okSex & okBirth & okBirth & okBreed & aNeat) {
            return false;
        }
        return true;
    }

    //애완동물 이름 정규식
    const validateName = aName => {
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-15|]{1,20}$/;
        return regex.test(aName);
    }
    //성별
    const validateSex = aSex => {
        const regex = /^[가-힣|0-2|]$/;
        return regex.test(aSex);
    }
    //생일
    const validateBirth = aBirth => {
        const regex = /^([0-9]{4})-?([0-9]{2})-?([0-9]{2})$/;
        
        return regex.test(aBirth);
    }
    //종류
    const validateBreed = aBreed => {
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|1-15|]{1,20}$/;
        return regex.test(aBreed);
    }

    //띄어쓰기 고로시
    const removespace = text => {
        const regex = /\s/g;
        return text.replace(regex, '');
    }
    //자동 하이픈 생성
    const autoHyphen = (target) => {
        return target.replace(/[^0-9]/g, '').replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }


    //애완동물 이름 핸들러
    const handleNameChange = (aName) => {
        const changeName = removespace(aName);
        setAnimalName(changeName);
        setErrorMessage(
            validateName(changeName) ? "올바른 형식입니다" : "애완동물의 이름은 한글과 영어만 가능합니다"
        );
        setOkName(validateName(changeName));
    };
    //애완동물 성별 핸들러
    const handleSexChange = (aSex) => {
        const changeSex = removespace(aSex);
        setAnimalSex(changeSex);
        setErrorMessageSex(
            validateSex(changeSex) ? "올바른 형식입니다" : "남, 여로만 가능합니다"
        );
        setOkSex(validateSex(changeSex));
    };
    //애완동물 생일 핸들러
    const handleBirthChange = (aBirth) => {
        const changeBirth = autoHyphen(aBirth);
        setAnimalBirth(changeBirth);
        setErrorMessageBirth(
            validateBirth(changeBirth) ? "올바른 형식입니다" : "생일을 올바르게 입력해주세요"
        );
        setOkBirth(validateBirth(changeBirth));
    };
    //애완동물 종류 핸들러
    const handleBreedChange = (aBreed) => {
        const changeBreed = removespace(aBreed);
        setAnimalBreed(changeBreed);
        setErrorMessageBreed(
            validateBreed(changeBreed) ? "올바른 형식입니다" : "한글, 영어로 15자 이하 가능합니다"
        );
        setOkBreed(validateBreed(changeBreed));
    };

    function insertAnimal() {
        //서버로 전송
        console.log(typeof(aBirth));
        console.log(aBirth);
        /*
        axios.post("http://192.168.2.94:5000/animal/write", null, {
            params : {
                a_name : aName,
                id:"user",
                a_birth : aBirth,
                a_breed : aBreed,
                a_neat : aNeat,
                a_sex : aSex,
            }
        })
        .then(function (res){
            console.log(res);
            console.log(res.data);
        })
        .catch(function (error){
            console.log(error)
        })*/

    }

    return (
        <SafeAreaView style={styles.box}>
            <ScrollView>
                <Text style={styles.text}>애완동물 이름</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleNameChange}
                    value={aName}
                    placeholder="이름"
                />
                <Text style={styles.text}>{errorMessage}</Text>
                <Text style={styles.text}>성별</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSexChange}
                    value={aSex}
                    placeholder="성별"
                />
                <Text style={styles.text}>{errorMessageSex}</Text>
                <Text style={styles.text}>생일</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleBirthChange}
                    value={aBirth}
                    keyboardType="number-pad"
                    placeholder="생일"
                />
                <Text style={styles.text}>{errorMessageBirth}</Text>
                <Text style={styles.text}>견종</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleBreedChange}
                    value={aBreed}
                    placeholder="견종"
                />
                <Text style={styles.text}>{errorMessageBreed}</Text>
                <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat} />
                <Text style={styles.paragraph}>중성화 여부</Text>

                <View style={styles.button}>
                    <Button
                        disabled={regiButton()}
                        color="#CCCCFF"
                        title="회원가입"
                        onPress={() => insertAnimal()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        marginTop: "15%",
        // marginHorizontal: 61,


    },
    input: {
        borderRadius: 8,
        height: 40,
        marginHorizontal: "5%",
        borderWidth: 1,
        padding: 10,
    },
    text: {
        marginTop: 12,
        marginLeft: "5%"
    },
    button: {
        marginTop: "5%",
        marginHorizontal: "5%",
        marginBottom: "5%"
    }

});
