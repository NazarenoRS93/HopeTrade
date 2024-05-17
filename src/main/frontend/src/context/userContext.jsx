import React, {createContext, useState} from "react";

const base = {
    appVersion: "1.0.0",
    filial: "",
    isLogged: false,
    nombre: "",
    tipoUser: ""
}

export const UserContext= createContext({});

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(undefined);

    return (
        <UserContext.Provider value={{ userData, setUserData, base }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;