import React, {useEffect, useState} from "react";
import '../App.css';
import Completo from '../Completo.png';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import {colors} from "../utils/colors";
import Item from "../utils/Item";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {baseUser} from "../utils/utilConstants";
import {Avatar} from "@mui/material";

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
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            setUser(JSON.parse(cookie));
        } else {
            setUser(baseUser);
        };
    }, [])

    return (
        <div className="header-cus">
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    width: "100%"
                }}
            >
                <Item>
                    <Avatar src={Completo} variant="square" sx={{width:"auto",height:"80px"}} />
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
                {(user?.isLogged && user.tipoUser===2) ?
                    <Item>
                        <Link to="/register">
                            <Button variant="contained" color="secondary" startIcon={<LogoutIcon color="primary"/>}>
                                <Typography variant="button">Registrar ayudante</Typography>
                            </Button>
                        </Link>
                    </Item>
                    : null
                }
                <Item>
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
                </Item>
                <Item>
                    {!user?.isLogged ?
                        <Link to="/login">
                            <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                <Typography variant="button">Ingresar</Typography>
                            </Button>
                        </Link>
                        :
                        <Button variant="contained" color="error" startIcon={<PersonAddAltRoundedIcon color="background2"/>}
                                onClick={logout}>
                            <Typography variant="button2">Cerrar sesión</Typography>
                        </Button>
                    }
                </Item>
            </Box>
        </div>
    )
}

export default Header;