import { React, useState, lazy, Suspense, useContext } from "react";
import { MyContextProvider } from "./screens/MyContext";
import Main from "./Main";
export default function App() {
  return (
    <MyContextProvider>
      <Main />
    </MyContextProvider>
  );
}
