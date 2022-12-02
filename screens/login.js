import { View, Text, Pressable, TextInput } from "react-native";
import styles,{HomeBoldText, HomeText } from "./css";

export default function Login(props) {
  let { screen, setScreen } = props;
  return (
    <>
      <View style={styles.blackview}>
        <View>
        <HomeBoldText text={'Login'}/>
        <HomeText text={'usename / mail'} />
        <TextInput style={styles.logininput} placeholder="username / mail"/>
        <HomeText text={'password'} />
        <TextInput style={styles.logininput} placeholder="password"/>
        <Pressable onPress={() => setScreen("home")}>
          
        <HomeText text={'Login'}/>
        </Pressable>
        <HomeText text={'New Here ?'} />
        <Pressable ><HomeText text={'Sign Up'}/></Pressable>
        </View>
      </View>
    </>
  );
}
