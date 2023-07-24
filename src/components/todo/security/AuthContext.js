import React, { useContext, useState } from 'react'
import { createContext } from "react";

//1.create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

//2.share the context with other components
export default function Authprovider({children}) {

    //3.put some state in context
    const [isAuthenticated,setAuthenticated] = useState(false)

    function login(username,password){
        if(username ==='rajesh' && password === '12345'){
            setAuthenticated(true)              
            return true
        }else{
            setAuthenticated(false)            
            return false
        }
    }

    function logout(){
        setAuthenticated(false)       
    }


    return (
    <AuthContext.Provider value={{isAuthenticated,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

 

// use Authprovider