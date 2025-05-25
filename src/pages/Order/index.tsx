import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"
import { api } from "../../service/api";
import { ModalCategory } from "../../components/ModalCategory";
import { ProductsForBuy } from "../../components/ProductsForBuy";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserAutheticatedPages } from "../../routes/app.routes";



type RotaOrder = {
    Order: {
        number: string | number;
        order_id: string
    }
}


type RoutesProps = RouteProp<RotaOrder, "Order">


export type CategoryProps = {
    id: string,
    name: string
}

export type ProductProps = {
    id: string,
    name: string,
    price?: number | string
}

export type ProductsForBuy = {
    id: string;
    product_id: string | undefined;
    name: string | undefined;
    amount: string | number;





}




export default function Order() {
    const navigation = useNavigation<NativeStackNavigationProp<UserAutheticatedPages>>()

    const route = useRoute<RoutesProps>();


    const [categoryChosee, setCategoryChoose] = useState<CategoryProps[] | []>([])
    const [category, setCategory] = useState<CategoryProps>()
    const [controlModalCategory, setControlModalCategory] = useState(false)


    const [productChosee, setProductChoose] = useState<ProductProps[] | []>([])
    const [product, setProduct] = useState<ProductProps>()
    const [controlModalProduct, setControlModalProduct] = useState(false)


    const [productsForBuy, setProductsForBuy] = useState<ProductsForBuy[]>([])

    const [qtdProducts, setQtdProducts] = useState("1")

    useEffect(() => {
        async function getCategory() {

            const response = await api.get("/category")

            setCategoryChoose(response.data)
            setCategory(response.data[0])

        }

        getCategory()
    }, [])






    useEffect(() => {

        async function gettingProduct() {
            try {

                const response = await api.get("/products", {
                    params: {
                        category_id: category?.id
                    }
                })

                setProductChoose(response.data)
                setProduct(response.data[0])

                console.log("======================")
                console.log(response.data)

            } catch (err) {
                console.log(err)
            }
        }

        gettingProduct()

    }, [category])







    async function deleteTable() {
        try {
            const response = await api.delete("/order", {
                params: {
                    order_id: route.params.order_id
                }
            })

            navigation.goBack()

        } catch (err) {
            console.log(err)
        }
    }


    function changeItem(item: CategoryProps) {
        setCategory(item)
    }

    function changeItemProduct(item: ProductProps) {
        setProduct(item)
    }

    async function addItems() {
        try {
            const response = await api.post("/order/item", {
                order_id: route.params.order_id,
                product_id: product?.id,
                amount: Number(qtdProducts)
            })


            let data = {
                id: response.data.id,
                product_id: product?.id,
                name: product?.name,
                amount: qtdProducts

            }

            setProductsForBuy(products => [...products, data])

            console.log(productsForBuy)



        } catch (err) {
            console.log(err)
        }

    }

    async function deleteItem(itemId: string) {

        try {
            const response = api.delete("/order/remove", {
                params: {
                    item_id: itemId
                }
            })



            const filterItems = productsForBuy.filter((product) => {
                return (product.id !== itemId)
            })


            setProductsForBuy(filterItems)
        } catch (err) {
            console.log(err)
        }
    }


    function NextPage() {
        navigation.navigate("FinishOrder", {
            order_id: route.params.order_id,
            tableNumber: route.params.number
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.textTitle}>Mesa {route.params.number}</Text>
                {productsForBuy.length === 0 && (
                    <TouchableOpacity onPress={deleteTable}><Feather name="trash-2" size={26} color={"#ff3f4b"} /></TouchableOpacity>
                )}
            </View>

            {categoryChosee.length > 0 && (
                <TouchableOpacity onPress={() => setControlModalCategory(true)} style={styles.input}>
                    <Text style={styles.textProduto}>{category?.name}</Text>
                </TouchableOpacity>
            )}
            {productChosee.length > 0 && (
                <TouchableOpacity onPress={() => setControlModalProduct(true)} style={styles.input}>
                    <Text style={styles.textProduto}>{product?.name}</Text>
                </TouchableOpacity>
            )}


            <View style={styles.containerQtd}>
                <Text style={styles.textQtd}>Quantidade</Text>
                <TextInput style={[styles.input, { width: "65%" }]} value={qtdProducts} onChangeText={setQtdProducts} placeholderTextColor={"#f0f0f0"} keyboardType="numeric" />
            </View>

            <View style={styles.containerFuncionalidades}>
                <TouchableOpacity onPress={addItems} style={styles.buttonAdd}>
                    <Text style={[styles.textFuncionalidades, { color: "#f0f0f0" }]}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={ productsForBuy.length === 0 ? true : false} onPress={NextPage} style={[styles.buttonAvançar, {opacity: productsForBuy.length === 0 ? 0.3 : 1}]}>
                    <Text style={styles.textFuncionalidades}>Avançar</Text>
                </TouchableOpacity>
            </View>




            <FlatList

                data={productsForBuy}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, marginTop: 15 }}
                renderItem={({ item }) => <ProductsForBuy data={item} deleteItem={() => deleteItem(item.id)} />}
            />





            <Modal
                visible={controlModalCategory}
                transparent={true}
                animationType="fade"
            >

                <ModalCategory
                    closeButton={() => setControlModalCategory(false)}
                    options={categoryChosee}
                    selectedItem={changeItem}
                />



            </Modal>


            <Modal
                visible={controlModalProduct}
                transparent={true}
                animationType="fade"
            >

                <ModalCategory
                    closeButton={() => setControlModalProduct(false)}
                    options={productChosee}
                    selectedItem={changeItemProduct}
                />



            </Modal>

        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "4%",
        paddingVertical: "16%",
        backgroundColor: "#1d1d2e"
    },
    containerHeader: {
        width: "100%",
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        marginBottom: 10
    },
    textTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#f0f0f0"
    },
    input: {
        width: "100%",
        paddingHorizontal: 6,
        borderRadius: 4,
        color: "#f0f0f0",
        backgroundColor: "#101026",
        height: 40,
        marginBottom: 10,
        justifyContent: "center",

    },
    textProduto: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#f0f0f0"

    },
    containerQtd: {
        width: "100%",
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between"
    },
    textQtd: {
        fontSize: 18,
        color: "#f0f0f0",
        fontWeight: "bold"
    },
    containerFuncionalidades: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4
    },
    buttonAdd: {
        width: "20%",
        borderRadius: 4,
        padding: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3fd1ff",
        height: 40
    },
    textFuncionalidades: {
        fontSize: 22,
        fontWeight: "bold"
    },
    buttonAvançar: {
        width: "75%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3fffa3",
        borderRadius: 4
    },
    containerProducts: {
        marginTop: 10
    }
})