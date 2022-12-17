import { Image, Pressable, Text,TextInput,View } from "react-native";
import styles from "../css";
import { AntDesign } from '@expo/vector-icons';
export default function Message({navigation}){
    return(
        <>
        <View style={styles.blackBG}>
            <Text style={styles.whiteboldtext}>
                Chats
            </Text>
        <View style = {styles.searchview}>
            <AntDesign name="search1" size={24} color="white" />
            <TextInput style={styles.searchinput} placeholder="search"/> 
        </View>
        <View style={styles.messagebox}>
            
        <Pressable  style={styles.profileicon} onPress={()=>navigation.navigate('Messageview')}>
                  <Image style={styles.profileicon} 
                  source={require('../assets/dp.jpg')}
                  
                  /></Pressable>
                  <Pressable >
                  <Text style={styles.whitesmalltext}>
                    USERNAME
                  </Text>
                  <Text style={styles.biotext}>
                    USERNAME
                  </Text>

                  </Pressable>
        </View>
        
        </View>
        {/* <Pressable onPress={()=>navigation.navigate('Messageview')}>

        <Text>
            TEST MESSAGE HOME
        </Text>
        </Pressable> */}
        </>
    )
}