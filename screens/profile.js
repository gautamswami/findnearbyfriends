import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles, { BioText, HomeText } from "./css";
import { useState } from "react";
const Dp = require("./assets/dp.jpg");
const socialdata = [
  {
    insta: "one",
    fb: "fb2",
    snap: "snap3",
  },
];
const ProfileScreen = ({navigation}) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <ScrollView style={styles.blackBG}>
      <Pressable style={styles.padding2} onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </Pressable>
      <View style={styles.dpview}>
        <Image style={styles.dpimage} source={Dp} />

        <Pressable style={styles.dpview}>
          <Ionicons name="ios-person-add-sharp" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.dpview}>
          <Feather name="message-square" size={24} color="white" />
        </Pressable>
      </View>
      <View style={styles.textview}>
        <HomeText text="USERNAME" />
        <Text style={expand ? styles.biotext : styles.biolessheighttext}>
          BIO THIS IS MY BIO ABOUT THIS PROFILE BIO THIS IS MY BIO ABOUT THIS
          PROFILEBIO THIS IS MY BIO ABOUT THIS PROFILEBIO THIS IS MY BIO ABOUT
          THIS PROFILEBIO THIS IS MY BIO ABOUT THIS PROFILEBIO THIS IS MY BIO
          ABOUT THIS PROFILEBIO THIS IS MY BIO ABOUT THIS PROFILEBIO THIS IS MY
          BIO ABOUT THIS PROFILE
        </Text>
        <Pressable onPress={handleExpand}>
          {expand ? (
            <Text style={{ color: "white" }}>...less</Text>
          ) : (
            <Text style={{ color: "white" }}>...more</Text>
          )}
        </Pressable>
      </View>
      <View style={styles.socialview}>
        <Pressable style={styles.socialicon}>
          
            <AntDesign name="instagram" size={44} color="#d62976" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <FontAwesome5 name="snapchat-square" size={44} color="#FFFC00" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable >
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>  
        <Pressable style={styles.socialicon}>
            <AntDesign name="facebook-square" size={44} color="#3b5998" />
        </Pressable>
      </View>
      <View style={styles.socialview}>
      <Image source={Dp} style={styles.postimage} />
      <Image source={Dp} style={styles.postimage} />
      <Image source={Dp} style={styles.postimage} />
      <Image source={Dp} style={styles.postimage} />

      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
