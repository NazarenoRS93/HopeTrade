import React, {useState, useEffect, useContext} from "react";
import '../App.css';
import Completo from '../Completo.png';
import axios from "axios";
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/userContext";
import {defaultGateway} from "../utils/utilConstants";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import {colors} from "../utils/colors";
function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

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
                }}
            >
                <Item>
                    <img src={Completo} width="60%" />
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
                <Item>
                    <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}>
                        Registrarse
                    </Button>
                </Item>
                <Item>
                    <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                        Ingresar
                    </Button>
                </Item>
            </Box>
        </div>
)
}

export default Header;