// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Text,Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';


//처음 앱 실행했을 때 움직이는 발바닥 밑에 install 다 해줘야 돼
//npm i --save lottie-react-native
//npm i --save lottie-ios@3.2.3
import LottieView from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'DrawerNavigater'),
      );
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
       <LottieView 
          source={require('../../assets/dog.json') /** 움직이는 LottieView */
          }
          autoPlay loop
        />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});