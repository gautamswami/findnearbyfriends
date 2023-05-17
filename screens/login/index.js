import React, { useRef, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LoginPart from "./loginPart";
import SignupPart from "./signupPart";
export default function Login() {
  const [select, setSelect] = useState("signin");
  const ref = useRef();
  const handleToggle = (data) => {
    setSelect(data);
    if (data === "signin") {
      ref.current.style = styles.transform;
    } else if (data === "signup") {
      ref.current.style = styles.tranformfwd;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.flex}>
          <Pressable
            style={select === "signin" ? styles.selectedButton : styles.button}
            onPress={() => handleToggle("signin")}
          >
            <Text
              style={
                select === "signin"
                  ? [styles.selectedButton, styles.buttonText]
                  : [styles.button, styles.buttonText]
              }
            >
              SIGNIN
            </Text>
          </Pressable>
          <Pressable
            style={select === "signup" ? styles.selectedButton : styles.button}
            onPress={() => handleToggle("signup")}
          >
            <Text
              style={
                select === "signup"
                  ? [styles.selectedButton, styles.buttonText]
                  : [styles.button, styles.buttonText]
              }
            >
              SIGNUP
            </Text>
          </Pressable>
          <View
            style={[
              styles.toggle,
              {
                transform: [{ translateX: select === "signup" ? 120 : 0 }],
              },
            ]}
            ref={ref}
          ></View>
        </View>
        <View>{select === "signin" ? <LoginPart /> : <SignupPart />}</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A50CE",
    width: "100%",
    height: "100%",
  },
  center: {
    backgroundColor: "#ffff",
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    padding: "10%",
    borderRadius: 34,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 18,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 0,
    position: "relative",
  },
  toggle: {
    backgroundColor: "#5173DB",
    borderColor: "#6E6BD7",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 18,
    position: "absolute",
    width: "50%",
    height: "100%",
    transition: "0.3s ease",
  },
  selectedButton: {
    color: "white",
    zIndex: 1,
    width: "50%",
    margin: "auto",
    padding: "2%",
  },
  transform: {
    transform: [{ translateX: 0 }],
    backgroundColor: "#5173DB",
    borderColor: "#6E6BD7",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 18,
    position: "absolute",
    width: "50%",
    height: "100%",
    transition: "0.3s ease",
  },
  tranformfwd: {
    transform: [{ translateX: 100 }],
    backgroundColor: "#5173DB",
    borderColor: "#6E6BD7",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 18,
    position: "absolute",
    width: "50%",
    height: "100%",
    transition: "0.3s ease",
  },
  button: {
    color: "black",
    width: "50%",
    margin: "auto",
    padding: "2%",
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    marginLeft:"auto",
    marginLeft:"auto",
    marginLeft:"auto",
    marginRight:"auto"

  },
});
