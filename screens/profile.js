import {
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import styles, { BioText, HomeText } from "./css";
import { useState, useEffect } from "react";
import launchImageLibrary from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Dp = require("./assets/dp.jpg");
const socialdata = [
  {
    insta: "one",
    fb: "fb2",
    snap: "snap3",
  },
];
const ProfileUserScreen = ({ route, navigation }) => {
  let { user,yourdetail } = route.params;
  const [expand, setExpand] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailmodal, setDetailmodal] = useState(false);
  const [userdetail, setUserdetail] = useState();
  const [userpost, setUserpost] = useState();
  const [yourname, setYourname] = useState();
  const handleExpand = () => {
    setExpand(!expand);
  };
  const detailExpand = () => {
    setDetailmodal(!detailmodal);
  };
  useEffect(() => {
    getUser();
    getUserpost();
  }, []);
 
  const getUser = async () => {
    let userdata = await axios.post(
      "https://fnfservice.onrender.com/user/getuser",
      {
        username: user,
      }
    );
    setUserdetail(userdata?.data[0]);
  };
  const getUserpost = async () => {
    let userpost = await axios.post(
      "https://fnfservice.onrender.com/user/getpost",
      {
        username: user,
      }
    );
    setUserpost(userpost.data);
  };
  const updateuser = async () => {
    let update = await axios.post("http://localhost:3000/user/updateuser", {
      find: {
        username: user,
      },
      update: {
        // username : state
        bio: "bio",
        instagram: "ins",
        snapchat: "sna",
        facebook: "fb",
        linkedin: "link",
        twitter: "tw",
        youtube: "yt",
        pinterest: "pintereser",
        followers: "followers",
        following: "foll",
      },
    });
  };
  const updateDp = async () => {
    // launchImageLibrary
  };
  return (
    <ScrollView style={styles.blackBG}>
      <Pressable style={styles.padding2} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </Pressable>
      <View style={styles.dpview}>
      <EvilIcons name="user" size={74} color="white" />

        <Pressable style={styles.dpview}>
          <Ionicons name="ios-person-add-sharp" size={24} color="white" />
        </Pressable>
        <Pressable
          style={styles.dpview}
          onPress={() =>
            navigation.navigate("Messageview", {
              user: userdetail.username,
              yourname : yourdetail?.username
            })
          }
        >
          <Feather name="message-square" size={24} color="white" />
        </Pressable>
      </View>
      <View style={styles.textview}>
        <HomeText text={userdetail?.username} />
        <Text style={expand ? styles.biotext : styles.biolessheighttext}>
          {userdetail?.bio}
        </Text>
        {userdetail?.bio && (
          <Pressable onPress={handleExpand}>
            {expand ? (
              <Text style={{ color: "white" }}>...less</Text>
            ) : (
              <Text style={{ color: "white" }}>...more</Text>
            )}
          </Pressable>
        )}
      </View>
      {(userdetail?.instagram ||
        userdetail?.snapchat ||
        userdetail?.facebook ||
        userdetail?.linkedin ||
        userdetail?.twitter ||
        userdetail?.pinterest ||
        userdetail?.youtube ||
        userdetail?.whatsapp) && (
        <View style={styles.socialview}>
          {userdetail?.instagram && (
            <Pressable style={styles.socialicon}>
              <AntDesign name="instagram" size={44} color="#d62976" />
            </Pressable>
          )}
          {userdetail?.snapchat && (
            <Pressable style={styles.socialicon}>
              <FontAwesome5 name="snapchat-square" size={44} color="#FFFC00" />
            </Pressable>
          )}
          {userdetail?.facebook && (
            <Pressable style={styles.socialicon}>
              <AntDesign name="facebook-square" size={44} color="#3b5998" />
            </Pressable>
          )}
          {userdetail?.linkedin && (
            <Pressable style={styles.socialicon}>
              <AntDesign name="linkedin-square" size={44} color="#0A66C2" />
            </Pressable>
          )}
          {userdetail?.twitter && (
            <Pressable style={styles.socialicon}>
              <FontAwesome5 name="twitter-square" size={44} color="#3b5998" />
            </Pressable>
          )}
          {userdetail?.pinterest && (
            <Pressable style={styles.socialicon}>
              <FontAwesome5 name="pinterest-square" size={44} color="#E60023" />
            </Pressable>
          )}
          {userdetail?.youtube && (
            <Pressable style={styles.socialicon}>
              <FontAwesome5 name="youtube" size={44} color="red" />
            </Pressable>
          )}
          {userdetail?.whatsapp && (
            <Pressable style={styles.socialicon}>
              <FontAwesome5 name="whatsapp-square" size={44} color="black" />
            </Pressable>
          )}
        </View>
      )}

      <View style={styles.socialview}>
        {userpost?.map((post) => {
          return (
            <Image source={{ uri: post?.posturl }} style={styles.postimage} />
          );
        })}
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailmodal}
          onRequestClose={() => {
            setDetailmodal(!detailmodal);
          }}
        >
          <ScrollView style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.flexfar, { width: "100%" }]}>
                <Text style={styles.whitesmalltext}>Add Details</Text>
                <Pressable onPress={() => setDetailmodal(!detailmodal)}>
                  <Ionicons name="close" size={24} color="white" />
                </Pressable>
              </View>

              <View style={styles.editmodalbox}>
                <View>
                  <EvilIcons name="user" size={74} color="white" />
                </View>
                <View>
                  <Text style={styles.nametext}>username</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={userdetail?.username}
                  />
                </View>

                <View>
                  <Text style={styles.nametext}>Bio</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.bio ? userdetail?.bio : "Enter your bio"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Instagram</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.instagram
                        ? userdetail?.instagram
                        : "Enter your Instagram username or url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Snapchat</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.snapchat
                        ? userdetail?.snapchat
                        : "Enter your Snapchat username or url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Facebook</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.facebook
                        ? userdetail?.facebook
                        : "Enter your Facebook url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Linkedin</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.linkedin
                        ? userdetail?.linkedin
                        : "Enter you Linkedin url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Twitter</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.twitter
                        ? userdetail?.twitter
                        : "Enter you Twitter username or url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Pinterest</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.pinterest
                        ? userdetail?.pinterest
                        : "Enter you Pinterest url"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Youtube</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.youtube
                        ? userdetail?.youtube
                        : "Enter you Youtube link"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>WhatsApp</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.whatsapp
                        ? userdetail?.whatsapp
                        : "Enter you snapchat username or link"
                    }
                  />
                </View>
                <Pressable style={styles.savebtn} onPress={updateuser}>
                  <Text style={styles.whitesmalltext}>SAVE</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
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
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
export default ProfileUserScreen;
