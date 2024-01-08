import React, { Component } from 'react'
import { Button,TextInput,TouchableWithoutFeedback,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Animated
} from "react-native";
import { Icon, Input, Card } from "react-native-elements"
import {MaterialCommunityIcons, Ionicons,AntDesign,Entypo } from '@expo/vector-icons';
import { Portal, Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class ajoutpost extends Component {
    animation =new Animated.Value(0);
    constructor()
    {
        super();
        this.state={
            open: false,
            visible: true
        }
    }
toggelMenu=()=>{
    const toValue=this.open ?0 :1;
    Animated.spring(this.animation,{
        toValue,
        friction:5
    }).start();

    this.open=!this.open;
}
    render() {
        const rotation ={
            transform:[
              {
                rotate :this.animation.interpolate({
                    inputRange:[0,1],
                    outputRange:["0deg","45deg"]
                })
              }
            ]

        }
        const rotatestar1 ={
            transform:[
                {scale:this.animation},
              {
               translateY:this.animation.interpolate({
                   inputRange:[0,1],
                   outputRange:[0,-10]
               })
              }
            ]

        }
        const rotatestar2 ={
            transform:[
                {scale:this.animation},
              {
               translateY:this.animation.interpolate({
                   inputRange:[0,1],
                   outputRange:[0,-20]
               })
              }
            ]

        }
        const rotatestar3 ={
            transform:[
                {scale:this.animation},
              {
               translateY:this.animation.interpolate({
                   inputRange:[0,1],
                   outputRange:[0,-30]
               })
              }
            ]

        }
        const rotatestar4 ={
            transform:[
                {scale:this.animation},
              {
               translateY:this.animation.interpolate({
                   inputRange:[0,1],
                   outputRange:[0,-40]
               })
              }
            ]

        }
        const rotatestar5 ={
            transform:[
                {scale:this.animation},
              {
               translateY:this.animation.interpolate({
                   inputRange:[0,1],
                   outputRange:[0,-50]
               })
              }
            ]

        }
        return (
            <View style={[
            this.props.style]}>
                <TouchableWithoutFeedback>
<Animated.View style={[styles.button,styles.secondary,
    rotatestar5]} >
    <AntDesign name="star" size={18} color="rgb(238 ,233 ,69)" /> 
</Animated.View>
</TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
<Animated.View style={[styles.button,styles.secondary,
    rotatestar4]} >
    <AntDesign name="star" size={18} color="rgb(238 ,233 ,69)" /> 
</Animated.View>
</TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
<Animated.View style={[styles.button,styles.secondary,
    rotatestar3]} >
    <AntDesign name="star" size={18} color="rgb(238 ,233 ,69)" /> 
</Animated.View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback>
<Animated.View style={[styles.button,styles.secondary,
    rotatestar2]} >
    <AntDesign name="star" size={18} color="rgb(238 ,233 ,69)" /> 
</Animated.View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={()=>{
    alert("bonjour")
}}>
<Animated.View style={[styles.button,styles.secondary,
    rotatestar1]} >
    <AntDesign name="star" size={18} color="rgb(238 ,233 ,69)" /> 
</Animated.View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={this.toggelMenu}>
<Animated.View style={[styles.button,
            styles.menu,rotation]} >
                <Image style={{width:30,height:30}} source ={require('./assets/avisnoir.png')}/>
   
  </Animated.View>
</TouchableWithoutFeedback>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
      alignItems:"center",
      position:"absolute"
  },
  button:{
      //position:"absolute",
      height:50,
      width:50,
      borderRadius:50/2,
      alignItems:"center",
      justifyContent:"center",
      shadowRadius:10,
      shadowColor:"#F02A4B",
      shadowOpacity:0.3,
      shadowOffset:{height:10}


  },
  menu:{
      backgroundColor:"white"
  },secondary:{
    left: 5,
      width:28,
      height:28,
      borderRadius:28/2,backgroundColor:"#FFF"

  }
});
