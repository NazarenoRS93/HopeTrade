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
import {baseUser} from "../utils/utilConstants";
import {Avatar, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";

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

    function EtiquetaVersion({userInfo}) {
        let sEtiqueta = '';
        if (userInfo.isLogged) {
            // si el usuario está logueado se toma su nombre
            sEtiqueta = '¡Hola, <strong>' + userInfo.nombre + '</strong>! | ';
            // solo si el rol es ayudante y hay una filial seleccionada se toma su descripción
            if (userInfo.tipoUser === 1 && userInfo.desc_filial !== "") {
                sEtiqueta += 'Filial: <strong>' + userInfo.desc_filial + '</strong> | ';
            }
        };
        sEtiqueta += 'App Versión <strong>' + userInfo.appVersion + '<strong>';
        return (
            <Typography variant="h5" dangerouslySetInnerHTML={{ __html: sEtiqueta }}></Typography>
        );
    }

    return (
        <Grid container spacing={2} className="FullWidthHeader">
            <Grid item xs={4}>
                <Avatar src={Completo} variant="square" sx={{width:"350px",height:"80px"}} />
            </Grid>
            <Grid item container spacing={2} xs={8}>
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        {(user?.isLogged && user.tipoUser===2) ?
                            <Link to="/register">
                                <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}>
                                    <Typography variant="button">Registrar ayudante</Typography>
                                </Button>
                            </Link>
                            : null
                        }
                        {user?.isLogged ?
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
                        {!user?.isLogged ?
                            <Link to="/login">
                                <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                    <Typography variant="button">Ingresar</Typography>
                                </Button>
                            </Link>
                            :
                            <Button variant="contained" color="error" startIcon={<LogoutIcon color="background2"/>}
                                    onClick={logout}>
                                <Typography variant="button2">Cerrar sesión</Typography>
                            </Button>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <EtiquetaVersion
                        userInfo={user}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header;

