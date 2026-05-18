import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/services/Colors';


export default function TabLayout() {
    const navigation= useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    }, [])

  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
    }} >
        <Tabs.Screen name='Homescreen'
        options={{
            title: 'Search',
            tabBarIcon: ({color})=>(
                <FontAwesome name="search" size={24} color={color} />
            )
        }}
        />
        <Tabs.Screen name='Favoritescreen'
        options={{
            title: 'Home',
            tabBarIcon: ({color})=>(
                <FontAwesome name="heart" size={24} color={color} />
            )
        }}
        />
        <Tabs.Screen name='Profilescreen'
        options={{
            title: 'Profile',
            tabBarIcon: ({color})=>(
                <FontAwesome name="user-circle" size={24} color={color} />
            )
        }}  
        />
    </Tabs>
  )
}