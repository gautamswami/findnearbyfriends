import { Button, ScrollView,Pressable, Text, View, Image } from "react-native";
import styles from "./css";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const users = [
    {
      id: "1",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "one",
    },
    {
      id: "2",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "two",
    },
    {
      id: "3",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "three",
    },
    {
      id: "4",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "four",
    },
  ];
  return (
    <>
      <ScrollView style={styles.blackBG}>
        <View style={styles.flexfar}>
          <Image
            style={styles.logoimage}
            source={require("./assets/logo.png")}
          />
          <Pressable onPress={()=>navigation.navigate('Myprofile')}> 
<FontAwesome5 name="user-alt" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.flexcenter}>
          <EvilIcons name="location" size={24} color="white" />
          <Text style={styles.locationtext} numberOfLines={1}>
            Sector 56, Gugugram
          </Text>
        </View>
        <View>
          <Text style={styles.whiteboldtext}>NEARBY !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data,id) => {
            return (
              
                
                <Pressable key={id} style={styles.profileicon} onPress={()=>navigation.navigate('Profile')}>
                  <Image style={styles.profileicon} 
                  source={data.dp} 
                  // ./assets/dp.jpg
                  />
                </Pressable>
              
            );
          })}
        </View>
        <View>
          <Text style={styles.whiteboldtext}>Friends !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data,id) => {
            return (
              
                <Pressable key={id}  style={styles.profileicon} onPress={()=>navigation.navigate('Profile')}>
                  <Image style={styles.profileicon} 
                  source={data.dp} 
                  // ./assets/dp.jpg
                  />
                </Pressable>
              
            );
          })}
        </View>
        <View>
          <Text style={styles.whiteboldtext}>Posts !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data,id) => {
            return (
              
               
                <Pressable key={id} style={styles.homepost} onPress={()=>navigation.navigate('Profile')}>
                  <Image style={styles.homepost} 
                  source={data.dp} 
                  // ./assets/dp.jpg
                  />
                </Pressable>
              
            );
          })}
        </View>
        {/* <Pressable onPress={() => navigation.navigate("Myprofile")}>
        <Text>CLICK TO OPEN YOUR PROFILE</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text>CLICK TO OTHER PROFILE</Text>
      </Pressable> */}
      </ScrollView>
    </>
  );
};
export default HomeScreen;
