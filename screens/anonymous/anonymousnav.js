import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Anonymous from "./anonymous";
import RoomView from "./roomView";

const Stack = createNativeStackNavigator();

export default function RoomNav({roomname}) {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Anonymous"
            component={Anonymous}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoomView"
            // options={{ headerShown: false }}
            component={RoomView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
