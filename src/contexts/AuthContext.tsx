import { createContext, ReactNode, use, useEffect, useState } from "react";
import { api } from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";




type ControlUser = {
    user: UserProps;
    isAutheticated: boolean,
    loading: boolean,
    loadingUser: boolean
    signIn: ({ email, password }: userProps) => Promise<void>;
    logout: () => Promise<void>;
}

type UserProps = {
    id: string,
    token: string,
    name: string,
    email: string
}


type ReactProps = {
    children: ReactNode
}

type userProps = {
    email: string;
    password: string
}

export const UserAuthContext = createContext({} as ControlUser)



export function UserAuthProvider({ children }: ReactProps) {

    const [user, setUser] = useState<UserProps>({
        name: "",
        token: "",
        email: "",
        id: ""
    })

    const isAutheticated = !!user.name
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingUser, setLoadingUser] = useState<boolean>(false)


    useEffect(() => {

        async function getUser() {
           try{
             let gettingUser = await AsyncStorage.getItem("@usersecurity")
            let hasUSerJson: UserProps = JSON.parse(gettingUser || "{}")

            if(Object.keys(hasUSerJson).length > 0) {

                api.defaults.headers.common["Authorization"] = `Bearer ${hasUSerJson.token}`



                setUser({
                    email: hasUSerJson.email,
                    id: hasUSerJson.id,
                    name: hasUSerJson.name,
                    token: hasUSerJson.token
                })
            }

            setLoading(false)

           }catch(err){
            console.log(err)
            setLoading(false)
           }

        }

        getUser()

    }, [])






    async function signIn({ email, password }: userProps) {
        setLoadingUser(true)

        try {

            const response = await api.post("session", {
                email,
                password
            })


            const { name, token, id } = response.data

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem("@usersecurity", JSON.stringify(data))

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setUser({
                name,
                email,
                id,
                token
            })

            console.log(response.data)

            setLoadingUser(false)

        } catch (err) {
            console.log("Erro ao logar", err)
            setLoadingUser(false)
        }

    }


    async function logout() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    email: "",
                    id: "",
                    name: "",
                    token: ""
                })
            })

    }

    return (
        <UserAuthContext.Provider value={{ user, isAutheticated, loading, loadingUser, signIn, logout }}>
            {children}
        </UserAuthContext.Provider>
    )
}