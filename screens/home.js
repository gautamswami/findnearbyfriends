import {
  Button,
  ScrollView,
  Pressable,
  Text,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";

import styles from "./css";
import { MyContext } from "./MyContext";

const HomeScreen = ({ navigation }) => {
  const { screenVisible, setScreenVisible } = useContext(MyContext);
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState();
  const [userfriends, setUserfriends] = useState([]);
  const [friendspost, setFriendspost] = useState([]);
  const [address, setAddress] = useState();
  const [cityusers, setCityusers] = useState([]);
  const [userdetail, setUserdetail] = useState([]);
  const [yourname, setYourname] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getcordinates();
    }
  }, [isFocused]);
  const getcordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    getUser(location);
  };
  const getUser = async (location) => {
    let user = await AsyncStorage.getItem("user");
    setYourname(user);
    let detail = await axios.post(
      "https://fnfservice.onrender.com/user/getuser",
      {
        username: user,
      }
    );
    if (detail?.data[0]) {
      setUserdetail(detail?.data[0]);
      getlocation(location, user);
    } else if (!detail?.data[0]) {
      await AsyncStorage.clear();
      setScreenVisible("login");
    }
  };
  const getlocation = async (data, user) => {
    let res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.coords.latitude}&lon=${data.coords.longitude}&limit=5&appid=641a5559c22d56fbfc9ca69c1c7d7876`
    ).then((res) => res.json());

    setAddress(res[0].name);
    try {
      const loc = await axios.post(
        "https://fnfservice.onrender.com/user/addlocation",
        {
          username: user,
          userlongitude: res[0].lon,
          userlatitude: res[0].lat,
          usercity: res[0].name,
        },
        { "Content-Type": "multipart/form-data" }
      );
      getcityusers(loc);
    } catch (err) {
      // console.log(err, "err");
    }
  };
  const getcityusers = async (data) => {
    try {
      let city = await axios.post(
        "https://fnfservice.onrender.com/user/getcityusers",
        {
          usercity: data?.data?.usercity || "gurugram",
        }
      );

      setCityusers(city?.data);
      // cityusers.data.map(async (users) => {
      //   let detail = await axios.post(
      //     "https://fnfservice.onrender.com/user/getuser",
      //     {
      //       username: users.username,
      //     }
      //   );
      //   if (detail?.data[0] !== undefined) {
      //     setCityusers((cityusers) => [...cityusers, detail?.data[0]]);
      //   }
      // });
      getFriends();
    } catch (error) {}
  };
  const getFriends = async () => {
    let user = await AsyncStorage.getItem("user");
    let detail = await axios.post(
      "https://fnfservice.onrender.com/user/getuser",
      {
        username: user,
      }
    );
    setUserdetail(detail?.data[0]);
    detail?.data[0]?.following?.map(async (users) => {
      let detail = await axios.post(
        "https://fnfservice.onrender.com/user/getuser",
        {
          username: users,
        }
      );
      let userpost = await axios.post(
        "https://fnfservice.onrender.com/user/getpost",
        {
          username: users,
        }
      );
      if (userpost?.data) {
        setFriendspost((friendspost) => [...friendspost, userpost?.data]);
      }
      if (detail?.data[0] !== undefined) {
        setUserfriends((userfriends) => [...userfriends, detail?.data[0]]);
      }
    });
  };

  return (
    <>
      {/* <SafeAreaView> */}
      <ScrollView style={styles.blackBG}>
        <View style={styles.flexfar}>
          <Image
            style={styles.logoimage}
            source={require("./assets/fnflogo.png")}
          />
          <Pressable
            onPress={() =>
              navigation.navigate("Myprofile", { user: userdetail.username })
            }
          >
            <FontAwesome5 name="user-alt" size={24} />
          </Pressable>
        </View>
        <View style={styles.flexcenter}>
          <EvilIcons name="location" size={24} />
          <Text style={styles.locationtext} numberOfLines={1}>
            {address} ! Hii {userdetail?.username}
          </Text>
        </View>
        {cityusers.length !== 0 && (
          <View>
            <Text style={styles.whiteboldtext}>People near you</Text>
          </View>
        )}
        <ScrollView horizontal={true} style={styles.flexgap}>
          {cityusers?.map((data, id) => {
            return (
              <View key={`nearby-${id}`} style={styles.neabyGap}>
                {!data?.username || data?.username === yourname || data?.username === undefined ? null : (
                  <View>
                    <Pressable
                      key={id}
                      style={styles.profileicon}
                      onPress={() =>
                        navigation.navigate("Profile", {
                          user: data.username,
                          yourdetail: userdetail,
                        })
                      }
                    >
                      <SvgUri
                        uri={`https://avatars.dicebear.com/api/micah/${data.username}.svg`}
                        width={60}
                        height={60}
                        style={styles.dpimage}
                      />
                    </Pressable>
                    <Text style={styles.nametext}>{data.username}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        {userfriends?.length !== 0 && (
          <View>
            <Text style={styles.whiteboldtext}>People you follow</Text>
          </View>
        )}
        <ScrollView horizontal={true} style={styles.flexgap}>
          {userfriends?.map((data, id) => {
            return (
              <View key={`friend-${id}`} style={styles.neabyGap}>
                <View>
                  <Pressable
                    key={id}
                    style={styles.profileicon}
                    onPress={() =>
                      navigation.navigate("Profile", {
                        user: data.username,
                        yourdetail: userdetail,
                      })
                    }
                  >
                    {data.dp ? (
                      <Image
                        style={styles.profileicon}
                        source={{ uri: data.dp }}
                      />
                    ) : (
                      <EvilIcons name="user" size={54} />
                    )}
                  </Pressable>
                  <Text style={styles.nametext}>{data.username}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.postflex}>
          {friendspost?.map((data, id) => {
            return (
              <View key={`postid-${id}`}>
                {data?.map((image, idi) => {
                  return (
                    <Pressable
                      key={idi}
                      onPress={() =>
                        navigation.navigate("Profile", {
                          user: image.username,
                          yourdetail: userdetail,
                        })
                      }
                      style={styles.postpressable}
                    >
                      <Image
                        style={styles.homepost}
                        source={{ uri: image?.post }}
                      />
                      <Text style={styles.nametext}>
                        {image.username.toUpperCase()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </View>
        {/* <Pressable onPress={() => navigation.navigate("Myprofile")}>
        <Text>CLICK TO OPEN YOUR PROFILE</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text>CLICK TO OTHER PROFILE</Text>
      </Pressable> */}
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};
export default HomeScreen;
