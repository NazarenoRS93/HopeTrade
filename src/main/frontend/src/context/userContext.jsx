import React, {createContext, useState} from "react";
import {baseUser} from "../utils/utilConstants";

export const UserContext= createContext({});

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(baseUser);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;