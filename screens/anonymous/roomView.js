import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function RoomView({ route }) {
  let { roomname, yourlocation } = route.params;
  console.log(route.params, "rp");
  useEffect(() => {
    getRoomMessages();
  }, []);
  const getRoomMessages = async () => {
    let roomMessage = await axios.get(
      "https://fnfservice.onrender.com/user/getmessageroom",
      {
        roomname: roomname,
      }
    );
    console.log(roomMessage, "rm");
  };
  return (
    <View>
      <Text>{roomname}</Text>
    </View>
  );
}
