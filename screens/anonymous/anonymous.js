import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import styles from "../css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SvgUri } from "react-native-svg";
import CreateRoom from "./createRoom";

export default function Anonymous({navigation}) {
  const [yourlocation, setYourLocation] = useState("Gurugra");
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let store = await AsyncStorage.getItem("youlocation");
    setYourLocation(store);

    let rooms = await axios.post(
      "https://fnfservice.onrender.com/user/getcityrooms",
      {
        roomlocation: store,
      }
    );
    if (rooms?.data) {
      setRooms(rooms.data);
    }
  };
  function getNumber(inputString) {
    if (inputString) {
      let hash = 0;
      let options = ["avataaars", "micah", "bottts", "gridy", "human"];
      for (let i = 0; i < inputString.length; i++) {
        hash = inputString.charCodeAt(i) + ((hash << 4) - hash);
      }
      const number = Math.abs(hash % 4);
      let res = options[number];
      return res;
    } else if (!inputString) {
      return "micah";
    }
  }
  return (
    <ScrollView style={roomStyle.marginTop}>
      <View style={roomStyle.flexHeader}>
        <Text>ALL DOMS</Text>

        <CreateRoom
          yourlocation={yourlocation}
          rooms={rooms}
          setRooms={setRooms}
        />
      </View>
      <View style={roomStyle.flexView}>
        {rooms.map((room, id) => {
          return (
            <Pressable key={`roomname=${id}`} onPress={()=>navigation.navigate('RoomView',{
              rooname:room.roomname,
              yourlocation:yourlocation
            })}>
              <View style={roomStyle.roomCardView}>
                {/* <SvgUri
                uri={`https://avatars.dicebear.com/api/${getNumber(
                  room.roomname
                )}/${room.roomname}.svg`}
                width={50}
                height={50}
                style={styles.dpimage}
              /> */}
                <Text>{room.roomname}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
const roomStyle = StyleSheet.create({
  flexView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  flexHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  roomCardView: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 5,
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  marginTop: {
    marginTop: 80,
    height: "80%",
    borderColor: "red",
    borderWidth: 2,
  },
  createRoomButton: {},
});
