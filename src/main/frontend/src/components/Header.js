import React, {useContext, useEffect} from "react";
import '../App.css';
import Completo from '../Completo.png';
import axios from "axios";
import {UserContext} from "../context/userContext";
import {defaultGateway} from "../utils/utilConstants";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import {colors} from "../utils/colors";
import Item from "../utils/Item";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

function Header() {

    const {userData, setUserData} = useContext(UserContext);

    const getDatosHeader = async () => {
        try {
            const res = await axios.get(defaultGateway + '/utils/header')
            const data = await res.data;
            setUserData(data);
        } catch (e) {
            console.log("Error al recuperar info de usuario", e)
        }
    }

    useEffect(() => {
        getDatosHeader();
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
                        <img src={Completo} width="45%" />
                    </Item>
                    <Item sx={{ flexGrow: 1 }}/>
                    <Item>
                        <Link to="/register">
                            <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}>
                                <Typography variant="button">Registrarse</Typography>
                            </Button>
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/login">
                            <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                <Typography variant="button">Ingresar</Typography>
                            </Button>
                        </Link>
                    </Item>
                </Box>
        </div>
    )
}

export default Header;