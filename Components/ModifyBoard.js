import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Alert,
    ImageStore,
    height,
    richTextHandle, Dimensions,
    Button
} from 'react-native';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 세션

//사진 업로드
import * as ImagePicker from 'expo-image-picker';

export default function ModifyBoard({route}) {
    //셀렉트 목록
    const boards = ["자유게시판", "찾아줘게시판", "자랑게시판", "기부게시판"]
    //에디터 관련
    const richText = React.useRef();
    const [descHTML, setDescHTML] = useState("");
    const [showDescError, setShowDescError] = useState(false);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    //서버에 전송할 변수
    const [bNo,setbNo] = useState('');
    const [bType,setbType] = useState('자유게시판');
    const [bTitle,setBTitle] = useState('');
    const [bContent,setBContent] = useState('');
    

    //이전 디테일 페이지에서 보낸 라우트 변수들을 넣어서 텍스트에디터에 띄워줌
    React.useEffect(() => { 
        setbNo(route.params.bno);
        setBTitle(route.params.btitle);
        setBContent(route.params.bContent);
    },[])

    const uploadImage = async () => { //이미지 셀렉터
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
        const localUri = result.assets[0].uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('multipartFileList', { uri: localUri, name: filename, type });

        await axios({
            method: 'post',
            url: 'http://192.168.2.94:5000/board/modify',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: formData
        })
            .then((res) => {
                richText.current.insertImage(res.data);
            })
    }

    
    return (
        <ScrollView boxStyles={{ borderRadius: 0 }}>
            <SelectDropdown
                data={boards}
                onSelect={(selectedItem, index) => {
                    if(selectedItem == '자유게시판'){
                    setbType('자유게시판');
                    }
                    else if(selectedItem == '찾아줘게시판'){
                    setbType('찾아줘게시판');
                    }
                    else if(selectedItem == '자랑게시판'){
                    setbType('자랑게시판');
                    }
                    else if(selectedItem == '기부게시판'){
                    setbType('기부게시판');
                    }
                }}
                defaultValue={boards[0]}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <TextInput
                style={{ width: Dimensions.get('window').width * 1, height: Dimensions.get('window').height * 0.06, borderWidth: 0, borderBottomWidth: 1 }}
                placeholder="    제목을 입력해주세요."
                value={bTitle}
                onChangeText={text => setBTitle(text)}
            />
            <RichToolbar
                editor={richText}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                onPressAddImage={uploadImage}
                actions={[
                    actions.insertImage,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.setStrikethrough,
                    actions.setUnderline,
                ]}
                style={{ height: Dimensions.get('window').height * 0.06 }}
            />
            <RichEditor
                ref={richText} // from useRef()
                value={bContent}
                onChange={ text => setBContent(text)}
                placeholder="내용을 적어주세요"
                androidHardwareAccelerationDisabled={true}
                style={{ height: Dimensions.get('window').height * 0.65 }}
                initialHeight={Dimensions.get('window').height * 0.65}
            />


        </ScrollView>

    );
}
const styles = StyleSheet.create({


    dropdown1BtnStyle: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.06,
        backgroundColor: '#FFF',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#444',
        justifyContent: 'center',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

    container: {
        alignItems: "center",
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').height * 0.35,
        marginBottom: 20,
        marginTop: 5,
        padding: 5,

    },
    imageView: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderWidth: 3,
        borderBottomWidth: 0,
        height: "70%",
        borderColor: "black"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    contentBox: {
        alignItems: "center",
        width: "100%",
        height: "40%",
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: "black",
        backgroundColor: "#F1E7DD",
        padding: 10
    },
    title: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
        height: "30%",
        backgroundColor: "#F1E7DD"
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 10
    },
    content: {
        width: "100%",
        height: "50%",
        backgroundColor: "#F1E7DD"
    },
    bottomContent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
        height: "20%",
        backgroundColor: "#F1E7DD"
    },
})