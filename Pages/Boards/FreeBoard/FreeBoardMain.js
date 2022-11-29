import axios from 'axios';
import React from "react";
import { Text, View, ScrollView, SafeAreaView, Image, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import FreeView from '../../../Components/FreeView';



export default function FreeBoardMain({ navigation }) {

  const [frData, setFrData] = React.useState([]);

  React.useEffect(() => {
    axios.post("http://192.168.2.94:5000/board/search", null, {
      params: {
        page: 1,
        size: 10,
        type: "type",
        keyword: "자유게시판"
      }
    })
      .then(function (res) {
        setFrData(res.data.dtoList);
        console.log("리스폰스데이터:", res.data.dtoList[0].bno);
      })
      .catch(function (error) {
        console.log("게시판 전체 데이터 가져오기 실패: ", error)
      })
  }, [])

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: frData.bno });

  }


  return (
    
    <ScrollView> 
    {frData.map((e) =>(
      <FreeView key={e.id} {...e}/>
        )   
      )
    }
    </ScrollView>

  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "50%",
    marginBottom: 20,
    padding: 5
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderWidth: 3,
    borderBottomWidth: 0,
    height: "40%",
    borderColor: "black"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  contentBox: {
    alignItems: "center",
    width: "50%",
    height: "50%",
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
    height: "50%",
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
    height: "50%",
    backgroundColor: "#F1E7DD"
  },

});