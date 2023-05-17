import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../css";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Message({ route, navigation }) {
  useEffect(() => {
    getUserconvo();
  }, []);
  const getUserconvo = async () => {
    let yourname = await AsyncStorage.getItem("user");
    let userconvo = await axios.post(
      "https://fnfservice.onrender.com/user/userconversation",
      {
        userId: yourname,
      }
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.blackBG}>
        <Text style={styles.whiteboldtext}>Chats</Text>
        <View style={styles.searchview}>
          <AntDesign name="search1" size={24} color="white" />
          <TextInput style={styles.searchinput} placeholder="search" />
        </View>
        <View style={styles.messagebox}>
          <Pressable
            style={styles.profileicon}
            onPress={() => navigation.navigate("Messageview")}
          >
            <Image
              style={styles.profileicon}
              source={require("../assets/dp.jpg")}
            />
          </Pressable>
          <Pressable>
            <Text style={styles.whitesmalltext}>USERNAME</Text>
            <Text style={styles.biotext}>USERNAME</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate("Messageview")}>
        <Text>TEST MESSAGE HOME</Text>
      </Pressable>
    </SafeAreaView>
  );
}
