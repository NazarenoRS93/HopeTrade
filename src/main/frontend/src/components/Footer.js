import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {baseUser} from "../utils/utilConstants";
import Grid from "@mui/material/Grid";

function Footer() {
    const [user, setUser] = useState(baseUser);

    useEffect(() => {
        const loadUserFromStorage = () => {
            const cookie = window.localStorage.getItem("user");
            if (cookie) {
                setUser(JSON.parse(cookie));
            } else {
                setUser(baseUser);
            }
        };

        // Cargar el usuario al montar el componente
        loadUserFromStorage();

        // Escuchar el evento 'userUpdated' para actualizar el estado del usuario
        window.addEventListener('userUpdated', loadUserFromStorage);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('userUpdated', loadUserFromStorage);
        };
    }, []);

    return (
        <Grid container spacing={2} className="FullWidthFooter">
            {user.isLogged ?
                <Typography variant="footer">Desarrollado por <b>CODEX™</b></Typography>
                :
                <Typography variant="footer">Desarrollado por<b> CODEX™ </b>| Para uso interno, haga click <b><Link to="/logAdmin">aqu&iacute;</Link></b></Typography>
            }
        </Grid>
)
}

export default Footer;