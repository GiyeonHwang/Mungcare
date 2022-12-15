import React, { useState, useEffect } from 'react';
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
  richTextHandle,
  Button, Dimensions, BackHandler
} from 'react-native';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormData from 'form-data';
import { CommonActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 세션
import ServerPort from '../../Components/ServerPort';

//사진 업로드
import * as ImagePicker from 'expo-image-picker';

export default function Write({ navigation }) {

  const IP = ServerPort();
  //bType
  const [bType, setbType] = React.useState('자유게시판');
  const [bTitle, setBTitle] = React.useState('');
  const [bContent, setBContent] = React.useState('');

  React.useEffect(() => {
    setBTitle('');
    setBContent('');
    richText.current.setContentHTML("");
  }, [])

  // 세션 아이디 값 받아오기
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id')
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log("not session");
    }
  }


  // select 관련임
  const countries = ["자유게시판", "찾아줘게시판", "자랑게시판", "기부게시판"];

  //에디터 관련
  const richText = React.useRef();
  //갤러리 권한 요청이 되어있는지 확인
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const write = async () => {

    const id = await getData();

    axios.post(`${IP}/board/write`, null, {
      params: {
        bContent: bContent,
        bTitle: bTitle,
        bType: bType,
        id: id
      }
    })
      .then((res) => {
        console.log("수정서버에서 온 데이터:", res.data);
        if (res) {
          Alert.alert("작성완료");
          setBTitle('');
          setBContent('');
          richText.current.setContentHTML("");
          navigation.navigate("Main");
        }
      })
  }

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
        richText.current.insertImage(res.data);
      })

  }

  const CancleAction = () => {

    setBTitle('');
    setBContent('');
    richText.current.setContentHTML("");
    navigation.navigate("Main")
  }



  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="글 작성" color='black' onPress={() =>
          Alert.alert("잠깐만요!", "작성하실껀가요?", [
            {
              text: "취소",
              onPress: () => null,
            },
            {
              text: "작성", onPress: () => {
                write();
              }
            }
          ])
        } />
      ),
    });
  })


  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("잠깐만요!", "글작성을 취소하시겠어요?\n모든 작성내용이 사라집니다!", [
          {
            text: "계속 작성하기",
            onPress: () => null,
          },
          {
            text: "작성 취소하기", onPress: () => { CancleAction() }
          }
        ]);
        return true;
      };


      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();

    }))

  console.log("현재 제목내용", bTitle);
  console.log("현재 내용", bContent);

  return (
    <ScrollView boxStyles={{ borderRadius: 0 }}>
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          if (selectedItem == '자유게시판') {
            setbType('자유게시판');
          }
          else if (selectedItem == '찾아줘게시판') {
            setbType('찾아줘게시판');
          }
          else if (selectedItem == '자랑게시판') {
            setbType('자랑게시판');
          }
          else if (selectedItem == '기부게시판') {
            setbType('기부게시판');
          }
        }}
        defaultValue={countries[0]}
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
        style={{ width: Dimensions.get('window').width * 1, height: Dimensions.get('window').height * 0.06, borderWidth: 0, borderBottomWidth: 1, padding: 15 }}
        placeholder="제목을 입력해주세요."
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
        onChange={text => setBContent(text)}
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