import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Keyboard
} from "react-native";
import axios from "axios";
import { io } from "socket.io-client";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import styles from "../css";
import { SvgUri } from "react-native-svg";
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
    scrollToBottom();
  }, []);
  useEffect(() => {
    socket.current = io("ws://54.86.57.146:8900");
    socket.current.on("getMessage", (data) => {
      setArrival({
        sender: data.senderId,
        text: data.text,
      });
    });
    scrollToBottom()
  }, []);
  useEffect(() => {
    setMessages([...messages, arrival]);
    scrollToBottom()
  }, [arrival]);
  useEffect(() => {
    socket.current.emit("addUser", yourdetail?.username);
    socket.current.on("getUsers", (users) => {});
  }, [user]);
  const getConverstaion = async () => {
    let convo = await axios
      .post("https://fnfservice.onrender.com/user/twouserconversation", {
        firstUserId: user,
        secondUserId: yourdetail?.username,
      })
      .then((response) => {
        if (response?.data?._id) {
          setConvoId(response?.data?._id);
          getMessages(response?.data?._id);
        }
      });
      scrollToBottom()
  };
  const handleConvo = async () => {
    console.log("clicked");
    Keyboard.dismiss()
    if (convoId && messagetext) {
      socket.current.emit("sendMessage", {
        senderId: yourdetail?.username,
        receiverId: user,
        text: messagetext,
      });
      let sentmessage = await axios.post(
        "https://fnfservice.onrender.com/user/sendmessage",
        {
          conversationId: convoId,
          sender: yourdetail?.username,
          text: messagetext,
        }
      );
      if (sentmessage) {
        setMessages([...messages, sentmessage?.data]);
      }
    }
    setMessagetext("");
    scrollToBottom()
  };
  const hadleConvoStart = async () => {
    let newconvo = await axios.post(
      "https://fnfservice.onrender.com/user/newconversation",
      {
        senderId: yourdetail?.username,
        receiverId: user,
      }
    );
    if (newconvo?.data?._id) {
      setConvoId(newconvo?.data?._id);
    }
    getMessages(newconvo?.data?._id);
  };
  const getMessages = async (chatid) => {
    const mess = await axios.post(
      "https://fnfservice.onrender.com/user/getmessage",
      {
        conversationId: chatid,
      }
    );
    if (mess) {
      setMessages(mess.data);
    }
    scrollToBottom()
  };
  function getNumber(inputString) {
    if (inputString && inputString?.trim()?.length !== 0) {
      let hash = 0;
      let options = ["avataaars", "micah", "bottts", "gridy", "human"];
      for (let i = 0; i < inputString.length; i++) {
        hash = inputString.charCodeAt(i) + ((hash << 4) - hash);
      }
      const number = Math.abs(hash % 4);
      let res = options[number];
      return res;
    } else {
      return "avataaars";
    }
  }
  const scrollViewRef = useRef();

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  return (
    <>
      <View style={styles.blackview}>
        {convoId ? (
          <ScrollView ref={scrollViewRef}>
            <View style={styles.messageHeader}>
              {/* to uncoment */}
              {/* <SvgUri
                uri={`https://avatars.dicebear.com/api/${getNumber(
                  user
                )}/${user}.svg`}
                width={60}
                height={60}
                style={styles.messageHeaderImage}
              /> */}
              <Text style={styles.blacksmalltext}>{user}</Text>
            </View>
            {messages?.map((message, id) => {
              return (
                <View key={`message-${id}`}>
                  {message?.sender === user ? (
                    <View style={styles.receiverMessageView}>
                      {/* <SvgUri
                        uri={`https://avatars.dicebear.com/api/${getNumber(
                          user
                        )}/${user}.svg`}
                     
                        style={styles.messageImage}
                      /> */}

                      <Text style={styles.messageIncomingstyle}>
                        {message?.text}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.senderMessageView}>
                      {/* <SvgUri
                        uri={`https://avatars.dicebear.com/api/${getNumber(
                          message?.sender
                        )}/${message?.sender}.svg`}
                    
                        style={styles.messageImage}
                      /> */}

                      <Text style={styles.messageTextstyle}>
                        {message?.text}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
            <View
              style={[
                styles.flexcenter,
                { marginBottom: 40, alignItems: "flex-end" },
              ]}
            >
              <TextInput
                onChangeText={(messagetext) => setMessagetext(messagetext)}
                style={styles.logininput}
                value={messagetext}
                placeholder="send message"
              />
              
              <Pressable onPress={handleConvo} style={styles.messageSendBtn}>
                <Text style={styles.messageSendText}>SEND</Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <ScrollView  ref={scrollViewRef}>
            {/* to uncoment */}
            {/* <SvgUri
              uri={`https://avatars.dicebear.com/api/${getNumber(
                user
              )}/${user}.svg`}
              width={60}
              height={60}
              style={styles.dpimage}
            /> */}
            <Text style={styles.blacksmalltext}>
              Do you want to Start Converstaion with {user} ?
            </Text>
            <Pressable onPress={hadleConvoStart}>
              <Text style={styles.blacksmalltext}>START CONVO</Text>
            </Pressable>
          </ScrollView>
        )}
      </View>
    </>
  );
}
