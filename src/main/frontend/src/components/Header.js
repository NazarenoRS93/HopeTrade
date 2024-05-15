import React, {useContext, useEffect} from "react";
import '../App.css';
import Completo from '../Completo.png';
import axios from "axios";
import {UserContext} from "../context/userContext";
import {basepath,defaultGateway} from "../utils/utilConstants";
import {changeRoute} from "../utils/utilMethods";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import {colors} from "../utils/colors";
import Item from "../utils/Item";
import Typography from "@mui/material/Typography";
import {Navigate, Routes} from "react-router";

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
            <Routes>
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
                        <Navigate to="/register">
                            <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}>
                                <Typography variant="button">Registrarse</Typography>
                            </Button>
                        </Navigate>
                    </Item>
                    <Item>
                        <Navigate to="/login">
                            <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                <Typography variant="button">Ingresar</Typography>
                            </Button>
                        </Navigate>
                    </Item>
                </Box>
            </Routes>
        </div>
    )
}

export default Header;