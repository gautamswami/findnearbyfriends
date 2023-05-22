import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import axios from "axios";
import styles from "../css";
import { EvilIcons } from "@expo/vector-icons";

export default function MessageView({ route }) {
  let { user, yourname } = route.params;
  const [convoId, setConvoId] = useState();
  const [messagetext, setMessagetext] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getConverstaion();
  }, []);
  const getConverstaion = async () => {
    let convo = await axios.post(
      "https://fnfservice.onrender.com/user/twouserconversation",
      {
        firstUserId: user,
        secondUserId: yourname,
      }
    );
    if (convo?.data?._id) {
      setConvoId(convo?.data?._id);
      getMessages();
    }
  };
  const handleConvo = async () => {
    if (convoId && messagetext) {
      let messagesent = await axios.post(
        "https://fnfservice.onrender.com/user/sendmessage",
        {
          conversationId: convoId,
          sender: yourname,
          text: messagetext,
        }
      );
    } else {
      let newconvo = axios.post(
        "https://fnfservice.onrender.com/user/newconversation",
        {
          senderId: yourname,
          receiverId: user,
        }
      );
      if (newconvo?.data?._id) {
        setConvoId(newconvo?.data?._id);
      }
    }
    getMessages();
  };
  const getMessages = async () => {
    const mess = await axios.post(
      "https://fnfservice.onrender.com/user/getmessage",
      {
        conversationId: convoId,
      }
    );
     setMessages(mess.data)
  };
  return (
    <>
    <View style={styles.blackview}>
      <ScrollView>
      <Text style={styles.blacksmalltext}>{user}</Text>
      
      {messages?.map((message)=>{
         return(
            <>
                  <EvilIcons name="user" size={74} color="white" />
            
            <Text style={styles.blacksmalltext}>{message?.text}</Text>
            </>

         )
      })}
      <TextInput 
      onChangeText={(messagetext) => setMessagetext(messagetext)}
      style={styles.logininput}
      
      placeholder="send message" />
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
