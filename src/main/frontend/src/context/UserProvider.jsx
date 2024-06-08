import React, {useState} from "react";
import {baseUser} from "../utils/utilConstants";

const UserContext = React.createContext();
const UserToggleContext = React.createContext();

export function UserProvider(props) {

    const [user, setUser] = useState(baseUser);

    const updateUser = (data) => {
        if (data) {
            setUser(data);
        } else {
            setUser(baseUser);
        }
    }

    return (
        <UserContext.Provider value={user}>
            <UserToggleContext.Provider value={updateUser}>
                {props.children}
            </UserToggleContext.Provider>
        </UserContext.Provider>
    );
}