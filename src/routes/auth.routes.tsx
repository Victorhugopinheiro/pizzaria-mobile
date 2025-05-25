import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";

const Stack = createNativeStackNavigator()

function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}


export default AuthRoutes;