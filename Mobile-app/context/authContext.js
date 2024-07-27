import {createContext, useEffect, useState,useContext} from 'react';


export const AuthContext=createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(undefined);

    useEffect(()=>{

        setTimeout(()=>{
            setIsAuthenticated(false);
            
        },3000)

    },[])

    const login = async(email, password) => {
        try{

        }
        catch(e){

        }
    }
    const logout = async() => {
        try{

        }
        catch(e){
            
        }
    }
    const signup = async(email, password,username) => {
        try{

        }
        catch(e){

        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, signup}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const value = useContext(AuthContext);
    if(!value){
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return value;
}