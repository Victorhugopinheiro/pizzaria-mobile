import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../../service/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserAutheticatedPages } from "../../routes/app.routes";

type FinishOrderProps = {
    FinishOrder: {
        order_id: string,
        tableNumber: string | number
    }
}


type FinishOrderRouteProp = RouteProp<FinishOrderProps, "FinishOrder">

export default function FinishOrder() {

    const navigation = useNavigation<NativeStackNavigationProp<UserAutheticatedPages>>()

    const route = useRoute<FinishOrderRouteProp>()



    async function finishingOrder() {
        try{

            const response = await api.put("/order/send", {
                order_id:route.params.order_id
            })
            

            navigation.popToTop()

        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Voce Deseja Finalizar esse pedido?
            </Text>
            <Text style={styles.textTable}>Mesa {route.params.tableNumber}</Text>
            <TouchableOpacity onPress={finishingOrder} style={styles.button}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={20} color={'#1d1d2e'} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 10
    },
    textTable: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    },
    button: {
        width: "60%",
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        borderRadius: 4,
        height: 40,
        backgroundColor: "#3fffa3",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    },
    textButton: {
        fontSize: 18,
        color: "#1d1d2e",
        fontWeight: "bold"
    }

})