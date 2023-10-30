import 'react-native-gesture-handler';
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
  richTextHandle,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 세션
import FreeBoardMain from './FreeBoard/FreeBoardMain';
import FindMeMain from './FindMe/FindMeMain';
import AffectMain from './Affect/AffectMain';
import DonateMain from './Donate/DonateMain';

export default function MainBoard({ navigation }) {

  const [selected, setSelected] = React.useState("");
  const [bType, setbType] = useState('자유게시판');
  const boards = ["자유게시판", "찾아줘게시판", "자랑게시판", "기부게시판"]
  const [SwitchBoard,setSwitchBoard] = useState('FreeBoardMain');

  console.log("현재 게시판",SwitchBoard);

  return (
    <ScrollView boxStyles={{ borderRadius: 1 }}>
      <SelectDropdown
        data={boards}
        onSelect={(selectedItem, index) => {

          if(selectedItem == '자유게시판'){
          setSwitchBoard('FreeBoardMain');
          }
          else if(selectedItem == '찾아줘게시판'){
          setSwitchBoard('FindMeMain');
          }
          else if(selectedItem == '자랑게시판'){
            setSwitchBoard('AffectMain');
          }
          else if(selectedItem == '기부게시판'){
            setSwitchBoard('DonateMain');
          }
          // setbType(selectedItem);
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

      <View>
        {SwitchBoard==="FreeBoardMain"&&<FreeBoardMain/>}
        {SwitchBoard==="FindMeMain"&&<FindMeMain/>}
        {SwitchBoard==="AffectMain"&&<AffectMain/>}
        {SwitchBoard==="DonateMain"&&<DonateMain/>}
      </View>
      
    </ScrollView>
  )
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
    marginTop:5,
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