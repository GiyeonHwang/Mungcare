
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView,Dimensions  ,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FreeView({ bno, btitle, bcontent, id }) {

  // const [cardInfo,setCardInfo] = useState(props.items);

  console.log("보드 메인에서 보낸 bno:", bno);
  const navigation = useNavigation();

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: bno });
  }

  return (
      <TouchableOpacity onPress={onDetail} style={styles.container}>
        <View style={styles.imageView}>
          <Image
            source={{ uri: 'https://picsum.photos/id/237/200/300' }}
            style={styles.image}
          />
        </View>
        <View style={styles.contentBox}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{btitle}</Text>
            <Text style={styles.titleText}> 댓글수</Text>
          </View>
          <View style={styles.content}>
            <Text style={{ fontWeight: "bold" }}>내용부분</Text>
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

});
