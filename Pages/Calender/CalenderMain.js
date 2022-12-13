// 캘린더
import axios from 'axios';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TouchableOpacity } from "react-native-gesture-handler";
const Stack = createStackNavigator();

import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerPort from '../../Components/ServerPort';
import { SaveFormat } from 'expo-image-manipulator';

const CalendarMain = (navigation) => {
    const IP = ServerPort();
    
 // 캘린더 정보 가져오기
  const [items, setItems] = React.useState({});

//user id 담아줄 변수
  var id2 = "";

     // 로그인 유지
  const saveid = async () =>{
    try {
        const value = await AsyncStorage.getItem('id');
        if (value !== null) {
            console.log("유저 아이디 가져오기", value);
            // setId(value);
            id2 = value;
        console.log("메롱",id2)
        }
        
    } catch (e) {
        console.log("로그인 유지 실패,,,", e);
    }
   
  }

    // 오늘 날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const now = year+"/"+month +"/" +day
    // console.log("년 + 월 + 일: ",now);


  React.useEffect(async()=>{
    
    await saveid()
       console.log("여기서도 잘 나오나?",id2)
       //캘린더 정보 가져오기
       axios.post(`${IP}/calendar/allList`, null,{
            params:{
                id:id2
            }
       })
        .then(function (res){
            console.log("나와줘ㅠ",res.data);
            

            for (let j = 0; j < res.data.length; j++) {// 데이터 출력되는 게 numItems만큼이니까 numITems부분에 db에 있는 값 개수 넣어주면 될듯
              if (!items[res.data[j].cdate]) {//!items[strTime] === ture임!없으면 undifined
                  items[res.data[j].cdate] = [];
              }
              items[res.data[j].cdate].push({ //itmes[strTime] === 0:{name: 'Item for 2022-11-17 #0', height: 127, day:'2022-11-17'} 안에 있는 데이터 저기에 넣은듯?
                  // name: 'Item for ' + strTime + ' #' + j,
                  name: 
                  res.data[j].ctype === "walk"?
                  <View>
                      <Text style={{fontWeight: "bold", fontSize:20}}>{res.data[j].ctype}  </Text>
                      <Text>시작 시간:  {res.data[j].cstartTime}</Text>
                      <Text>종료 시간: {res.data[j].cendTime}</Text>
                      <Text>총 산책 시간: {res.data[j].cwalkTime}</Text>
                      <Text>날짜: {res.data[j].cdate}</Text>
                      <Text>{res.data[j].cphoto === null ? <Text>사진 없음</Text> : <View style={{borderWidth: 1,}}><Image source={{uri : res.data[j].cphoto}} style = {{ width: 200 , height: 300}}/></View>}</Text>
                      
                  </View>
                  :
                  <View>
                      <Text style={{fontWeight: "bold",fontSize:20}}>{res.data[j].ctype}  </Text>
                      <Text>날짜: {res.data[j].cdate}</Text>
                      <Text>{res.data[j].cphoto === null ? <Text>사진 없음</Text> : <View style={{borderWidth: 1,}}><Image source={{uri : res.data[j].cphoto}} style = {{ width: 200 , height: 300}}/></View>}</Text>
                  </View>
              });
          }
              
          const newItems = {};
          Object.keys(items).forEach(key => {
              newItems[key] = items[key];
          });
          setItems(newItems);
        })

        .catch(function (error) {
            console.log(error)
        })
    
      
  }, []);

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
       
    }
    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                selected={now}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
            />
            <StatusBar />            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});

export default CalendarMain;