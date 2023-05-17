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
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import styles, { BioText, HomeText } from "./css";
import { useState, useEffect } from "react";
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
  let { user, yourdetail } = route.params;
  const [expand, setExpand] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [followsent, setFollowSent] = useState(false);

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
    if (userdata?.data[0]?.followbyyourequest?.includes(user)) {
      setFollowSent(true);
    }
    if (userdata?.data[0]?.tofollowyourequest?.includes(user)) {
      setFollowSent("incoming");
    }
    if (userdata?.data[0]?.following?.includes(yourdetail.username)) {
      setFollowSent("follower");
    }
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
    let update = await axios.post(
      "https://fnfservice.onrender.com/user/updateuser",
      {
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
      }
    );
  };
  const updateDp = async () => {
    // launchImageLibrary
  };
  const addfriend = async () => {
    let friendres = await axios.post(
      "https://fnfservice.onrender.com/user/followuser",
      {
        username: yourdetail.username,
        tofollowname: user,
      }
    );
    setFollowSent(true);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.blackBG}>
        <Pressable style={styles.padding2} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <View style={styles.dpview}>
          <EvilIcons name="user" size={74} /> 
          {followsent === "incoming" ? (
            <View>
            <Text>Requested</Text>
          </View>
          ) : followsent === "follower" ? (
            <View>
              <Text>Following</Text>
            </View>
          ) : followsent === true ? (
            <View>
              <Text>Requested</Text>
            </View>
          ) : (
            <Pressable style={styles.dpview} onPress={addfriend}>
              <Ionicons name="ios-person-add-sharp" size={24} />
            </Pressable>
          )}
          <Pressable
            style={styles.dpview}
            onPress={() =>
              navigation.navigate("Messageview", {
                user: userdetail.username,
                yourname: yourdetail?.username,
              })
            }
          >
            <Feather name="message-square" size={24} />
          </Pressable>
        </View>
        <View style={styles.textview}>
          <HomeText text={userdetail?.username} />
          <Text style={expand ? styles.biotext : styles.biolessheighttext}>
            {userdetail?.bio}
          </Text>
          {userdetail?.bio && (
            <Pressable onPress={handleExpand}>
              {expand ? <Text>...less</Text> : <Text>...more</Text>}
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
                <AntDesign name="instagram" size={44} />
              </Pressable>
            )}
            {userdetail?.snapchat && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="snapchat-square" size={44} />
              </Pressable>
            )}
            {userdetail?.facebook && (
              <Pressable style={styles.socialicon}>
                <AntDesign name="facebook-square" size={44} />
              </Pressable>
            )}
            {userdetail?.linkedin && (
              <Pressable style={styles.socialicon}>
                <AntDesign name="linkedin-square" size={44} />
              </Pressable>
            )}
            {userdetail?.twitter && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="twitter-square" size={44} />
              </Pressable>
            )}
            {userdetail?.pinterest && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="pinterest-square" size={44} />
              </Pressable>
            )}
            {userdetail?.youtube && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="youtube" size={44} />
              </Pressable>
            )}
            {userdetail?.whatsapp && (
              <Pressable style={styles.socialicon}>
                <FontAwesome5 name="whatsapp-square" size={44} />
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileUserScreen;

// SOCIAL ICONS COLOURS
// color="#FFFC00"
// color="#3b5998"
// color="#0A66C2"
// color="#3b5998"
// color="#E60023"
// color="red"
// color="black"
