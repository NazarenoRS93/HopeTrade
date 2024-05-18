import React, {useContext, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/userContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Item from "../utils/Item";
import FormControl from "@mui/material/FormControl";
import {colors} from "../utils/colors";
import axios from "axios";

function TestPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {userData, setUserData} = useContext(UserContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [publicaciones, setPublicaciones] = useState([]);

    const fetchPublicaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8080/publicacion');
            setPublicaciones(response.data);
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
        }
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    width: "100%"
                }}
            >
                <Item sx={{ flexGrow: 1 }} />
                <Item>
                    <Box
                        sx={{
                            backgroundColor: colors.background,
                            flexDirection: "column",
                            alignItems: "center",
                            display: "flex"
                        }}
                    >
                    </Box>
                </Item>
                <Item>
                            <Button variant="contained" color="success"
                                    onClick={fetchPublicaciones}>
                                <Typography variant="button">Fetch Publicaciones</Typography>
                            </Button>
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
            </Box>

            <Item>
                <ul>
                    {publicaciones.map((publicacion) => (
                        <div key={publicacion.id}> {publicacion.id} {publicacion.titulo} {publicacion.descripcion} User: {publicacion.userID}{publicacion.activo}</div>
                    ))}
                </ul>
            </Item> 
        </React.Fragment>
    )
}

export default TestPage;