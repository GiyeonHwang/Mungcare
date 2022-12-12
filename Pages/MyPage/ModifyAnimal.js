import axios from 'axios';
import React from "react";
import { Text, View, StyleSheet, Button, Alert, Image , TouchableOpacity} from 'react-native';
import Checkbox from 'expo-checkbox';
//npm install expo-checkbox
import { RadioButton } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import ServerPort from '../../Components/ServerPort';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function ModifyAnimal({ navigation, route }) {

    const [aName, setAnimalName] = React.useState(route.params.animalData.aname); //애완동물 이름
    const [aSex, setAnimalSex] = React.useState(""); //성별
    const [aBirth, setAnimalBirth] = React.useState(""); //생일
    const [aBreed, setAnimalBreed] = React.useState(""); //종류
    const [aNeat, setAnimalNeat] = React.useState(""); //중성화 여부
    const [img, setImg] = React.useState(route.params.animalData.aphoto); // 이미지

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

    const regiButton = () => {
        if (okName  & okBirth & okBreed) {
            return false;
        }
        return true;
    }

    //애완동물 이름 정규식
    const validateName = aName => {
        const regex = /^[|가-힣|a-z|A-Z|0-15|]{1,20}$/;
        return regex.test(aName);
    }
    //종류
    const validateBreed = aBreed => {
        const regex = /^[|가-힣|a-z|A-Z|1-15|]{1,20}$/;
        return regex.test(aBreed);
    }

    //띄어쓰기 고로시
    const removespace = text => {
        const regex = /\s/g;
        return text.replace(regex, '');
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

    //애완동물 종류 핸들러
    const handleBreedChange = (aBreed) => {
        const changeBreed = removespace(aBreed);
        setAnimalBreed(changeBreed);
        setErrorMessageBreed(
            validateBreed(changeBreed) ? "올바른 형식입니다" : "한글, 영어로 15자 이하 가능합니다"
        );
        setOkBreed(validateBreed(changeBreed));
    };

    function update() {
        console.log("check is true")

        axios.post(`${IP}/animal/modify`, null, {
            params: {
                aName: aName,
                id: route.params.animalData.id ,
                aBirth: aBirth,
                aBreed: aBreed,
                aNeat: aNeat,
                aSex: aSex,
            }
        })
        .then(res => {
            console.log(res.data);
                Alert.alert("수정 완료!")
                navigation.navigate("AnimalList")
        })
        .catch(function (error) {
            console.log("수정 실패---",error)
        })
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
                            <TextInput
                                style={styles.input}
                                onChangeText={handleNameChange}
                                placeholder={route.params.animalData.aname}
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
                        <View style={styles.sexContainer}>
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
                    </View>
                </View>
                <TouchableOpacity onPress = {showDatePicker}>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>생일</Text>
                        </View>
                        <View style={styles.info}>
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
                                placeholder={route.params.animalData.abirth}
                                />
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={{ padding: 10, }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', width: '100%' }}>
                        <View style={styles.infoName}>
                            <Text style={{ fontSize: 20 }}>견종</Text>
                        </View>
                        <View style={styles.info}>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleBreedChange}
                                placeholder={route.params.animalData.abreed}
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
                                <Checkbox style={styles.checkbox} value={route.params.animalData.aneut} onValueChange={setAnimalNeat} />
                                <Text style={styles.paragraph}>중성화 여부</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Button 
                        disabled={regiButton()}
                        color="#CCCCFF"
                        onPress={() => update()}
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
        backgroundColor:"#EBE3D7"
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        backgroundColor: '#EBE3D7',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        borderBottomWidth:1
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
    sexContainer : {
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft : '5%'
    },
});
