import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , ScrollView, StyleSheet, TextInput , Button, Alert,Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Text, View, Button } from "react-native";

//navigation사용할 때 필요



export default function FreeView ()  {

    const [frData, setFrData] = React.useState([]);
    
    // const pressHandler = () => {
    //     // 페이지 이동. navigate = push
    //     // 변수는 routes 파일 screens 내 키값을 사용한다
    //     navigation.navigate('FreeBoardDetail');
    //   }

     const navigation = useNavigation();
    

    React.useEffect(()=>{
        axios.post("http://192.168.2.94:5000/board/search", null,{
          params:{
            page:1,
            size:10,
            type:"type",
            keyword:"자유게시판"
          }
        })
        .then(function(res){
          console.log("전체 FreeView는 : ", JSON.stringify(res.data, null, "\t"));
          setFrData(res.data.dtoList);
        })
        .catch(function(error){
          console.log("게시판 전체 데이터 가져오기 실패: ",error)
        })
      },[])


    return(
        <ScrollView>
          
        {frData && frData.map((e, check)=>{

                const viewDetail = () => {
                    navigation.navigate('FreeBoardDetail' , {
                        bno : e.bno 
                    });
                }

            return(
                <>
              <TouchableOpacity onPress={() => viewDetail()}>
                <View style={{alignItems:"center",width:"50%",height:"60%",marginBottom:20,padding:5}}>
                  
                <View style={{alignItems:"center", justifyContent: "center",width:"100%",borderWidth:3,borderBottomWidth:0,height:"70%",borderColor:"black"}}>
                <Image
                source={{uri: 'https://picsum.photos/id/237/200/300'}}
                style={{width:"100%",height:"100%"}}
                />
                </View>
                <View  style={{alignItems:"center",width:"100%",height:"40%",borderWidth:2,borderTopWidth:0,borderColor:"black",backgroundColor: "#F1E7DD",padding: 10}}>
                    <View  style={{flexDirection: "row",justifyContent: 'space-between',alignItems:"center",width:"100%",height:"30%",backgroundColor:"#F1E7DD"}}>
                        <Text style={{fontWeight:"bold",fontSize:10}}>{e.btitle}</Text>
                        <Text style={{fontWeight:"bold",fontSize:10}}>{e.breply}</Text>
                    </View>
                    <View  style={{width:"100%",height:"50%",backgroundColor:"#F1E7DD"}}>
                        <Text style={{fontWeight:"bold"}}>여기는 내용부분</Text>
                    </View>
                    <View  style={{flexDirection: "row",justifyContent: 'space-between',alignItems:"center", width:"100%",height:"20%",backgroundColor:"#F1E7DD"}}>
                        <Text style={{fontWeight:"bold",fontSize:10}}>{e.id}</Text><Text style={{fontWeight:"bold",fontSize:10}}>조회수<Text>{e.bviewCount}</Text></Text>
                    </View>
                </View>
                
            </View>
            </TouchableOpacity>
            </>
            )
            
        })}
        
        </ScrollView>
    )
        
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato",
        alignItems: "center",
        justifyContent: "center",
    },
});

