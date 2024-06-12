import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import NewsScreen from './NewsScreen';
import LikedNewsScreen from './LikedNewsScreen'; // Yeni eklenen beğenilen haberler ekranı

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="LikedNews" component={LikedNewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
