import { Button, ScrollView, Pressable, Text, View, Image } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState();
  const [userfriends, setUserfriends] = useState([]);
  const [friendspost, setFriendspost] = useState([]);
  const [address, setAddress] = useState();
  const [cityusers, setCityusers] = useState([]);
  const [userdetail, setUserdetail] = useState([]);
  const [yourname, setYourname] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    getcordinates();
  }, []);
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
    setUserdetail(detail?.data[0]);
    getlocation(location, user);
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
      console.log(err, "err");
    }
  };
  const getcityusers = async (data) => {
    try {
      let cityusers = await axios.post(
        "https://fnfservice.onrender.com/user/getcityusers",
        {
          usercity: data.data.usercity,
        }
      );
      cityusers.data.map(async (users) => {
        let detail = await axios.post(
          "https://fnfservice.onrender.com/user/getuser",
          {
            username: users.username,
          }
        );
        if (detail?.data[0] !== undefined) {
          setCityusers((cityusers) => [...cityusers, detail?.data[0]]);
        }
      });
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

  const users = [
    {
      id: "1",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "one",
    },
    {
      id: "2",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "two",
    },
    {
      id: "3",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "three",
    },
    {
      id: "4",
      dp: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "four",
    },
  ];
  let usericon = "./assets/user.svg";
  return (
    <>
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
            <FontAwesome5 name="user-alt" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.flexcenter}>
          <EvilIcons name="location" size={24} color="white" />
          <Text style={styles.locationtext} numberOfLines={1}>
            {address} ! Hii {userdetail?.username}
          </Text>
        </View>
        {cityusers.length !== 0 && (
          <View>
            <Text style={styles.whiteboldtext}>NEARBY !</Text>
          </View>
        )}

        <View style={styles.flexfar}>
          {cityusers?.map((data, id) => {
            return (
              <>
                {data?.username === yourname ? null : (
                  <View key={id}>
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
                          <EvilIcons name="user" size={74} color="white" />
                        )}
                      </Pressable>
                      <Text style={styles.nametext}>{data.username}</Text>
                    </View>
                  </View>
                )}
              </>
            );
          })}
        </View>

        {userfriends.length !== 0 && (
          <View>
            <Text style={styles.whiteboldtext}>Friends !</Text>
          </View>
        )}
        <View style={styles.flexfar}>
          {userfriends.map((data, id) => {
            return (
              <View key={id}>
                <View>
                  <Pressable
                    key={id}
                    style={styles.profileicon}
                    onPress={() => navigation.navigate("Profile")}
                  >
                    {data.dp ? (
                      <Image
                        style={styles.profileicon}
                        source={{ uri: data.dp }}
                      />
                    ) : (
                      <EvilIcons name="user" size={74} color="white" />
                    )}
                  </Pressable>
                  <Text style={styles.nametext}>{data.username}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {friendspost.length !== 0 && (
          <View>
            <Text style={styles.whiteboldtext}>Posts !</Text>
          </View>
        )}
        <View style={styles.flexfar}>
          {friendspost.map((data, id) => {
            return (
              <>
                {data?.map((image, idi) => {
                  return (
                    <>
                      <Pressable
                        key={id}
                        onPress={() =>
                          navigation.navigate("Profile", {
                            user: image.username,
                            yourdetail: userdetail,
                          })
                        }
                      >
                        <Image style={styles.homepost} source={image.post} />
                      </Pressable>
                      <Text style={styles.nametext}>
                        {image.username.toUpperCase()}
                      </Text>
                    </>
                  );
                })}
              </>
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
    </>
  );
};
export default HomeScreen;
