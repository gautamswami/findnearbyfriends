import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { json } from "react-router-native";
import styles, { ErrorText, HomeBoldText, HomeText, SignUpText } from "./css";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login(props) {
  let { screen, setScreen } = props;
  const [username, SetUsername] = useState();
  const [password, SetPassword] = useState();
  const [error, setError] = useState();
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", "THIS IS A TEST HERE");
    } catch (e) {
      // saving error
    }
  };
  const checkLogin = async () => {
    // try {
    //   const value = await AsyncStorage.getItem('@storage_Key')
    //   console.log(value)
    //   if(value !== null) {
    //     // value previously stored
    //   }
    // } catch(e) {
    //   // error reading value
    // }
    const req = {
      username: username,
      password: password,
    };
    let url = "http://localhost:3000/user/login";
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
      } else {
        setError("Invalid Credentials");
      }
    } catch (e) {
      setError("catched error");
      console.log(e);
    }
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
          <Pressable
            onPress={checkLogin}
            style={styles.loginbuttonstyle}
          >
            <HomeText text={"Login"} />
          </Pressable>
        </View>
      </View>
    </>
  );
}
