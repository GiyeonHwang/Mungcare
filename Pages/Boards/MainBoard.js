import 'react-native-gesture-handler';
import React from "react"



import { Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function MainBoard({navigation}){
  return(
    <ScrollView>
      <Text>Affect</Text>
      <Button title="Affect 게시판으로 이동" 
        onPress={()=>{
          navigation.navigate('AffectMain')
        }}
      />
      <Text>Donate</Text>
      <Button title="Donate 게시판으로 이동" 
        onPress={()=>{
          navigation.navigate('DonateMain')
        }}
      />
      <Text>FindMe</Text>
      <Button title="FindMe 게시판으로 이동" 
        onPress={()=>{
          navigation.navigate('FindMeMain')
        }}
      />
      <Text>FreeBoard</Text>
      <Button title="FreeBoard 게시판으로 이동" 
        onPress={()=>{
          navigation.navigate('FreeBoardMain')
        }}
      />


      
    </ScrollView>
  )
}