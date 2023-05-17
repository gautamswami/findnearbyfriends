import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { json } from "react-router-native";
import styles, { ErrorText, HomeBoldText, HomeText, SignUpText } from "./css";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login(props) {
  let { screen, setScreen } = props;
  const [username, SetUsername] = useState();
  const [password, SetPassword] = useState();
  const [error, setError] = useState();

  const checkLogin = async () => {
    const req = {
      username: username,
      password: password,
    };
    let url = "https://fnfservice.onrender.com/user/login";
    var response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      const data = await response.json();
      if (data.message.success) {
        setScreen("home");
        try {
          await AsyncStorage.setItem("user", req.username);
        } catch (error) {
          // console.log(error);
        }
      } else {
        setError("Invalid Credentials");
      }
    } catch (e) {
      setError("OFFLINE");
      // console.log(e);
    }
  };
  useEffect(() => {
    checkUserLogin();
  }, []);
  const checkUserLogin = async () => {
    let userstore = await AsyncStorage.getItem("user");
    
    if (userstore && userstore?.length !== 0) {
      setScreen("home");
    }
    return userstore;
  };
  return (
    <>
      <View style={styles.blackview}>
        <View style={styles.marginauto}>
          <HomeBoldText text={"Welcome Back!"} />
          <HomeText text={"Enter Your Username & Password"} />
          <TextInput
            onChangeText={(username) => SetUsername(username)}
            style={styles.logininput}
            placeholder="username"
          />
          <TextInput
            onChangeText={(password) => SetPassword(password)}
            style={styles.logininput}
            placeholder="password"
            secureTextEntry={true}
          />
          <ErrorText text={error} />
          <View style={styles.flexview}>
            <HomeText text={"New Here ?"} />
            <Pressable onPress={() => setScreen("signup")}>
              <SignUpText text={"Sign Up"} />
            </Pressable>
          </View>
          <Pressable onPress={checkLogin} style={styles.loginbuttonstyle}>
            <HomeText text={"Login"} />
          </Pressable>
        </View>
      </View>
    </>
  );
}
