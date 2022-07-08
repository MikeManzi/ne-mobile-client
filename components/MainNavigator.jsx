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
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false}}>
      {/* <Stack.Screen
      name="Splash"
      component={SplashScreen}
      
    /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />  
      </Stack.Navigator>
    )
}

const MainNavigator = () => {
  const { isLoggedIn } = useAuth();
    return <StackNavigator /> ;
}

export default MainNavigator