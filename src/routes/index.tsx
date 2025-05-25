import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { UserAuthContext } from "../contexts/AuthContext";


function Routes(){

    const {isAutheticated, loading} = useContext(UserAuthContext)

   

    if(loading){
        return(
            <View style={{flex:1,justifyContent:'center', alignItems:"center" ,backgroundColor:'#1d1d2e'}}>
                

                <ActivityIndicator size={60} color={'#fff'}/>
            </View>
            
        )
    }

    return(
        isAutheticated ? <AppRoutes/> : <AuthRoutes/>
    )

}

export default Routes