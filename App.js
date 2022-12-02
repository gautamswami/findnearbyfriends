import { StatusBar } from 'expo-status-bar';
import {React,useState,lazy,Suspense} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './screens/login';
const Nav = lazy(()=>import('./nav'))
export default function App() {
  const[screen,setScreen] = useState('login')

  return (
    <>
    {screen === 'login' ? 
      <Login screen={screen} setScreen={setScreen} />
    : screen === 'signup' ? <></> 
    : 
    <Suspense fallback={<Text>Loading...</Text>}>
      <Nav/>
    </Suspense>
    }
    </>
      
  );
}


