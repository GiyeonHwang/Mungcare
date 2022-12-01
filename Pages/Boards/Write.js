import React, { useState } from 'react';
import axios from 'axios';
import {View, 
        Text, 
        SafeAreaView, 
        StyleSheet, 
        ScrollView, 
        TextInput , 
        Platform , 
        KeyboardAvoidingView,
        Alert,
        ImageStore,
        height,
        richTextHandle,
      Button} from 'react-native';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 세션

//사진 업로드
import * as ImagePicker from 'expo-image-picker';

export default function Write() {

  //bType
  const [bType,setbType] = useState('');
  const [bTitle,setBTitle] = useState('');
  const [bContent,setBContent] = useState('');

  // 세션 아이디 값 받아오기
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id')
      if(value !== null) {
          return value;
      }
    } catch(e) {
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

    axios.post('http://192.168.2.94:5000/board/write',null,{
      params:{
        bContent : bContent,
        bTitle : bTitle,
        bType : bType,
        id: id
      }
    })
    .then((res) => {
        console.log(res.data);
    })
  }

  const uploadImage = async () => {

    if(!status.granted){ // status로 권한이 있는지 확인
      const permission = await requestPermission();
      if(!permission.granted){
        return null;
      }
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      allowsEditing : false,
      quality : 1,
      aspect : [1,1]
    });

    if(result.canceled){
      return null;
    }

    const localUri = result.assets[0].uri;

    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename ?? '');
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('multipartFileList' , {uri: localUri, name: filename, type});

   
      

    console.log(formData);


    await axios({
      method : 'post',
      url : 'http://192.168.2.94:5000/upload',
      headers:{
        'content-type' : 'multipart/form-data',
      },
      data : formData
    })
    .then((res) => {
        richText.current.insertImage(res.data);
    })

    
 }
   // Callback after height change
   function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  return (
    <View style={styles.box}>
      <Button title="Press Me" mode="contained" onPress={write}/>
      <View style={{alignItems: 'center' , marginTop: "5%"}} >
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
      </View>
      <SafeAreaView style = {{marginTop : "3%" , backgroundColor : "red"}}> 

          {/* 제목입력 */}
        <TextInput
        style={styles.inputtitle}
        placeholder="제목을 입력해주세요."
        onChangeText={text => setBTitle(text)}
        />     
        

          {/* 에디터를 사용해서 글쓰기를 해보야요 ^^ */}
            <ScrollView usecontainer = {true} 
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}   style={{ flex: 1 }}>
                      {/* <RichEditor
                        ref={richText} // from useRef()
                        onChange={richTextHandle}
                        placeholder="Write your cool content here :)"
                        androidHardwareAccelerationDisabled={true}
                        style={styles.richTextEditorStyle}
                        onHeightChange={handleHeightChange}
                        initialHeight={600}
                      /> */}

                    <RichEditor  
                        containerStyle={{ minHeight: height }}
                        useContainer
                        editorStyle={{backgroundColor: "Skyblue"}}
                        ref={richText}
                        onChange={ text => setBContent(text)}
                    />

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
                                , actions.insertImage
                                , actions.insertVideo ]}
                      iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}  
                    />
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  box:{
    flex: 1,
    backgroundColor : 'yellow'
  },
    drop:{
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center', //세로로 가운데 갈 수 있게 해줌
    paddingHorizontal: 15
    },
    inputtitle: {
      
      height: 40,
      margin: 12,
      borderWidth: 1,
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
  });