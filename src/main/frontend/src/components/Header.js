import React, {useEffect, useState} from "react";
import '../App.css';
import Completo from '../Completo.png';
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Avatar, Grid, Stack} from "@mui/material";
import SessionContext from "../context/context";
import {baseUser} from "../utils/utilConstants";

function Header() {

    const [user, setUser] = useState(baseUser);

    const logout = () => {
        window.localStorage.removeItem("user");
        setUser(baseUser);
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.replace(href+"/login");
    }

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
        <React.Fragment>
            <Grid container className="FullWidthHeader">
                <Grid item xs={3}>
                    <Avatar src={Completo} variant="square" sx={{width:"auto",height:"70px"}} />
                </Grid>
                <Grid item xs={9} sx={{justifyContent:"flex-end"}}>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        {(user.isLogged && user.tipoUser===2) ?
                            <Link to="/register">
                                <Button variant="contained" color="secondary" startIcon={<LogoutIcon color="primary"/>}>
                                    <Typography variant="button">Registrar ayudante</Typography>
                                </Button>
                            </Link>
                            : null
                        }
                        {user.isLogged ?
                            <Link to="/home">
                                <Button variant="contained" color="success" startIcon={<HomeRoundedIcon color="primary"/>}>
                                    <Typography variant="button">Inicio</Typography>
                                </Button>
                            </Link>
                            :
                            <Link to="/register">
                                <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}>
                                    <Typography variant="button">Registrarse</Typography>
                                </Button>
                            </Link>
                        }
                        {user.isLogged ?
                            <Button variant="contained" color="error" startIcon={<PersonAddAltRoundedIcon color="background2"/>}
                                    onClick={logout}>
                                <Typography variant="button2">Cerrar sesión</Typography>
                            </Button>
                            :
                            <Link to="/login">
                                <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                    <Typography variant="button">Ingresar</Typography>
                                </Button>
                            </Link>
                        }
                    </Stack>
                    <div style={{paddingTop:"10px"}}>
                        {user.isLogged ?
                            <Typography variant="h5">Usuario: <strong>{user.apellido}, {user.nombre}</strong> | App Versión {user.appVersion}</Typography>
                            :
                            <Typography variant="h5">App Versión {user.appVersion}</Typography>
                        }
                    </div>
                </Grid>
            </Grid>

        </React.Fragment>
    )
}

export default Header;

