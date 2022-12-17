import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blackview: {
    backgroundColor: "black",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  blackBG: {
    backgroundColor: "black",
  },
  marginauto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  whitesmalltext: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
  },
  whiteboldtext: {
    color: "white",

    fontStyle: " normal",
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 39,
    display: "flex",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  logininput: {
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 312,
    padding: "4%",
    outlineStyle: "none",
    marginBottom: 20,
    marginTop: 10,
  },
  loginbuttonstyle: {
    backgroundColor: "blue",
    width: 229,
    height: 54,
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    marginTop: "10%",
    borderRadius: 15,
  },
  flexview: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  signuptext: {
    color: "blue",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 50,

    marginLeft: 10,
  },
  errortext: {
    color: "red",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 22,
    textAlign: "center",
  },
  padding2: {
    padding: "2%",
  },
  dpview: {
    padding: "4%",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  dpimage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  textview: {
    padding: "4%",
    display: "flex",
  },
  biotext: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
  },
  biolessheighttext: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
    height: 40,
    overflow: "hidden",
  },
  socialview: {
    borderTopColor: "white",
    borderRadius: 35,
    borderWidth: 2,
    padding: "4%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'center',
    
  },
  socialicon: {
    margin: 9,
    borderRadius: 5,
  },
  postimage: {
    margin: 4,
    borderRadius: 5,
    width: 100,
    height: 100,
  },
  flexfar:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:'2%',
    alignItems:'center',
 
    flexWrap:'wrap'
  },
  logoimage:{
    width:100,
    height:50,
    img:{
      width:'100%'
    },
  },
  locationtext:{
    color:'white',
    width:150,
  },
  flexcenter:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  profileicon:{
    
    borderWidth:1,
    borderRadius:10,
    width:80,
    height:80,
    img:{
      width:'100%'
    }
  },
  homepost:{
    margin: 4,
    borderRadius: 5,
    width: 250,
    height: 250,
  },
  searchview:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    outlineStyle: "none",
    marginLeft:10,
    marginRight:10
  },
  searchinput:{
    color: "white",
     
   
    borderRadius: 10,
    width:'90%',
    padding: "2%",
    outlineStyle: "none",
 
  },
  messagebox:{
    marginLeft:10,
    marginRight:10,
    borderColor:'white',
    borderWidth:2,
    padding:"1%",
  }
});
export const HomeText = ({ text }) => {
  return <Text style={styles.whitesmalltext}>{text}</Text>;
};
export const HomeBoldText = ({ text }) => {
  return <Text style={styles.whiteboldtext}>{text}</Text>;
};
export const SignUpText = ({ text }) => {
  return <Text style={styles.signuptext}>{text}</Text>;
};
export const ErrorText = ({ text }) => {
  return <Text style={styles.errortext}>{text}</Text>;
};
export const BioText = ({ text }) => {
  return <Text style={styles.biotext}>{text}</Text>;
};
export default styles;
