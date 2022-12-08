import axios from 'axios';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import Modal from "react-native-modal";
import Checkbox from 'expo-checkbox';
import ServerPort from '../../Components/ServerPort';
//npm install expo-checkbox

//이미지 업로드
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage'


//navigation 사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const IP = ServerPort();

export default function AddAnimal({ navigation, route}) {
    const [id, setId] = React.useState(""); // 아이디
    const [check, setCheck] = React.useState(false);
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

    //갤러리 권한 요청이 되어있는지 확인
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [imguri, setImgUri] = React.useState("https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif");

    const regiButton = () => {
        if (okName & okSex & okBirth & okBirth & okBreed) {
            return false;
        }
        return true;
    }

    //애완동물 이름 정규식
    const validateName = aName => {
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-15|]{1,20}$/;
        return regex.test(aName);
    }

    //애완동물 이름 겹치는지 확인
    const checkName = aName => {
        axios.post(`${IP}/animal/check`, null, {
            params: {
                id: route.params.id,
                aName: aName
            }
        })
        .then(function(res) {
            setCheck(res.data);
            // check =res.data;
            console.log("------res: ",res.data);
            // return res.data;
            // if(res.data===true)
            //     return true
            // return res.data;
        })
        .then((res) => {
            console.log("id: ",route.params.id);
            console.log("aName: ",aName);
            console.log("-----check: ",check);
        }
        )
        .catch(function(error) {
            console.log("반려동물 이름 중복체크 실패- ",error);
        })
        console.log("hihi",check);
        return check;
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
        console.log("------checkName: ",checkName(changeName));
        console.log("------validateName: ",validateName(changeName));
        setAnimalName(changeName);
        setErrorMessage(
            validateName(changeName) && checkName(changeName) ? "올바른 형식입니다.1" : 
            (validateName(changeName) ? (checkName(changeName) ? "올바른 형식입니다.2" : "중복되는 이름입니다.")
             : "애완동물의 이름은 한글과 영어만 가능합니다")
            // validateName(changeName) ? "올바른 형식입니다" : "애완동물의 이름은 한글과 영어만 가능합니다",
            // checkName(changeName) ? "올바른 형식입니다." : "중복되는 이름입니다"
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

    const uploadImage = async () => {

        if (!status.granted) { // status로 권한이 있는지 확인
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1]
        });

        if (result.canceled) {
            return null;
        }
        console.log(result)
        setImgUri(result.uri);

        const localUri = result.assets[0].uri;

        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('multipartFileList', { uri: localUri, name: filename, type });




        console.log(formData);


        await axios({
            method: 'post',
            url: `${IP}/upload`,
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: formData
        })
            .then((res) => {
                console.log(res.data);
                setImgUri(res.data[0]);
            })


    }



    function insertAnimal() {
        //서버로 전송
        console.log(typeof (aBirth));
        console.log(aBirth);

        axios.post(`${IP}/animal/write`, null, {
            params: {
                id: "user",
                aName: aName,
                aSex: aSex,
                aBirth: aBirth,
                aBreed: aBreed,
                aNeat: aNeat,
                aPhoto: imguri
            }
        })
            .then(function (res) {
                console.log(res);
                console.log(res.data);

                Alert.alert("등록 완료!")
                navigation.navigate("MyPage");
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert("저장에 실패하였습니다")
            })

    }

    return (
        <SafeAreaView style={styles.box}>
            <ScrollView >


                <View sytle={{ alignContent: 'center', width: '100%', padding: 10, alignItems: 'center', }}>
                    <View style={{ padding: 20, alignContent: 'center', flexDirection: 'row' }}>
                        <View style={{ width: '50%', backgroundColor: 'yellow', alignItems: 'center', }}>
                            <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: imguri }} />
                        </View>

                        <View style={{ backgroundColor: 'red', width: '50%', justifyContent: 'center' }}>
                            <Button title='이미지 넣기' onPress={uploadImage}></Button>
                            <Text style={{ fontSize: 15 }}>* 사진은 수정할 수 없습니다.</Text>
                        </View>
                    </View>
                </View>


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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.section}>
                        <Checkbox style={styles.checkbox} value={aNeat} onValueChange={setAnimalNeat} />
                        <Text style={styles.paragraph}>중성화 여부</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        disabled={regiButton()}
                        color="#CCCCFF"
                        title="추가하기"
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
        alignContent: 'center',
        justifyContent: 'center'
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

});