import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./profile";
import { Button, Text } from "react-native";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import TabNav from "../nav";
import ProfileUserScreen from "./profileuser";

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
         <Stack.Screen
            name="Myprofile"
            options={{ headerShown: false }}
            component={ProfileUserScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
