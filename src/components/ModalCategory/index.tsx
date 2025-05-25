import { Dimensions, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import { CategoryProps } from "../../pages/Order";


const {width: WIDTH, height: HEIGHT} = Dimensions.get("window")


type ModalProps ={
    closeButton: () => void,
    selectedItem: (item:CategoryProps) => void;
    options: CategoryProps[]
}



export function ModalCategory ({closeButton, options,selectedItem} : ModalProps) {


    function selectItem(item:CategoryProps){


        selectedItem(item)
        closeButton()
    }

const option = options.map((item, index) => (
    <TouchableOpacity onPress={() => selectItem(item)} key={index} style={styles.touchButton}>
        <Text style={styles.buttonText}> {item.name}</Text>
    </TouchableOpacity>
))

return(
    <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
            <ScrollView >
                {option}
            </ScrollView>
        </View>

    </TouchableOpacity>
)
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
       
    },
    content:{
        width:WIDTH - 20,
        height:HEIGHT / 2,
        backgroundColor:"#fff",
        borderColor:"#8a8a8a",
        borderWidth:1,
        borderRadius:4
    },
    touchButton:{
        alignItems:"flex-start",  
        borderTopWidth:0.8,
        borderTopColor:"#8a8a8a"
    },
    buttonText:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:20,
        margin:16
    }
})