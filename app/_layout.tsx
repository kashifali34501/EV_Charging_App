import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont':require('./../assets/Fonts/Montserrat-Regular.ttf'),
    'appFontBold': require('./../assets/Fonts/Montserrat-Bold.ttf')
  })

  if(!fontsLoaded){
      return <ActivityIndicator/>
  }
   return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack/>
    </ClerkProvider>
  )
}