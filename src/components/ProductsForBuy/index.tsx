import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons"


type ProductProps = {
    data:{
        id: string;
        product_id: string | undefined;
        name: string | undefined;
        amount: string | number;
    },
    deleteItem: () => void
}

export function ProductsForBuy({ data, deleteItem }: ProductProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <TouchableOpacity onPress={deleteItem}><Feather name="trash-2" size={18} color={"#ff3f4b"} /></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 6,
        borderRadius: 4,
        backgroundColor: "#101026",
        marginVertical: 6

    },
    title: {
        fontWeight: "bold",
        color: "#f0f0f0"
    }
})