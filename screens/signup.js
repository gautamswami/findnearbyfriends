import { View, Text, Pressable, TextInput } from "react-native";
import styles, { HomeBoldText, HomeText, SignUpText, ErrorText } from "./css";
import { useState } from "react";
export default function SignUp(props) {
  let { screen, setScreen } = props;
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const signup = async () => {
    const req = {
      username: username,
      email: email,
      password: password,
    };
    var response, data;
    try {
      response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      data = await response.json();
      if (data.message === "sucess") {
        setScreen("home");
      }
      if (data.message.code === 11000) {
        setError("Oops! username already taken!");
      }
    } catch (e) {
      setError("catch error");
    }
  };
  return (
    <>
      <View style={styles.blackview}>
        <View style={styles.marginauto}>
          <HomeBoldText text={"Welcome!"} />
          <HomeText text={"Create your username and password"} />
          <TextInput
            style={styles.logininput}
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
            name={"email"}
          />
          <TextInput
            style={styles.logininput}
            placeholder="username"
            onChangeText={(username) => setUsername(username)}
            name={"username"}
          />
          <ErrorText text={error} />
          <TextInput
            style={styles.logininput}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            name="password"
          />

          <View style={styles.flexview}>
            <HomeText text={"Have Account ?"} />
            <Pressable onPress={() => setScreen("login")}>
              <SignUpText text={"Login"} />
            </Pressable>
          </View>
          <Pressable onPress={() => signup()} style={styles.loginbuttonstyle}>
            <HomeText text={"SignUp"} />
          </Pressable>
        </View>
      </View>
    </>
  );
}
