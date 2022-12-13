import axios from 'axios';
import React from "react";
import { Text, View, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import FreeView from '../../../Components/FreeView';


export default function AffectMain({ navigation }) {

  const [frData, setFrData] = React.useState([]);

  React.useEffect(() => {
    axios.post("http://192.168.2.94:5000/board/search", null, {
      params: {
        page: 1,
        size: 10,
        type: "type",
        keyword: "자랑게시판"
      }
    })
      .then(function (res) {
        setFrData(res.data.dtoList);
        console.log("리스폰스데이터:", res.data);
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
      {/* <View style={{ padding: 10 }}>
        <View style={[
          { marginLeft: Dimensions.get('window').width * 0.025, },
          { flexDirection: "row" },
          { flexWrap: "wrap" },
          { alignContent: "space-around" },
        ]}>
          {frData.map((e) => (
            <FreeView key={e.id} {...e} />
          )
          )
          }
        </View>
      </View> */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ padding: 10, marginTop: 10 }}>

          {frData.filter((_, i) => i % 2 === 0).map((e) => (
            <FreeView key={e.bno} {...e} />
          )
          )
          }

        </View>
        <View style={{ padding: 10, marginTop: 10 }}>

          {frData.filter((_, i) => i % 2 !== 0).map((e) => (
            <FreeView key={e.bno} {...e} />
          )
          )
          }

        </View>
      </View>

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