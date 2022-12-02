import { Text,StyleSheet } from "react-native";

const styles = StyleSheet.create({
    blackview:{
        backgroundColor:"black",
        height:'100%'
    },
    whitesmalltext:{
        color:'white'
    },
    whiteboldtext:{
        fontSize: 30,
        fontWeight:700,
        color:'white'
    },
    logininput:{
        color:'white',
        borderColor:"white",
        borderWidth: 2,
        borderRadius: 10
    }
})
export const HomeText = ({text}) => {return(<Text style={styles.whitesmalltext}>{text}</Text>)};
export const HomeBoldText = ({text}) => {return(<Text style={styles.whiteboldtext}>{text}</Text>)};

export default styles