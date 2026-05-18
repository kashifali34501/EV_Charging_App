import Colors from './../services/Colors';
import { useNavigation, useRouter } from "expo-router";
import * as React from 'react';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform} from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useSSO, useUser } from '@clerk/expo';

WebBrowser.maybeCompleteAuthSession();

// Warm up browser for better UX on Android
const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'android') return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function Index() {
  useWarmUpBrowser();

  const navigation = useNavigation();
  const { startSSOFlow } = useSSO();
  const router= useRouter();
  const {user, isLoaded} = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // Auto redirect if user is already signed in
  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    if (isLoaded && user) {
      router.replace('/(tabs)/Homescreen');  
    }
  }, [isLoaded, user, navigation, router]);


  


  const handleGoogleSignIn = async () => {
    if(user){
      router.replace('/(tabs)/Homescreen')
      return;
    }
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'directoryapp',   // ← Change this if your scheme is different
          path: '/continue',
        }),
      });

      if (createdSessionId) {
        
        await setActive!({
          session: createdSessionId,
        });
       }
  } catch (error) {
      console.error("Google Sign In Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../assets/images/welcome.png')} 
        style={styles.welcomeImg}
      />

      <Text style={styles.Heading}>Welcome to</Text>
      <Text style={styles.Heading}>EV Station</Text>

      <View style={styles.card}>
        <Text style={styles.description}>
          You Ultimate EV Charging Station Finder App
        </Text>

        <TouchableOpacity 
          style={[styles.Button, { flexDirection: "row", justifyContent: 'center', alignItems: 'center', gap: 10 }]}
          onPress={handleGoogleSignIn}
          
          disabled={isLoading}
        >
          <Image 
            source={require('./../assets/images/google.png')}
            style={{ height: 24, width: 24 }}
          />
          <Text style={styles.googleText}>
            {isLoading ? "Signing in..." : "Sign In with Google"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.Button, { backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY }]}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  welcomeImg: {
    width: '100%',
    height: 270,
    marginTop: 100,
    resizeMode: 'contain'
  },
  Heading: {
    fontFamily: 'appFontBolod',
    fontSize: 30,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    margin: 20,
    borderRadius: 20,
    marginTop: 30,
  },
  description: {
    fontFamily: 'appFont',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 25,
    lineHeight: 26,
  },
  Button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 15,
    borderColor: '#ddd',
  },
  googleText: {
    fontFamily: 'appFont',
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  skipText: {
    fontFamily: 'appFont',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.WHITE,
  },
});