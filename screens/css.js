import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blackview: {
    backgroundColor: "black",
    height: "100%",
    display:'flex',
    justifyContent:'center'
  },
  marginauto: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  whitesmalltext: {
    color: "white",

    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    // marginBottom:20,
  

  },
  whiteboldtext: {
    color: "white",
    
    fontStyle: " normal",
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    display: "flex",
    alignItems: "center",
    marginBottom:30,
    marginTop:30
    

  },
  logininput: {
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 312,
    padding: "4%",
    outlineStyle: "none",
    marginBottom:20,
    marginTop:10
    

  },
  loginbuttonstyle: {
    backgroundColor: "blue",
    width: 229,
    height: 54,
    display: "flex",
    alignItems:'center',
    marginBottom:10,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent:'center',
    marginTop:'10%'
  },
  flexview: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  signuptext:{
   color:'blue',
   fontStyle: "normal",
   fontWeight:'600',
   fontSize: 18,
   lineHeight: 22,
   marginBottom:50,
   
   marginLeft:10
  },
  errortext:{
    color:'red',
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 22,
    textAlign:'center'
  }
});
export const HomeText = ({ text }) => {
  return <Text style={styles.whitesmalltext}>{text}</Text>;
};
export const HomeBoldText = ({ text }) => {
  return <Text style={styles.whiteboldtext}>{text}</Text>;
};
export const SignUpText = ({text}) => {
    return <Text style={styles.signuptext}>{text}</Text>
}
export const ErrorText = ({text}) =>{
  return <Text style={styles.errortext}>{text}</Text>
}

export default styles;
