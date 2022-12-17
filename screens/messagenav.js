import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./profile";
import { Button, Text } from "react-native";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
import TabNav from "../nav";
import ProfileUserScreen from "./profileuser";
import Message from "./message/message";
import MessageView from "./message/messageview";

const Stack = createNativeStackNavigator();

export default function MessageNav() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Message"
            component={Message}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Messageview"
            // options={{ headerShown: false }}
            component={MessageView}
          />
         <Stack.Screen
            name="Myprofile"
            // options={{ headerShown: false }}
            component={ProfileUserScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
