import { StatusBar } from 'expo-status-bar';
import {React,useState,lazy,Suspense} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './screens/login';
import SignUp from './screens/signup';
const Nav = lazy(()=>import('./nav'))
export default function App() {
  const[screen,setScreen] = useState('home')

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


