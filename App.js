import { StatusBar } from 'expo-status-bar';
import {React,useState,lazy,Suspense,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './screens/login';
import SignUp from './screens/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-web';

const Nav = lazy(()=>import('./nav'))
export default function App() {
  const[screen,setScreen] = useState('login')
  return (
    <>
    {screen === 'login' ? 
      <Login screen={screen} setScreen={setScreen} />
    : screen === 'signup' ? <SignUp screen={screen} setScreen={setScreen}/> 
    : 
    <Suspense fallback={<Text>Loading...</Text>}>
      <Nav screen={screen} setScreen={setScreen}/>
    </Suspense>
    }
    </>
      
  );
}


