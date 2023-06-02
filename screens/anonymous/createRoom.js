import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ToastAndroid,
} from "react-native";

const CreateRoom = ({ yourlocation,rooms, setRooms }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const handleRoomCreate = async () => {
    try {
      let createdRoom = await axios.post(
        "https://fnfservice.onrender.com/user/createroom",
        {
          roomname: roomName,
          roomlocation: yourlocation || "Gurugram",
        }
      );
      if (createdRoom.data) {
        console.log(rooms);
        setRooms([...rooms,createdRoom.data])
        setModalVisible(false )
      } else {
      // uncoment

        // ToastAndroid.show("This name already exist", ToastAndroid.SHORT);
      }
    } catch (e) {
      // uncoment
      // ToastAndroid.show("This name already exist", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Room name"
              style={styles.modalinputStyle}
              onChangeText={(roomName) => setRoomName(roomName)}
            />

            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <View style={styles.flexViewCenter}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCreate]}
                onPress={() => handleRoomCreate()}
              >
                <Text style={styles.textStyle}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Create Room</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  flexViewCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    padding: 10,

    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000",
    position: "absolute",
    right: 10,
    borderRadius: 5,
  },
  buttonCreate: {
    backgroundColor: "#000",
    marginLeft: 5,
  },
  buttonClose: {
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalinputStyle: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: 150,
    padding: 2,
    marginBottom: 10,
  },
});

export default CreateRoom;
