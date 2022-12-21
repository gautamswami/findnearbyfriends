import { Button, ScrollView, Pressable, Text, View, Image } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import styles from "./css";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [address, setAddress] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      getlocation(location);

      // .then(async () => {
      // let data = await fetch(
      //   `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=5&appid=641a5559c22d56fbfc9ca69c1c7d7876`
      // ).then((res) => res.json());
      // setAddress(data);
      // console.log(data, "long lat");
      // });
    })();
  }, []);
  const getlocation = async (data) => {
    console.log(data.coords);
    let res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.coords.latitude}&lon=${data.coords.longitude}&limit=5&appid=641a5559c22d56fbfc9ca69c1c7d7876`
    ).then((res)=>res.json());
    console.log(res[0],'res')
    setAddress(res[0].name)
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
  return (
    <>
      <ScrollView style={styles.blackBG}>
        <View style={styles.flexfar}>
          <Image
            style={styles.logoimage}
            source={require("./assets/logo.png")}
          />
          <Pressable onPress={() => navigation.navigate("Myprofile")}>
            <FontAwesome5 name="user-alt" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.flexcenter}>
          <EvilIcons name="location" size={24} color="white" />
          <Text style={styles.locationtext} numberOfLines={1}>
            {address}
          </Text>
        </View>
        <View>
          <Text style={styles.whiteboldtext}>NEARBY !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data, id) => {
            return (
              <Pressable
                key={id}
                style={styles.profileicon}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  style={styles.profileicon}
                  source={data.dp}
                  // ./assets/dp.jpg
                />
              </Pressable>
            );
          })}
        </View>
        <View>
          <Text style={styles.whiteboldtext}>Friends !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data, id) => {
            return (
              <Pressable
                key={id}
                style={styles.profileicon}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  style={styles.profileicon}
                  source={data.dp}
                  // ./assets/dp.jpg
                />
              </Pressable>
            );
          })}
        </View>
        <View>
          <Text style={styles.whiteboldtext}>Posts !</Text>
        </View>
        <View style={styles.flexfar}>
          {users.map((data, id) => {
            return (
              <Pressable
                key={id}
                style={styles.homepost}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  style={styles.homepost}
                  source={data.dp}
                  // ./assets/dp.jpg
                />
              </Pressable>
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
