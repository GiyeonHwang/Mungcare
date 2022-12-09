import axios from 'axios';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import ServerPort from '../../Components/ServerPort';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import { RadioButton } from 'react-native-paper';

//이미지 업로드
import * as ImagePicker from 'expo-image-picker';



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
    const [aSex, setAnimalSex] = React.useState('남'); //성별
    const [aBirth, setAnimalBirth] = React.useState(""); //생일
    const [aBreed, setAnimalBreed] = React.useState(""); //종류
    const [aNeat, setAnimalNeat] = React.useState(false); //중성화 여부

    const [errorMessage, setErrorMessage] = React.useState(""); //이름
    const [errorMessageBreed, setErrorMessageBreed] = React.useState(""); // 종류

    const [okName, setOkName] = React.useState(false);
    const [okBirth, setOkBirth] = React.useState(false);
    const [okBreed, setOkBreed] = React.useState(false);

    //데이트 피커
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setAnimalBirth(moment(date).format('YYYY-MM-DD'));
        setOkBirth(true);

        hideDatePicker();
      };

    //갤러리 권한 요청이 되어있는지 확인
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [imguri, setImgUri] = React.useState("https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif");

    const regiButton = () => {
        if (okName  & okBirth & okBreed) {
            return false;
        }
        return true;
    }

    //애완동물 이름 정규식
    const validateName = aName => {
        const regex = /^[가-힣|a-z|A-Z|0-15|]{1,20}$/;
        return regex.test(aName);
    }

    //애완동물 이름 겹치는지 확인
    const checkName = () => {
        axios.post(`${IP}/animal/check`, null, {
            params: {
                id: route.params.id,
                aName: aName
            }
        })
        .then(function(res) {
            setCheck(res.data);
            console.log("------res: ",res.data);
            if(res.data === true)
            {
                Alert.alert("중복확인 되었습니다.");
                setOkName(true); // 버튼 활성화
            }
        })
        .catch(function(error) {
            console.log("반려동물 이름 중복체크 실패- ",error);
        })
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


    //애완동물 이름 핸들러
    const handleNameChange = (aName) => {
        setOkName(false); //이름이 바뀌면 이름 중복확인은 다시 바뀌어야 한다.
        const changeName = removespace(aName);
        setAnimalName(changeName);
        setErrorMessage(
             validateName(changeName) ? "올바른 형식입니다" : "애완동물의 이름은 한글과 영어만 가능합니다",
        );
        setOkName(validateName(aName));
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
                route.params.animalList(route.params.id)
                navigation.navigate("AnimalList");
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

                <View style = {styles.overlapContainer}>
                    <Text style={styles.text}>애완동물 이름</Text>
                    <TouchableOpacity 
                    disabled = {!okName}
                    style = {styles.overlapButton} 
                    onPress = {() => checkName()}
                    >
                        <Text style = {styles.overlapButtonText}>
                        중복확인  
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleNameChange}
                    value={aName}
                    placeholder="이름"
                />
                <Text style={styles.text}>{errorMessage}</Text>
                <Text style={styles.text}>성별</Text>
                <View style = {{marginTop : '3%'}}>
                    <View style = {styles.sexContainer}>
                        <Text>남</Text>
                        <RadioButton
                            value="남"
                            status={ aSex === '남' ? 'checked' : 'unchecked' }
                            onPress={() => setAnimalSex('남')}
                        />
                        <Text>여</Text>
                        <RadioButton
                            value="여"
                            status={ aSex === '여' ? 'checked' : 'unchecked' }
                            onPress={() => setAnimalSex('여')}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.text}>생일</Text>
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <TextInput
                    style={styles.input}
                    editable={false}
                    value={aBirth}
                    placeholder="생일"
                />
                </TouchableOpacity>
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
    overlapContainer : {
        flexDirection: 'row' ,
        justifyContent: 'flex-start' , 
        height : '5%'
    },
    overlapButton: {
        height : "100%",
        width : "15%",
        borderRadius : 15,
        backgroundColor : "#3AB5A9",
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : "3%"
    },
    overlapButtonText : {
        color : '#fff',
        fontWeight : 'bold',
        textAlign: 'center',
    },
    sexContainer : {
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft : '5%'
    }


});