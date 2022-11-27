import React from "react";
import { Text, View, StyleSheet } from 'react-native';

export default function Comment() {

    return (
        <View style={styles.container}>
            <View style={{padding: 10, borderTopWidth:0,borderBottomWidth:0.5}}>
                <Text style={{fontWeight:"bold",fontSize:15,marginBottom:10}}>닉네임자리</Text>
                <Text>내용내용내요내용내용내용내요내용내용내용내요내용내용내용내요내용</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width : "100%",
    }
});