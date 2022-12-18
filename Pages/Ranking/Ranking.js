// rankig
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert, Image, ProgressBar, ProgressBarAndroid, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import ServerPort from '../../Components/ServerPort';

// import { Text, View, Button } from "react-native";

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

//아이콘 넣을 때 필요
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

// 아이콘 import해줌
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/Entypo';

// 사진 import
import mung from '../../assets/images/mung.jpg';

//로그인 유지
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Ranking({ navigation }){
  const IP = ServerPort();
  // ranking정보 가져오기
    const [rdata, setRdata] = React.useState([]);
    const aneut = rdata.length !=0?rdata[0].animalList[0].aneut:null

    React.useEffect(()=>{
      const setData = async () => {
        await axios.post(`${IP}/point/ranking`, null, {
          
      })
          .then(function (res) {
              console.log("res잘 받아왔나요?: ",res);
              console.log("res.data잘 받아왔나요?: ",res.data);
              setRdata(res.data);
              // console.log("궁금합니다.: ",rdata[2].animalList[3].aphoto);
  
          })
          .catch(function (error) {
              console.log("ranking정보 가져오기 실패,,,",error)
          })
      }
      setData();
    },[]);
    
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
          <View>
                {
                  rdata.length >=3
                  ?
                  (
                    rdata[1].animalList[0].aphoto != null
                    ?
                    <Image source={{uri : rdata[1].animalList[0].aphoto}} style = {{width: 130 , height: 130}}/>
                    :
                    <Image source={mung} style = {{width: 130 , height: 130}}/>
                  )
                  :
                  <Image source={mung} style = {{width: 130 , height: 130}}/>
                }
              </View>
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
              {/* <Text >작성자: </Text> */}
              <Text >{rdata.length >=3
                      ?rdata[1].nickname
                      :null
                    }</Text>
             
            </View>
         </View>
        <View style={{flexDirection: 'column', justifyContent: 'center',  width:"40%", height:"60%",}}>
          <View style={{alignItems: 'center',}}>
            <Image source={ require('../../assets/images/king.png')} style={styles.kingimg} />
            <Text></Text>
            {/* 1등 */}
          </View>
            <View style={styles.first}>
              <View>
              {
                rdata.length >=3
                ?
                (
                  rdata[0].animalList[0].aphoto != null
                  ?
                  <Image source={{uri : rdata[0].animalList[0].aphoto}} style = {{width: 163 , height: 152}}/>
                  :
                  <Image source={mung} style = {{width: 163 , height: 163}}/>
                )
                :
                <Image source={mung} style = {{width: 163 , height: 163}}/>
              }
              </View>
            </View>
            
            <View style={{flexDirection:'row', justifyContent: 'center', bottom:20, marginTop:"5%"}}>
              {/* <Text >작성자: </Text> */}
              <Text>
                {rdata.length >=3
                      ?rdata[0].nickname
                      :null
                    }
                    </Text>
            </View>
           
        </View>
      
        <View style={{flexDirection: 'column', justifyContent: 'center',  width:"30%", height:"40%",}}>
        <View style={{alignItems: 'center',}}>
        <Text>3등</Text>
        </View>
        <View style={styles.third}></View>
            <View>
              {
                rdata.length >=3
                ?
                (
                  rdata[2].animalList[0].aphoto != null
                  ?
                  <Image source={{uri : rdata[2].animalList[0].aphoto}} style = {{width: 130 , height: 130}}/>
                  :
                  <Image source={mung} style = {{width: 130 , height: 130}}/>
                )
                :
                <Image source={mung} style = {{width: 130 , height: 130}}/>
              }
            </View>


          
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
              {/* <Text >작성자: </Text> */}
              <Text style={{marginTop:"2%"}}>{rdata.length >=3
                      ?rdata[2].nickname
                      :null
                    }</Text>
            </View>
            {/* <Icon name="paw-outline" size={30} color="black"/> */}
        </View>
        
      </View>

      <View style={{flex:0.5, marginBottom:"2%", marginLeft:"5%", bottom:30}}>
        <Text> <Icon2 name="crown" size={20} color="#F7931D" /> 상세 정보 <Icon2 name="crown" size={20} color="#F7931D" /></Text> 
      </View>

      
     
      {/* 1등 상세 보여주기 */}
      <View style={styles.DtailView}>
        {/* 1등 사진 */}
       <View style={styles.firstView}>
          <View>
            {
              
                rdata.length >=3
              ?
              (
                rdata[0].animalList[0].aphoto != null
                ?
                <Image source={{uri : rdata[0].animalList[0].aphoto}} style = {{width: 163 , height: 163}}/>
                :
                <Image source={mung} style = {{width: 163 , height: 163}}/>
              )
              :
              <Image source={mung} style = {{width: 163 , height: 163}}/>

              
              
            }
          </View>
       </View>
       {/* 1등 텍스트 */}
        <View style={styles.firstText}>
          <View style={{ top:"5%"}}>
            <View style={{flexDirection: 'row',}}>
              <Text style={{ fontSize:20,  marginTop:"12%",marginBottom:'5%'}}>
                {/* 1등 상세 강아지 이름 */}
                {rdata.length >=3
                  ?rdata[0].animalList[0].aname
                  :null
                }
              </Text>
              <Text style={{left:55, marginTop:"12%"}}>
              <Icon2 name="bitcoin-circle" size={20} color="#F7931D"/> : {rdata.length >=3? rdata[0].totalPoint:null}
              </Text>
            </View>
            
            <View style={styles.doginfo}>
              <Text style={styles.doginfotext}><Icon3 name="venus-mars" size={20} color="#F7931D" style={{padding:"5%", }}/> : {rdata.length >=3?rdata[0].animalList[0].asex:null}</Text>
              <Text style={styles.doginfotext}><Icon4 name="birthday-cake" size={20} color="#F7931D" style={{padding:"5%", }}/>  : {rdata.length >=3?rdata[0].animalList[0].abirth:null}</Text>
              {/* <Text style={styles.doginfotext}><Icon4 name="clipboard-check" size={20} color="#F7931D" style={{padding:"5%", }}/>  : {aneut === false ? <Text>X</Text> : <Text>O</Text>}</Text> */}
              <Text style={styles.doginfotext}><Icon5 name="bell" size={20} color="#F7931D" style={{padding:"5%",}}/>: {rdata.length >=3?rdata[0].animalList[0].abreed:null}</Text>
            </View>
            
          </View>

        </View>
      </View>

      
    </View>
    )
}

