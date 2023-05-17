import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, Image, Button } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function ImagePic() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

 
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!image ? (
        <EvilIcons name="user" size={74} color="white" />
      ) : (
        <Image source={{ uri: image }} style={{ width: 74, height: 74, borderRadius:50 }} />
      )}
      <Button title="SELECT IMAGE" onPress={pickImage} />
    </View>
  );
}
