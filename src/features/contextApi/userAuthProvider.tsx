"use client"

import auth from "../authentication/auth";
import {useRouter} from "next/navigation";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";



const UserAuthContext = createContext({});

const UserAuth = ({ children }:{children:ReactNode}) => {
    const { verify, logout, loggedIn, updateData, currentUser, openMenu, setOpenMenu } = UserProviderAuth();
    // const { error, data, loading } = useQuery(GET_USER_BY_ID);



    useEffect(() => {
        if (auth.isAuthenticated() == false) {
            verify();
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{ verify, logout, currentUser, loggedIn, updateData, openMenu, setOpenMenu }}>
            <div>
                {children}
            </div>
        </UserAuthContext.Provider>
    )
}

export default UserAuth;

export const UserAuthFinal = () => {
    return useContext(UserAuthContext)
}


const UserProviderAuth = () => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);

    const Router = useRouter();

    useEffect(() => {
      
        if(auth.isAuthenticated()!==false){
            fetch(`${process.env.NEXT_PUBLIC_SERVER_LINK}/api/v1/user/info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth?.isAuthenticated()
                }
            }).then(res => res.json())
                .then(data => {

                    setCurrentUser(data.data)
                })
        }
        
    }, [])

  

    // const userData = async ()=>{
    //     if(auth.isAuthenticated()!==false){

    //         if(!data.getUserByID.error){
    //             setCurrentUser(data.getUserByID.data)
    //         }
    //     }


    // }
    const updateData = () => {
        setIsUpdated(true);
    }

    const loggedIn = () => {
        if (auth.isAuthenticated() !== false) {
            return true;
        }
        return false;
    }

    const verify = () => {

        if (auth.isAuthenticated() !== false) {
            Router.push('/');
        } else {
            Router.push('/userauth/login');
            
        }
    }

    const logout = () => {
        auth.clearJWT(() => {

        })

        Router.push('/userauth/login')
    }

    return {
        verify, logout, loggedIn, updateData, currentUser, setCurrentUser, openMenu, setOpenMenu
    }
}

