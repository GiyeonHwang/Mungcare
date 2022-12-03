import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert, Image } from 'react-native';
import Constants from 'expo-constants';

// import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

//아이콘 넣을 때 필요
import Icon from 'react-native-vector-icons/Ionicons';



export default function Ranking(navigation){
    return(
    <View style={styles.Box}>
      <View style={styles.TextBox}>
        <Text >금주의 열심 멤버</Text>
      </View>

      {/* 랭킹 보여지는 부분 */}
      <View style={styles.RankingView}> 
      <View style={{flexDirection: 'column', justifyContent: 'center',  width:"30%", height:"40%", justifyContent: 'center',}}>
        <View style={{alignItems: 'center',}}>
        <Text>2등</Text>
        </View>
          <View style={styles.second}></View>
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
              <Text >작성자: </Text>
              <Text >이름</Text>
            </View>
      </View>
        <View style={{flexDirection: 'column', justifyContent: 'center',  width:"40%", height:"60%",}}>
          <View style={{alignItems: 'center',}}>
            <Image source={ require('../../assets/images/king.png')} style={styles.kingimg} />
            {/* <Icon name="ios-person" size={30} color="#4F8EF7" /> */}
            <Text>1등</Text>
          </View>
            <View style={styles.first}></View>
            <View style={{flexDirection:'row', justifyContent: 'center', bottom:40}}>
              <Text >작성자: </Text>
              <Text >이름</Text>
            </View>
           
        </View>
      
        <View style={{flexDirection: 'column', justifyContent: 'center',  width:"30%", height:"40%",}}>
        <View style={{alignItems: 'center',}}>
        <Text>3등</Text>
        </View>
        <View style={styles.third}></View>
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
              <Text >작성자: </Text>
              <Text >이름</Text>
            </View>
        </View>
        
      </View>


      {/* 1등 상세 보여주기 */}
      <View style={styles.DtailView}>
        {/* 1등 사진 */}
       <View style={styles.firstView}></View>
       {/* 1등 텍스트 */}
       <View style={styles.firstText}>
        <View style={{alignItems: 'center', top:"30%"}}>
          <Text style={{borderWidth: 1 ,bordercolor: 'black'}}>
            동물 이름
          </Text>
          <Text style={{borderWidth: 1 ,bordercolor: 'black'}}>
            ??? point
          </Text>
          <Text style={{borderWidth: 1 ,bordercolor: 'black'}}>
            무슨바인지 모르겠는데 일단 만들어둠
          </Text>
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
  TextBox:{
    flex: 0.5,
    borderWidth: 1,
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌
  },
  kingimg:{
    position:'absolute',
    width: 90,
    height:90,
    bottom:"10%"
    // resizeMode: "cover",
  },
  RankingView:{
    flex: 5,
    flexDirection: 'row', //가로정렬
    backgroundColor: '#CCCCFF',
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌 
  },
  first:{
    flex:4,
    // width:150,
    // height:150,
    // marginTop: '30%',
    marginBottom: '25%',
    backgroundColor: 'red',
  },
  second:{
    flex:3,
    // width:50,
    // height:'150%',
    // marginTop: '10%',
    backgroundColor: 'blue',

  },
  third:{
    flex:3,
    // width:'300%',
    // height:150,
    // marginTop: '10%',
    backgroundColor: 'green',

  },
  DtailView:{
    flex:3,
    flexDirection: 'row', //가로정렬
    backgroundColor: '#CC99CC',
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌 
  },

  firstView:{
    flex:2,
    width:"100%",
    height:"100%",
    backgroundColor:"yellow"
  },
  firstText:{
    flex:3,
    borderWidth: 1 ,
    bordercolor: 'black',
    width:"100%",
    height:"100%",
    backgroundColor:"red"
  },
  Bottom:{
    flex:1,
    backgroundColor: "white"
  }
})