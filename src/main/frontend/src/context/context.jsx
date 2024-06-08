import React, {createContext, useEffect, useState} from "react";
import {baseUser} from "../utils/utilConstants";

const SessionContext = createContext();

export function SessionProvider({children}) {
    const [user, setUser] = useState(baseUser);
    useEffect(() => {
        const userData = window.sessionStorage.getItem("user");
        const data = JSON.parse(userData);
        if(data && data.isLogged) setUser(data);
        else setUser(baseUser);
    },[])
    const handleLogin = (data) => {
        setUser(data);
    }
    const handleLogout = () => {
        setUser(baseUser);
    }

    return (
        <SessionContext.Provider value={{user,handleLogin,handleLogout}}>
            {children}
        </SessionContext.Provider>
    );

}
export default SessionContext;