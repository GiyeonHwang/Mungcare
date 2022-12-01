
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FreeView({ bno, btitle, bcontent, id, bphoto }) {

  // const [cardInfo,setCardInfo] = useState(props.items);

  console.log("보드 메인에서 보낸 bno:", bno);
  const navigation = useNavigation();

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: bno });
  }
  console.log("서버에서 온 phto", bphoto);

  return (

    <TouchableOpacity onPress={onDetail} style={styles.container}>

      <View style={styles.imageView}>
        <Image
          source={{ uri: bphoto }}
          style={styles.image}
        />
      </View>

      <View style={styles.contentBox}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{btitle}</Text>
          <Text style={styles.titleText}> 댓글수</Text>
        </View>

        <View style={styles.content}>
          <Text style={{ fontWeight: "bold" }}>{bcontent}</Text>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.titleText}>{id}</Text><Text style={styles.titleText}><Text></Text></Text>
        </View>
      </View>
    </TouchableOpacity>

  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').height * 0.35,
    marginTop: 20,
    padding: 5,
    position: "relative",
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 3,
    borderBottomWidth: 0,
    height: "80%",
    borderColor: "black"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  contentBox: {
    alignItems: "center",
    width: "100%",
    // height: "40%",
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
    // height: "30%",
    backgroundColor: "#F1E7DD",

  },
  titleText: {
    fontWeight: "bold",
    fontSize: 10
  },
  content: {
    width: "100%",
    // height: "50%",
    backgroundColor: "#F1E7DD",

  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: Dimensions.get('window').height * 0.02,
    backgroundColor: "#F1E7DD",


  },

});
