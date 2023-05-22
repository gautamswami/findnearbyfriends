import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
            name="Messages"
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
