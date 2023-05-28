import {
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import styles, { BioText, HomeText } from "./css";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileUserScreen = ({ route, navigation }) => {
  let { user, yourdetail } = route.params;
  const [expand, setExpand] = useState(false);
  const [followsent, setFollowSent] = useState(false);
  const [userdetail, setUserdetail] = useState();
  const [userpost, setUserpost] = useState();
  const handleExpand = () => {
    setExpand(!expand);
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
    } else if (
      userdata?.data[0]?.tofollowyourequest?.includes(yourdetail.username)
    ) {
      setFollowSent("incoming");
    } else if (yourdetail?.following?.includes(user)) {
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
  function getNumber(inputString) {
    let hash = 0;
    let options = ["avataaars", "micah", "bottts", "gridy", "human"];
    for (let i = 0; i < inputString.length; i++) {
      hash = inputString.charCodeAt(i) + ((hash << 4) - hash);
    }
    const number = Math.abs(hash % 4);
    let res = options[number];
    return res;
  }
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
  return (
    <SafeAreaView>
      {userdetail?.username ? (
        <ScrollView style={styles.blackBG}>
          <Pressable
            style={styles.padding2}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
          <SvgUri
            uri={`https://avatars.dicebear.com/api/${getNumber(
              userdetail?.username
            )}/${userdetail?.username}.svg`}
            width={60}
            height={60}
            style={styles.dpimage}
          />
          <View style={styles.dpview}>
            <Text>{userdetail?.username} </Text>
            {followsent === "incoming" ? (
              <View>
                <Text>Requested</Text>
              </View>
            ) : followsent === "follower" ? (
              <View>
                <Text></Text>
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
                navigation.navigate("Messages", {
                  user: userdetail.username,
                  yourdetail: yourdetail,
                })
              }
            >
              <Feather name="message-square" size={24} />
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
                  <Pressable key={`postkey-${id}`} style={styles.postpressable}>
                    <Image
                      style={styles.homepost}
                      source={{ uri: post?.post }}
                      // style={styles.postimage}
                    />
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.blackBG}>
          <Pressable
            style={styles.padding2}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
          <View style={styles.searchview}>
            <SvgUri
              uri={`https://avatars.dicebear.com/api/avataaars/undefined.svg`}
              width={100}
              height={100}
              style={styles.dpimage}
            />

            <Text style={styles.unapprovedText}>UNAPPROVED USER</Text>
          </View>
        </ScrollView>
      )}
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
