import Colors from './../services/Colors'
import { useNavigation } from "expo-router";
import * as React from 'react';
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Index() {

  const navigation= useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  }, [])

  return (
    
    <View
    style={styles.container}
    >
      <Image source={require('./../assets/images/welcome.png')} 
      style={styles.welcomeImg}
      />
      <Text
      style={styles.Heading}
      >Welcome to</Text>
      <Text
      style={styles.Heading}
      >Business Directory</Text>

    <View
    style={{
      backgroundColor: Colors.WHITE,
      padding:20,
      margin: 20,
      borderRadius: 20
    }}
    >
    <Text
    style={{
      fontFamily: 'appFont',
      textAlign: 'center',
      fontSize: 20
    }}>
      Discover thousand of local businesses all in one place
    </Text>

    <TouchableOpacity 
    style={[styles.Button,
      {
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3  
      }
    ]}
    >
      <Image 
      source={require('./../assets/images/google.png')}
      style={{
        height: 20,
        width: 20
      }}
      />
      <Text
      style={{
        fontFamily: 'appFont',
        fontSize: 18,
         textAlign: 'center'
      }}>
        Sign In with google
      </Text>
    </TouchableOpacity>
    <View
    style={[styles.Button, {backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY}]}
    >
      <Text
      style={{
        fontFamily: 'appFont',
        fontSize: 18,
         textAlign: 'center',
         color: Colors.WHITE
      }}>
        Skip
      </Text>
    </View>

    </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: '100%'
  },
  welcomeImg:{
    width: '100%',
    height: 270,
    marginTop: 100
  },
  Heading:{
    fontFamily: 'appFontBolod',
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: 'center'
  },
  Button: {
    borderWidth:1,
    borderRadius: 99,
    padding: 15,
    marginTop: 15,
  }


  })