const styles = StyleSheet.create({
  Box:{
    flex: 1,
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor:'#EBE3D7'
    
  },
  TextBox:{
    flex: 0.5,
    // borderWidth: 1,
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌
    backgroundColor:'#ffffff',
    marginBottom:"5%"
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
    // backgroundColor: '#CCCCFF',
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌 
  },
  first:{
    flex:4,
    // width:150,
    // height:150,
    // marginTop: '30%',
    marginBottom: '30%',
    backgroundColor: '#ffffff',
    // borderWidth:0.5
  },
  second:{
    flex:5,
    // width:50,
    // height:'150%',
    // marginTop: '10%',
    backgroundColor: '#ffffff',
    // borderWidth:0.5

  },
  third:{
    flex:3,
    // width:'300%',
    // height:150,
    // marginTop: '10%',
    backgroundColor: '#ffffff',
    // borderWidth:0.5

  },
  DtailView:{
    flex:3,
    flexDirection: 'row', //가로정렬
    backgroundColor: '#EBE3D7',
    alignItems: 'center', //세로로 가운데 갈 수 있게 해줌
    justifyContent: 'center', //가로로 가운데 갈 수 있게 해줌 ,
    bottom:20
  },

  firstView:{
    flex:2,
    width:"100%",
    height:"100%",
    backgroundColor:"#ffffff",
    borderRightWidth:0.5,
    borderBottomWidth:3,
    borderLeftWidth:3,
    borderTopWidth:3,
    borderColor:"#ffffff",
    bottom:20,
    alignItems : 'center',
    justifyContent : 'center',
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20
  },
  firstText:{
    flex:2,
    // borderWidth: 1 ,
    // bordercolor: 'black',
    width:"100%",
    height:"100%",
    backgroundColor:'#EBE3D7',
    borderColor:"#ffffff",
    borderWidth:0.5,
    bottom:20,
    backgroundColor: "white",
    borderTopRightRadius:20,
    borderBottomRightRadius:20

  },
  Bottom:{
    flex:1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  example: {
    marginVertical: 24,
  },
  doginfo:{
    // borderTopWidth:1,

  },
  doginfotext:{
    marginBottom:"5%"
  }
  
})