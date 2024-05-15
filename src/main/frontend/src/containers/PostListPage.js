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

function PostListPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {userData, setUserData} = useContext(UserContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
                        <Item>

                            <Typography variant="subtitle1">¡Lista de publicaciones!</Typography>
                        </Item>
                        <Item>
                            <FormControl>
                                <TextField inputProps={{pattern:"\\[0-9]", maxLength:8}} placeholder="DNI" type="number" variant="outlined" id="dni"
                                />
                                <FormHelperText id="dni-text">Ingrese su n° de documento sin puntos</FormHelperText>
                            </FormControl>
                        </Item>
                        <Item>
                            <FormControl>
                                <TextField
                                    placeholder="Contraseña" variant="outlined" id="password"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleShowPassword}
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <FormHelperText id="password-text">Ingrese su contraseña</FormHelperText>
                            </FormControl>
                        </Item>
                        <Item>
                            <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                                <Typography variant="button">Ingresar</Typography>
                            </Button>
                        </Item>
                    </Box>
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
            </Box>
        </React.Fragment>
    )
}

export default PostListPage;