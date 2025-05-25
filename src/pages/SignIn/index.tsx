import React, { useContext, useState } from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { UserAuthContext } from "../../contexts/AuthContext";



export default function SignIn(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


const {user, signIn, loadingUser} = useContext(UserAuthContext)

async function handleFunction(){


    if(email === "" || password ===""){
        return
    }

    await signIn({
        email,
        password
    })
}


    return(
        <View style={styles.container}>
            <Image source={require("../../assets/logo.svg")}/>
            <Text style={styles.titulo}>SujeitoPizzaria</Text>
            <View style={styles.viewInput}>
                <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Digite seu E-mail" style={styles.input} placeholderTextColor={'#f0f0f0'}/>
                <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="Digite sua senha"  style={styles.input} placeholderTextColor={'#f0f0f0'}/>
                <TouchableOpacity onPress={handleFunction} style={styles.controlButton}>
                {loadingUser ? (
                  
                        <ActivityIndicator size={26} color={"#fff"}/>
                   
                ): <TextInput style={styles.button}>Acessar</TextInput> }
                   
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1d1d2e',
        justifyContent:"center",
        alignItems:"center"
    },
     titulo:{
        color:"red",
        fontSize:30,
        fontWeight:"bold"
    },
    viewInput:{
        width:"95%",
        paddingHorizontal:12,
        paddingVertical:36
    },
    input:{
        width:'95%',
        height:40,
        paddingHorizontal:6,
        paddingVertical:2,
        borderRadius:4,
        backgroundColor:"#101026",
        marginBottom:12,
        color:"#fff",
    },
    controlButton:{
        width:'95%',
        height:40,
        borderRadius:4,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: '#3fffa3',
    },
    button:{
        fontSize:18,
        fontWeight:"bold",
        borderRadius:4,
    }
})