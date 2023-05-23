import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import styles from "../css";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
// import { SvgUri } from "react-native-svg";
import { io } from "socket.io-client";
export default function MessageView({ route }) {
  // cliked person is user
  let { user, yourdetail } = route.params;
  const [convoId, setConvoId] = useState();
  const [messagetext, setMessagetext] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrival, setArrival] = useState();
  const socket = useRef();
  useEffect(() => {
    getConverstaion();
  }, []);
  useEffect(() => {
    socket.current = io("ws://192.168.137.1:8900");
    socket.current.on("getMessage", (data) => {
      setArrival({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);
  useEffect(() => {
    setMessages([...messages, arrival]);
  }, [arrival]);
  useEffect(() => {
    socket.current.emit("addUser", yourdetail?.username);
    socket.current.on("getUsers", (users) => {});
  }, [user]);
  const getConverstaion = async () => {
    let convo = await axios.post(
      "https://fnfservice.onrender.com/user/twouserconversation",
      {
        firstUserId: user,
        secondUserId: yourdetail?.username,
      }
    );
    if (convo?.data?._id) {
      setConvoId(convo?.data?._id);
      // getMessages();
    }
  };
  const handleConvo = async () => {
    if (convoId && messagetext) {
      socket.current.emit("sendMessage", {
        senderId: yourdetail?.username,
        receiverId: user,
        text: messagetext,
      });
      await axios.post("https://fnfservice.onrender.com/user/sendmessage", {
        conversationId: convoId,
        sender: yourdetail?.username,
        text: messagetext,
      });
    } else {
      let newconvo = axios.post(
        "https://fnfservice.onrender.com/user/newconversation",
        {
          senderId: yourdetail?.username,
          receiverId: user,
        }
      );
      if (newconvo?.data?._id) {
        setConvoId(newconvo?.data?._id);
      }
    }
    // getMessages();
  };
  // const getMessages = async () => {
  //   const mess = await axios.post(
  //     "https://fnfservice.onrender.com/user/getmessage",
  //     {
  //       conversationId: convoId,
  //     }
  //   );
  //   setMessages(mess.data);
  // };
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
  return (
    <>
      <View style={styles.blackview}>
        <ScrollView>
          {/* <SvgUri
            uri={`https://avatars.dicebear.com/api/${getNumber(
              user
            )}/${user}.svg`}
            width={60}
            height={60}
            style={styles.dpimage}
          /> */}
          <Text style={styles.blacksmalltext}>{user}</Text>

          {messages?.map((message, id) => {
            return (
              <View key={`message-${id}`}>
                <EvilIcons name="user" size={74} color="white" />

                <Text style={styles.blacksmalltext}>{message?.text}</Text>
              </View>
            );
          })}
          <TextInput
            onChangeText={(messagetext) => setMessagetext(messagetext)}
            style={styles.logininput}
            placeholder="send message"
          />
          {convoId ? (
            <Pressable onPress={handleConvo}>
              <Text style={styles.blacksmalltext}>SEND</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleConvo}>
              <Text style={styles.blacksmalltext}>START CONVO</Text>
            </Pressable>
          )}
        </ScrollView>
      </View>
    </>
  );
}
