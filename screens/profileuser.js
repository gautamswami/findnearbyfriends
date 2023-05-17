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
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { EvilIcons } from "@expo/vector-icons";
import styles, { BioText, HomeText } from "./css";
import React, { useState, useEffect } from "react";
import ImagePic from "./imagepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendModal from "./friendModal";
import DetailModal from "./detailModal";
const socialdata = [
  {
    insta: "one",
    fb: "fb2",
    snap: "snap3",
  },
];
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

  const updateDp = async () => {
    // launchImageLibrary
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
            <Pressable style={styles.padding2}>
              <AntDesign name="plussquareo" size={24} />
            </Pressable>
          </View>
        </View>

        <View style={styles.dpview}>
          {userdetail?.dp ? (
            <Image style={styles.dpimage} source={{ uri: userdetail?.dp }} />
          ) : (
            <EvilIcons name="user" size={74} />
          )}
          <Text>{userdetail?.username}</Text>
          <Pressable style={styles.dpview} onPress={detailExpand}>
          <MaterialCommunityIcons name="account-edit" size={24} color="black" />
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
                (userdetail?.bio?.length > 18) &&
                expand === false  &&
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
              <Pressable style={styles.socialicon}>
                <AntDesign name="instagram" size={34} />
              </Pressable>
            )}
            {userdetail?.snapchat && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="snapchat-square" size={34} />
              </Pressable>
            )}
            {userdetail?.facebook && (
              <Pressable style={styles.socialicon}>
                <AntDesign name="facebook-square" size={34} />
              </Pressable>
            )}
            {userdetail?.linkedin && (
              <Pressable style={styles.socialicon}>
                <AntDesign name="linkedin-square" size={34} />
              </Pressable>
            )}
            {userdetail?.twitter && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="twitter-square" size={34} />
              </Pressable>
            )}
            {userdetail?.pinterest && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="pinterest-square" size={34} />
              </Pressable>
            )}
            {console.log(userdetail,'ud')}
            {userdetail?.youtube && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="youtube" size={34} />
              </Pressable>
            )}
            {userdetail?.whatsapp && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="whatsapp-square" size={34} />
              </Pressable>
            )}
          </View>
        )}
        {userpost?.length !== 0 && (
          <View style={styles.socialview}>
            {userpost?.map((post) => {
              return (
                <Image
                  source={{ uri: post?.posturl }}
                  style={styles.postimage}
                />
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
