import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
// import { useNavigate } from "react-router-native";

export default function LoginPart() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate();
    const handleSignin = () => {
    //   navigate("/home");
    };
    return (<View style={styles.container}>
        <TextInput style={styles.input} placeholder="Enter username" onChangeText={username => setUsername(username)} />
        <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry onChangeText={password => setPassword(password)} />
        <Pressable style={styles.button} onPress={() => handleSignin()}><Text style={styles.buttonText}>Sign In</Text></Pressable>
    </View>)
}
const styles = StyleSheet.create({
    input: {
        // fontStyle: 'normal',
        // fontWeight: 400,
        // fontSize: 12,
        // lineHeight: 1,
        color: '#464646',
        borderBottomColor: '#EAEAF5',
        borderBottomWidth: 1,
        padding: '3%',
        marginBottom: 20
    },
    container: {
        paddingTop: 20
    },
    button: {
        width: 225,
        height: 44,
        backgroundColor: '#5173DB',
        borderRadius: 39,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        // fontStyle: 'normal',
        // fontWeight: 500,
        // fontSize: 16,
        color: '#FFFFFF'

    }
})