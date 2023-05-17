import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import styles from "./css";
import { Ionicons } from "@expo/vector-icons";
import ImagePic from "./imagepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailModal({
  detailmodal,
  setDetailmodal,
  userdetail,
  user,
  getUser,
  route,
  navigation,
}) {
  const [username, setUsername] = useState(userdetail?.username);
  const [userbio, setUserbio] = useState(userdetail?.bio);
  const [userinstagram, setUserinstagram] = useState(userdetail?.instagram);
  const [usersnapchat, setUsersnapchat] = useState(userdetail?.snapchat);
  const [userfacebook, setUserfacebook] = useState(userdetail?.facebook);
  const [userlinkedin, setUserlinkedin] = useState(userdetail?.linkedin);
  const [usertwitter, setUsertwitter] = useState(userdetail?.twitter);
  const [userpinterest, setUserpinterest] = useState(userdetail?.pinterest);
  const [useryoutube, setUseryoutube] = useState(userdetail?.youtube);
  const [userwhatsapp, setUserwhatsapp] = useState(userdetail?.whatsapp);

  const updateuser = async () => {
    let update = await axios.post(
      "https://fnfservice.onrender.com/user/updateuser",
      {
        find: {
          username: user,
        },
        update: {
          username: username,
          bio: userbio,
          instagram: userinstagram,
          snapchat: usersnapchat,
          facebook: userfacebook,
          linkedin: userlinkedin,
          twitter: usertwitter,
          youtube: useryoutube,
          pinterest: userpinterest,
          whatsapp: userwhatsapp,
        },
      }
    );
    if (user !== update?.data?.username) {
      await AsyncStorage.setItem("user", update?.data?.username);
      navigation.navigate("Home");
    } else if (
      Object.keys(update).length === 0 &&
      update.constructor === Object
    ) {
      ToastAndroid.show("Please try another username", ToastAndroid.SHORT);
    } else if (Object.keys(update).length !== 0) {
      setDetailmodal(!detailmodal);
      getUser();
    }
  };
  return (
    <View>
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
                <Text style={styles.blacksmalltext}>Edit Details</Text>
                <Pressable onPress={() => setDetailmodal(!detailmodal)}>
                  <Ionicons name="close" size={24} />
                </Pressable>
              </View>

              <View style={styles.editmodalbox}>
                <View>
                  <ImagePic />
                </View>
                <View>
                  <Text style={styles.nametext}>Username</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={userdetail?.username || "username"}
                    onChangeText={(username) => setUsername(username)}
                  />
                </View>

                <View>
                  <Text style={styles.nametext}>Bio</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.bio ? userdetail?.bio : "Enter your bio"
                    }
                    onChangeText={(userbio) => setUserbio(userbio)}
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>Instagram</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.instagram
                        ? userdetail?.instagram
                        : "Enter your Instagram username"
                    }
                    onChangeText={(userinstagram) =>
                      setUserinstagram(userinstagram)
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
                        : "Enter your Snapchat username"
                    }
                    onChangeText={(usersnapchat) =>
                      setUsersnapchat(usersnapchat)
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
                    onChangeText={(userfacebook) =>
                      setUserfacebook(userfacebook)
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
                    onChangeText={(userlinkedin) =>
                      setUserlinkedin(userlinkedin)
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
                        : "Enter you Twitter username"
                    }
                    onChangeText={(usertwitter) => setUsertwitter(usertwitter)}
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
                    onChangeText={(userpinterest) =>
                      setUserpinterest(userpinterest)
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
                    onChangeText={(useryoutube) => setUseryoutube(useryoutube)}
                  />
                </View>
                <View>
                  <Text style={styles.nametext}>WhatsApp</Text>
                  <TextInput
                    style={styles.editmodalinput}
                    placeholder={
                      userdetail?.whatsapp
                        ? userdetail?.whatsapp
                        : "Enter you whatsapp number"
                    }
                    onChangeText={(userwhatsapp) =>
                      setUserwhatsapp(userwhatsapp)
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
    </View>
  );
}
