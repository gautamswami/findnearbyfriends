import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../css";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgUri } from "react-native-svg";
import { useIsFocused } from "@react-navigation/core";
let chats = [];
export default function Message({ route, navigation }) {
  const [userConvo, setUserConvo] = useState([]);
  const [yourname, setYourname] = useState("");
  const [search, setSearch] = useState("");
  const [yourdetail, setYourdetail] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserconvo();
  }, [isFocused]);
  const getUserconvo = async () => {
    console.log("ran");
    let yourname = await AsyncStorage.getItem("user");

    let detail = JSON.parse(await AsyncStorage.getItem("yourdetail"));

    setYourdetail(detail);
    setYourname(yourname);
    let userconvo = await axios.post(
      "https://fnfservice.onrender.com/user/userconversation",
      {
        userId: yourname,
      }
    );
    setUserConvo(userconvo?.data);
    chats = userconvo?.data;
  };
  function getNumber(inputString) {
    let hash = 0;
    let options = ["avataaars", "micah", "bottts", "gridy", "human"];
    for (let i = 0; i < inputString.length; i++) {
      hash = inputString.charCodeAt(i) + ((hash << 4) - hash);
    }
    const number = Math.abs(hash % 4);
    let res = options[number];
    return res;
  }
  function getUser(array) {
    if (array && array.length !== 0) {
      let filtered = array.filter((data) => {
        return data !== yourname;
      });
      return filtered[0]?.toLowerCase();
    } else {
      return " ";
    }
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.blackBG}>
          <Text style={styles.whiteboldtext}>Chats {yourname}</Text>
          <View style={styles.searchview}>
            <AntDesign name="search1" size={24} color="white" />
            <TextInput
              style={styles.searchinput}
              placeholder="search"
              onChangeText={(search) => setSearch(search)}
            />
          </View>
          {userConvo
            ?.filter(
              (data) =>
                getUser(data?.members)?.includes(search.toLowerCase()) ||
                data?.lastmessage?.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((data, id) => {
              return (
                <View style={styles.messagebox} key={`convo-${id}`}>
                
                  <Pressable
                    style={styles.profileicon}
                    onPress={() =>
                      navigation.navigate("Messages", {
                        user: getUser(data?.members),
                        yourdetail: yourdetail,
                      })
                    }
                  >
                    <SvgUri
                  uri={`https://avatars.dicebear.com/api/${getNumber(
                    getUser(data?.members)
                  )}/${getUser(data?.members)}.svg`}
                  width={60}
                  height={60}
                  style={styles.dpimage}
                />
                  </Pressable>
                  <Pressable>
                    <Text style={styles.blacksmalltext}>
                      {data?.lastmessage}
                    </Text>

                    <Text style={styles.biotext}>{getUser(data?.members)}</Text>
                  </Pressable>
                </View>
              );
            })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
