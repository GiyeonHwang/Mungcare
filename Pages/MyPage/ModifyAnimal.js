import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

//동물 info가져오기
export default function AnimalDetail({ navigation, route }) {
    const [aName, setAnimalName] = React.useState(""); //애완동물 이름
    const [aSex, setAnimalSex] = React.useState(""); //성별
    const [aBirth, setAnimalBirth] = React.useState(""); //생일
    const [aBreed, setAnimalBreed] = React.useState(""); //종류
    const [aNeat, setAnimalNeat] = React.useState(""); //중성화 여부
    const [img, setImg] = React.useState(route.params.info[5]); // 이미지


    const [checkbool, setCheckBool] = React.useState(false);
    const [change, setChange] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(""); //이름
    const [errorMessageSex, setErrorMessageSex] = React.useState(""); //성별
    const [errorMessageBirth, setErrorMessageBirth] = React.useState(""); // 생일
    const [errorMessageBreed, setErrorMessageBreed] = React.useState(""); // 종류

    const [okName, setOkName] = React.useState(false);
    const [okSex, setOkSex] = React.useState(false);
    const [okBirth, setOkBirth] = React.useState(false);
    const [okBreed, setOkBreed] = React.useState(false);

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

    const check = () => {
        if (aName != route.params.info[0] || aSex != route.params.info[1] || aBirth != route.params.info[2] || aBreed != route.params.info[3] || aNeat != route.params.info[4]) {
            console.log("check")
            setCheckBool(true);
            insert();
        }
    }

    const insert = () => {
        console.log(checkbool);
        if (checkbool) {
            console.log("check is true")

            /*
            axios.post("http://192.168.2.94:5000/animal/modify", null, {
                params: {
                    aName: aName,
                    id: "user",
                    aBirth: aBirth,
                    aBreed: aBreed,
                    aNeat: aNeat,
                    aSex: aSex,
                }
            })
                .then(function (res) {
                    console.log(res);
                    console.log(res.data);
                    if (res.data === route.params.info[0]){
                        Alert.alert("수정 완료!")
                        setChange(true);
                        navigation.navigate("AnimalList")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
                */
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.title}> 애완동물 정보 수정</Text>
            <View style={styles.title}>
                <View style={{ padding: 10, }}>
                <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={{ padding: 10, width: "50%", alignItems: 'center', }}>
                            <View style={{ width: '50%', backgroundColor: 'yellow', alignItems: 'center', }}>
                                {
                                    img === null ? <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: "https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif" }} /> :
                                        <Image style={{ resizeMode: "cover", width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} source={{ uri: img }} />
                                }
                            </View>
                        </View>
                        <View style={{padding: 10, alignItems: 'center', width: "50%", justifyContent:'center'}}>
                            <Text style={{ fontSize: 15 }}>* 사진은 수정할 수 없습니다</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>이름</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleNameChange}
                                placeholder={route.params.info[0]}
                            />
                            <Text style={styles.text}>{errorMessage}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>성별</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleSexChange}
                                placeholder={route.params.info[1]}
                            />
                            <Text style={styles.text}>{errorMessageSex}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>생일</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleBirthChange}
                                placeholder={route.params.info[2]}
                            />
                            <Text style={styles.text}>{errorMessageBirth}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>견종</Text>
                        </View>
                        <View style={styles.info}>
                            {/* <Text style={{ fontSize: 15 }}>dfdfdf{aName}</Text> 
                                placeholder수정해줘야 함
                            */}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleBreedChange}
                                placeholder={route.params.info[3]}
                            />
                            <Text style={styles.text}>{errorMessageBreed}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>중성화 여부</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, width: "55%", alignItems: 'center', }}>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={route.params.info[4]} onValueChange={setAnimalNeat} />
                                <Text style={styles.paragraph}>중성화 여부</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Button 
                        disabled={regiButton()}
                        color="#CCCCFF"
                        onPress={() => insert()}
                        title="저장"  />
                </View>
            </View>
        </View>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
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
        padding: 10,
        alignItems: 'center',
        width: "45%",
    },
    info: {
        padding: 10,
        width: "55%",
        alignItems: 'center',
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
    input: {
        fontSize: 20
    },
});
