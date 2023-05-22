import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Image,
  Button,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  ToastAndroid,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import styles from "./css";
import axios from "axios";

export default function ImagePic({ content, username, getUserpost }) {
  const [image, setImage] = useState(null);
  const [postModal, setPostmodal] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Handle permission denial
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result);
      setModalVisible(!modalVisible);
    }
  };
  return (
    <>
      {content === "displayPicture" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {!image?.assets[0].uri ? (
            <EvilIcons name="user" size={74} color="white" />
          ) : (
            <Image
              source={{ uri: image?.assets[0].uri }}
              style={{ width: 74, height: 74, borderRadius: 50 }}
            />
          )}
          <Button title="SELECT IMAGE" onPress={pickImage} />
        </View>
      ) : content === "userPost" ? (
        <>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Pressable
              style={styles.padding2}
              onPress={pickImage}
              visible={true}
            >
              <AntDesign name="plussquareo" size={24} />
            </Pressable>
            {!image ? null : (
              <PostModal
                image={image}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                username={username}
                getUserpost={getUserpost}
              />
            )}
          </View>
        </>
      ) : null}
    </>
  );
}

const PostModal = ({
  image,
  visible,
  modalVisible,
  setModalVisible,
  username,
  getUserpost
}) => {
  const handleImagePost = async () => {
    const base64Image = `data:${image?.assets[0]?.type};base64,${image?.assets[0]?.base64}`;
    
    axios
      .post("https://fnfservice.onrender.com/user/newpost", {
        username: username,
        image: `data:image/jpeg;base64,${image?.assets[0]?.base64}`,
      })
      .then((response) => {
        if (response) {
          setModalVisible(!modalVisible);
          ToastAndroid.show("Image Uploaded", ToastAndroid.SHORT);
          getUserpost();
        }
      })
      .catch((error) => {
        if (error) { 
          ToastAndroid.show(
            "Some error occured please try later",
            ToastAndroid.SHORT
          );
        }
      });
  };
  const handleModalHide = () => {
    setModalVisible(!modalVisible);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={modalstyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalstyles.centeredView}>
          <View style={modalstyles.modalView}>
            {!image.assets[0].uri ? null : (
              <Pressable style={styles.postpressable}>
                <Image
                  style={styles.homepost}
                  source={{ uri: image.assets[0].uri }}
                />
              </Pressable>
            )}
            <View style={modalstyles.buttonsFlex}>
              <Pressable
                style={[modalstyles.button, modalstyles.buttonOpen]}
                onPress={() => handleModalHide()}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={[modalstyles.button, modalstyles.buttonClose]}
                onPress={() => handleImagePost()}
              >
                <Text style={modalstyles.textStyle}>Post Image</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginRight: 10,
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  buttonClose: {
    backgroundColor: "#000",
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
});
