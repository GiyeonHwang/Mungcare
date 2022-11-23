import React from "react";
import { Text, View, StyleSheet } from 'react-native';


//진행바 사용할 때 필요
// import * as Progress from 'react-native-progress';
// const BarView = styled.View`
//   width: 100%;
//   padding: 0 15px;
//   flex-direction: row;
//   margin-top: 20px;
// `;

export default function SkineResult({navigation}){
    return(
    <View style={styles.Box}>


      <View style={styles.SkinTitleBox}>
        <View style={styles.SkinTitleIn}>
          <Text style={styles.SkinTitle}>
            피부진단.
          </Text>
          <Text>
            데이터를 수집하여 만든 인공지능입니다.{"\n"}
            더 정확한 진단은 병원을 방문해주세요.
          </Text>
        </View>
      </View>

      
      <View style={styles.SkinImg}>
        <View style={styles.SkinImgIn}>
          <Text>진단한 사진 올라갈 자리임.</Text>
        </View>
      </View>

      
      <View style={styles.SkinResult}>
        <View style={styles.SkinResultIn}>
          <View style={styles.SkinResultInBars}>
            <Text>바바바바바바바바바</Text>
          </View>
          <View style={styles.SkinResultInText}>
            <Text>??? 병이 의심됩니다.{"\n"} 가까운 병원에 방문해주세요. </Text>
          </View>

          
        </View>
      </View>


      <View style={styles.Bottom}>
        <Text>하단바 들어갈 자리</Text>
      </View>
      
    </View>
    )
}
const styles = StyleSheet.create({
  Box:{
    flex: 1,
  },
  SkinTitleBox:{
    flex: 1.5,
    backgroundColor:"tomato",
    // alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    // justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌
  },
  SkinTitleIn:{
    margin: "5%"
  },
  SkinTitle:{
    fontSize: 20
  },
  SkinImg:{
    flex:3,
    backgroundColor:"green",
  },
  SkinImgIn:{
    flex: 1,
    margin: "5%",
    borderWidth: 1,
    bordercolor: 'black'
  },
  SkinResult:{
    flex:4,
    backgroundColor:"skyblue",
  },
  SkinResultIn:{
    flex: 1,
    margin: "5%",
    borderWidth: 1,
    bordercolor: 'black'
  },
  SkinResultInBars:{
    flex:1,
    // flexDirection: 'column', //세로정렬

    margin: "5%",

  },
  SkinBar:{
    borderWidth: 1,
    bordercolor: 'black'
  },
  SkinResultInText:{
    flex:1,
    margin: "5%",
  },
  Bottom:{
    flex: 1,
    backgroundColor: "white"
  }

})