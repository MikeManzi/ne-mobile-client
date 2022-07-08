import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';


const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Admin" screenOptions={{ headerShown: false}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          
        /> */}
        <Stack.Screen name="Admin" component={AdminScreen} />  
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
}

const MainNavigator = () => {
  const { isLoggedIn } = useAuth();
    return <StackNavigator /> ;
}

export default MainNavigator