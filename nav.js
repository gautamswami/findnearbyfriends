
import { Pressable, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from "./screens/profile";
import HomeComponent from "./screens/home";
import Setting from "./screens/setting";
import Nav from "./screens/tabNav";
import MessageNav from "./screens/messagenav";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNav = ({ navigation }) => {
  return (
    <>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={
            
            ({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Nav') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                return <AntDesign name={iconName} size={24} color="white" />

                } else if (route.name === 'Message') {
                  iconName = focused ? 'message1' : 'message1';
                return <AntDesign name={iconName} size={24} color="white" />

                }
                else if(route.name === 'Anonymous'){
                  iconName = focused ? 'setting' : 'setting'
                return  <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="white" />

                }
    
                // You can return any component that you like here!
                // return <AntDesign name={iconName} size={24} color="white" />
                // <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
                ;
              },
              tabBarShowLabel: false,
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: [
                {
                  display: "flex",
                  backgroundColor: "black",
                },
                null
              ],
            })
           }

        >
          <Tab.Screen
            name="Nav"
            component={Nav}
            // component={MessageNav}

            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Message"
            component={MessageNav}
            options={{ headerShown: false, tabBarVisible:false  }}
          />
          <Tab.Screen
            name="Anonymous"
            component={Setting}
            options={{ headerShown: false, tabBarVisible:false  }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};
export default TabNav;
