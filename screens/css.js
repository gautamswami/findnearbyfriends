import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blackview: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  blackBG: {
    paddingTop: 40,
  },
  marginauto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  blacksmalltext: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
  },
  whitesmalltext: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
  },
  whiteboldtext: {
    textAlign: "left",
    placeContent: "center",
    fontStyle: " normal",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 39,
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    paddingLeft: 5,
  },
  logininput: {
    borderWidth: 1,
    borderRadius: 5,
    width: "70%",
    padding: "2%",
    margin: 10,
    outlineStyle: "none",
   marginBottom:0,
    marginTop: 10,
    marginRight:2
  },
  messageSendBtn: {
    backgroundColor:'black',
    padding:"2%",
    height:'70%',
    width:90,
    borderRadius:10
  },
  messageSendText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    color:'white'
  },
  loginbuttonstyle: {
    backgroundColor: "#4d4fa9",
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
    color: "#ffff",
  },
  flexview: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  signuptext: {
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
    alignItems: "center",
  },
  dpimage: {
    width: 100,
    height: 100,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "black",
    // padding: 3,
    shadowColor: "black",
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
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    maxWidth: 140,
    lineHeight: 22,
    color: "gray",
  },
  biolessheighttext: {
    fontStyle: "normal",
    fontWeight: "400",
    color: "gray",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 120,
    maxHeight: 42,
    overflow: "hidden",
  },
  nametext: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 140,
    maxHeight: 22,
    overflow: "hidden",
  },
  socialview: {
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "gray",
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomColor: "#e5e5e5",
    padding: "2%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  unapprovedText: {
    color: "gray",
    fontWeight: "500",
    textShadowColor: "#888484",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
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
  flexfar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    alignItems: "center",
    flexWrap: "wrap",
    minWidth: 80,
  },

  logoimage: {
    width: 100,
    height: 50,
    img: {
      width: "100%",
    },
  },
  locationtext: {
    width: 200,
  },
  flexcenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flexgap: {
    display: "flex",
    flexDirection: "row",
  },
  neabyGap: {
    marginRight: 10,
  },
  profileicon: {
    // borderWidth: 1,
    // borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 4,
    width: 70,
    height: 80,
    // img: {
    //   width: "100%",
    // },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  homepost: {
    margin: 4,
    borderRadius: 5,
    width: 300,
    height: 180,
    overflow: "hidden",
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 4,
    backgroundColor: "#afafaf63",
    margin: 2,
    borderRadius: 5,
  },
  postpressable: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4, // Add elevation for the shadow effect
    padding: 6,
    marginBottom: 10,
  },
  searchview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    outlineStyle: "none",
    marginLeft: 10,
    marginRight: 10,
  },
  searchinput: {
    borderRadius: 10,
    width: "90%",
    padding: "2%",
    outlineStyle: "none",
  },
  messagebox: {
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    padding: "1%",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#dedede",
    borderRadius: 20,
    padding: 8,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    minWidth: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalreq: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  editmodalbox: {
    width: "100%",
    padding: 10,
  },
  approveBtn: {
    backgroundColor: "black",
    padding: 5,
  },
  declineBtn: {
    backgroundColor: "white",
    padding: 5,
  },
  editmodalinput: {
    color: "black",
    borderRadius: 2,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    width: "100%",
    padding: "2%",
    outlineStyle: "none",
    marginBottom: 10,
    marginTop: 10,
  },
  savebtn: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
  },
  postflex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  receiverMessageView: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 10,
    margin: 10,
    marginRight: 40,
    marginLeft: 5,
  },
  senderMessageView: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",

    margin: 10,
    marginRight: 40,
    marginLeft: 5,
  },
  messageImage: {
    width: 60,
    height: 60,
    padding: 1,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  messageIncomingstyle: {
    padding: 8,
    backgroundColor: "rgba(164,164,164,1)",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 1,
  },
  messageTextstyle: {
    padding: 8,
    backgroundColor: "#d8d8d8",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  messageHeaderImage: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  messageHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 1,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
export const HomeText = ({ text }) => {
  return <Text style={styles.blacksmalltext}>{text}</Text>;
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
