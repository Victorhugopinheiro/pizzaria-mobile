import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type UserAutheticatedPages={
    Dashboard:undefined,
    Order:{
        number:number | string,
        order_id: string
    },
    FinishOrder:{
        order_id:string,
        tableNumber: string | number
    }
}

const Stack = createNativeStackNavigator<UserAutheticatedPages>()



function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
            <Stack.Screen name="Order" component={Order} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="FinishOrder" component={FinishOrder} options={{headerTintColor:"#fff", headerStyle:{backgroundColor:"#1d1d2e"}, title:"Finalizando"}}></Stack.Screen>
        </Stack.Navigator>
        
    )
}

export default AppRoutes;