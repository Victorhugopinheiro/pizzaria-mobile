import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { UserAuthContext } from "../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserAutheticatedPages } from "../../routes/app.routes";
import { api } from "../../service/api";


type OrderProps = {
    id: string;
    table: number | string
}

export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<UserAutheticatedPages>>();
    const [orders, setOrders] = useState<OrderProps[] | null>([])

    const [mesaNumber, setMesaNumber] = useState("")


    async function sendMesaNumber() {


        if (mesaNumber === "") {
            return
        }




        if (mesaNumber) {
            try {
                const response = await api.get("/orders")
                setOrders(response.data)

                const filtrandoOrders = orders?.find((item: OrderProps) => {
                    return(Number(item.table) === Number(mesaNumber))
                })
                console.log("testeeeee")
                console.log(filtrandoOrders)
                console.log("testeeeee")

                if(filtrandoOrders){
                    console.log("Essa mesa já existe")
                    return
                }

            } catch (err) {
                console.log(err)
            }
        }


        try {
            const response = await api.post("order", {
                table: Number(mesaNumber)
            })




            navigation.navigate("Order", {
                number: mesaNumber,
                order_id: response.data.id
            })

            setMesaNumber("")
        } catch (err) {
            console.log(err)
        }



    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>
            <TextInput value={mesaNumber} onChangeText={setMesaNumber} placeholder="Numero da mesa" style={styles.input} placeholderTextColor={"#fff"} keyboardType="numeric" />
            <TouchableOpacity onPress={sendMesaNumber} style={styles.Button}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#1d1d2e"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 16
    },
    input: {
        width: "90%",
        borderRadius: 6,
        paddingHorizontal: 12,
        height: 60,
        backgroundColor: "#101026",
        textAlign: "center",
        fontSize: 16,
        color: "#fff"

    }
    ,
    Button: {
        width: '90%',
        height: 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#3fffa3',
        marginVertical: 12
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        borderRadius: 4,
    }
})