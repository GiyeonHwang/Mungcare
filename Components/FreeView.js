
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FreeView({ bno, btitle, bcontent, id, bphoto,bviewCount }) {

  // const [cardInfo,setCardInfo] = useState(props.items);

  console.log("보드 메인에서 보낸 bno:", bno);
  const navigation = useNavigation();

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: bno });
  }
  console.log("서버에서 온 phto", bphoto);

  return (
    <TouchableOpacity onPress={onDetail}>
      {bphoto ?
        <View style={styles.container}>
          <View style={styles.imageView} >
            <Image
              source={{ uri: bphoto }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.contentBox}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{btitle}</Text>
              <Text style={{ fontSize: 10,fontWeight:"bold" }}> {id}</Text>
            </View>

            <View style={styles.content}>
              <Text style={{ fontWeight: "bold" }} numberOfLines={3} ellipsizeMode="tail">{bcontent}</Text>
            </View>
            <View style={styles.bottomContent}>
              <Text style={{fontWeight:"normal",fontSize:10,color:"gray"}}>조회수 {bviewCount}</Text><Text style={styles.titleText}><Text></Text></Text>
            </View>
          </View>
        </View>
        :
        <View style={styles.container2}>
          <View style={styles.noneimageView} />
          <View style={styles.contentBox2}>
            <View style={styles.title2}>
              <Text style={styles.titleText} numberOfLines={1}>{btitle}</Text>
              <Text style={{ fontSize: 10,fontWeight:"bold" }}> {id}</Text>
            </View>
            <View style={styles.content2}>
              <Text style={{ fontWeight: "bold" }} numberOfLines={3} ellipsizeMode="tail">{bcontent}</Text>
            </View>
            <View style={styles.bottomContent2}>
              <Text style={{fontWeight:"normal",fontSize:10,color:"gray"}}>조회수 {bviewCount}</Text><Text style={styles.titleText}><Text></Text></Text>
            </View>
          </View>
        </View>
      }
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.45,
    maxHeight: Dimensions.get('window').height * 0.5,
    marginTop: 0,
    padding: 5,
    position: "relative",
  },
  container2: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.45,
    maxHeight: Dimensions.get('window').height * 0.2,
    marginTop: 0,
    padding: 5,
    position: "relative",
  },
  imageView: {
    alignItems: "center",
    width: "100%",
    maxHeight: "50%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "black"
  },
  noneimageView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "0%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "black"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  contentBox: {
    alignItems: "center",
    width: "100%",
    height: "50%",
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: "black",
    backgroundColor: "#F1E7DD",
    padding: 10
  },
  contentBox2: {
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
    borderWidth: 3,
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
    height: "15%",
    backgroundColor: "#F1E7DD",
  },
  title2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "30%",
    backgroundColor: "#F1E7DD",
  },
  titleText: {
    maxWidth:"80%",
    fontWeight: "bold",
    fontSize: 15
  },
  content: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F1E7DD",
    marginTop:10
  },
  content2: {
    width: "100%",
    maxHeight: "50%",
    backgroundColor: "#F1E7DD",
    marginTop:10
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "35%",
    backgroundColor: "#F1E7DD",
  },
  bottomContent2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "20%",
    backgroundColor: "#F1E7DD",
    marginTop:10
  },
});
