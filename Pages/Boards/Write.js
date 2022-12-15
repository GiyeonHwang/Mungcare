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
    //내가 가진 파일의 주소
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

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
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
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.dropbutton} >
          {/* 게시판 선택하는 곳 */}
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setbType(selectedItem);
            }}
            defaultValue = {countries[0]}
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
          <View style={styles.Button2}>
            <Button title="등록" mode="contained" onPress={write} color={'#3AB5A9'}/>
          </View>
        </View>

        <SafeAreaView style = {{marginTop : "3%" , backgroundColor : "#EBE3D7", flex:1}}> 

          

            {/* 제목입력 */}
          <TextInput
          style={styles.inputtitle}
          placeholder="제목을 입력해주세요."
          onChangeText={text => setBTitle(text)}
          />      
          <ScrollView>
          <RichEditor
                
            ref={richText} // from useRef()
            onChange={richTextHandle}
            placeholder="Write your cool content here :)"
            androidHardwareAccelerationDisabled={true}
            onHeightChange={handleHeightChange}
            initialHeight={495}
          />

          </ScrollView>
                      
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}   style={{ flex: 1 }}>
              {/* 하단에 버튼 누르면 바뀌는 것들 */}
              <RichToolbar 
                    
                    editor={richText}
                    onPressAddImage = {uploadImage}
                    actions={[  actions.setBold
                              , actions.setItalic
                              , actions.setUnderline
                              , actions.heading1
                              , actions.insertBulletsList
                              , actions.insertOrderedList
                              , actions.insertImage ]}
                    iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}  
                  /> 
            </KeyboardAvoidingView>
              

        </SafeAreaView>

      </View>

    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  innerContainer:{
    flex:1,
  },
  box:{
    flex: 1,
    backgroundColor : '#EBE3D7', //아이보리
  },
  dropbutton:{
    flexDirection: 'row',//react native에서 사용되는 가로 정렬
    alignItems: 'center',
    //  marginTop: "10%"
  },
  Button2:{
    maring:'5%',
    right:'5%'
  },
    drop:{
    margin:"10%",
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center', //세로로 가운데 갈 수 있게 해줌
    paddingHorizontal: 15
    },
    inputtitle: {
      // flex:1, //flex있으면 글자 입력할 때 키보드에 밀려서 안 보인다
      height: 40,
      // margin: 12,
      borderWidth: 1,
      borderLeftWidth:0,
      borderRightWidth:0,
      padding: 10,
      
    },
    inputtext: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      
    },
 
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    margin:'3%'
    
  },
  scrollViewContainer:{
    height:'100%',
    borderColor:'green',
    borderWidth:2,

  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  });;