import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './src/pages/Login/Login'
import Routes from './src/components/routes.js'

const Stack = createNativeStackNavigator();

var userinfo = JSON.parse(localStorage.getItem("info"));

console.log(userinfo);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false
          }} />

        <Stack.Screen name="Routes" component={Routes}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
