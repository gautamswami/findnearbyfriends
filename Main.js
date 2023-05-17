import { React, useState, lazy, Suspense, useContext } from "react";
import { Text, View } from "react-native";
import { MyContext } from "./screens/MyContext";

import Login from "./screens/login";
import SignUp from "./screens/signup";
const Nav = lazy(() => import("./nav"));

export default function Main() {
  const { screenVisible, setScreenVisible } = useContext(MyContext);

  return (
    <>
      {screenVisible === "login" ? (
        <Login screen={screenVisible} setScreen={setScreenVisible} />
      ) : screenVisible === "signup" ? (
        <SignUp screen={screenVisible} setScreen={setScreenVisible} />
      ) : (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Nav screen={screenVisible} setScreen={setScreenVisible} />
        </Suspense>
      )}
    </>
  );
}
