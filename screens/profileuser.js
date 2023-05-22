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
  Linking,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import styles, { BioText, HomeText } from "./css";
import React, { useState, useEffect } from "react";
import ImagePic from "./imagepicker";
import axios from "axios";
import { SvgUri } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendModal from "./friendModal";
import DetailModal from "./detailModal";

const ProfileUserScreen = ({ route, navigation }) => {
  let { user } = route.params;
  const [expand, setExpand] = useState(false);
  const [detailmodal, setDetailmodal] = useState(false);
  const [userdetail, setUserdetail] = useState();
  const [userpost, setUserpost] = useState();
  const [friendmodal, setFriendmodal] = useState();
  const handleExpand = () => {
    setExpand(!expand);
  };
  const detailExpand = () => {
    setDetailmodal(!detailmodal);
  };
  const friendExpand = () => {
    setFriendmodal(!friendmodal);
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
  const handleLink = async (url, name) => {
    let link;
    switch (name) {
      case "instagram":
        link = `https://www.instagram.com/${url}`;
        break;
      case "snapchat":
        link = `https://www.snapchat.com/add/${url}`;
        break;
      case "facebook":
        link = `https://www.facebook.com/${url}`;
        break;
      case "linkedin":
        link = `${url}`;
        break;
      case "twitter":
        link = `https://www.twitter.com/${url}`;
        break;
      case "pinterest":
        link = `https://www.pinterest.com/${url}`;
        break;
      case "youtube":
        link = `${url}`;
        break;
      case "whatsapp":
        link = `https://wa.me/${url}`;
        break;
      default:
        link = `https://www.google.com/search?q=${url}`;
    }
    Linking.openURL(link);
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
  const handleDelete = (id) => {
    let res = axios.post("https://fnfservice.onrender.com/user/deletepost", {
      id: id,
    });
    getUserpost();
    ToastAndroid.show("DELETED THE IMAGE", ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.blackBG}>
        <View style={styles.flexfar}>
          <Pressable
            style={styles.padding2}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
          <View>
            <ImagePic
              content={"userPost"}
              username={userdetail?.username}
              getUserpost={getUserpost}
            />
          </View>
        </View>

        {userdetail?.dp ? (
          <Image style={styles.dpimage} source={{ uri: userdetail?.dp }} />
        ) : (
          <SvgUri
            uri={`https://avatars.dicebear.com/api/${getNumber(
              userdetail?.username
            )}/${userdetail?.username}.svg`}
            width={60}
            height={60}
            style={styles.dpimage}
          />
        )}
        <View style={styles.dpview}>
          <Text>{userdetail?.username}</Text>
          <Pressable style={styles.dpview} onPress={detailExpand}>
            <MaterialCommunityIcons
              name="account-edit"
              size={24}
              color="black"
            />
            <Text>About</Text>
          </Pressable>
          <Pressable style={styles.dpview} onPress={friendExpand}>
            <FontAwesome5 name="user-friends" size={20} color="black" />
            <Text>
              Followers
              {userdetail?.followers.length !== 0 && (
                <Text> {userdetail?.followers.length}</Text>
              )}
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={handleExpand} style={styles.textview}>
            <Text style={expand ? styles.biotext : styles.biolessheighttext}>
              {userdetail?.bio}
            </Text>
            <Text>
              {userdetail?.bio &&
                userdetail?.bio?.length > 18 &&
                expand === false &&
                "...."}
            </Text>
          </Pressable>
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
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.instagram, "instagram")}
              >
                <AntDesign name="instagram" size={34} />
              </Pressable>
            )}
            {userdetail?.snapchat && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.snapchat, "snapchat")}
              >
                <FontAwesome5 name="snapchat-square" size={34} />
              </Pressable>
            )}
            {userdetail?.facebook && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.facebook, "facebook")}
              >
                <AntDesign name="facebook-square" size={34} />
              </Pressable>
            )}
            {userdetail?.linkedin && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.linkedin, "linkedin")}
              >
                <AntDesign name="linkedin-square" size={34} />
              </Pressable>
            )}
            {userdetail?.twitter && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.twitter, "twitter")}
              >
                <FontAwesome5 name="twitter-square" size={34} />
              </Pressable>
            )}
            {userdetail?.pinterest && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.pinterest, "pinterest")}
              >
                <FontAwesome5 name="pinterest-square" size={34} />
              </Pressable>
            )}
            {userdetail?.youtube && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.youtube, "youtube")}
              >
                <FontAwesome5 name="youtube" size={34} />
              </Pressable>
            )}
            {userdetail?.whatsapp && (
              <Pressable
                style={styles.socialicon}
                onPress={() => handleLink(userdetail?.whatsapp, "whatsapp")}
              >
                <FontAwesome5 name="whatsapp-square" size={34} />
              </Pressable>
            )}
          </View>
        )}
        {userpost?.length !== 0 && (
          <View style={styles.postflex}>
            {userpost?.map((post, id) => {
              return (
                <View key={`postkey-${id}`} style={styles.postpressable}>
                  <Image
                    style={styles.homepost}
                    source={{ uri: post?.post }}
                    // style={styles.postimage}
                  />
                  <Pressable onPress={() => handleDelete(post?._id)} style={styles.deleteButton}>
                    <Text >
                      <MaterialIcons name="delete" size={24} color="black" />
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
        <DetailModal
          detailmodal={detailmodal}
          setDetailmodal={setDetailmodal}
          userdetail={userdetail}
          user={user}
          getUser={getUser}
          navigation={navigation}
        />
        {friendmodal && (
          <FriendModal
            user={user}
            friendmodal={friendmodal}
            setFriendmodal={setFriendmodal}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileUserScreen;
