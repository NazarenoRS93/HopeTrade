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
import {defaultFormLoginAdmin, defaultGateway} from "../utils/utilConstants";
import LoginService from "../services/LoginService";

function LoginAdminPage(props) {
    const {
        dialog,
        setDialog
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const {userData, setUserData} = useContext(UserContext);
    const [form, setForm] = useState(defaultFormLoginAdmin);

    const handleChange = (e) => {
        let tempForm = {...form};
        switch (e.target.id) {
            case "email": tempForm = {...tempForm, email: e.target.value}; break;
            case "pass": tempForm = {...tempForm, pass: e.target.value}; break;
            default: break;
        }
        setForm(tempForm);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const login = async () => {
        LoginService.loginAdmin(form)
            .then((response) => {
                setUserData(response);
                console.log(response);
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                window.location.replace(href+"/home");
            })
            .catch((err) => {
                alert(err.message);
            })
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
                            <Typography variant="subtitle1">Iniciar Sesión</Typography>
                        </Item>
                        <Item>
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.email}
                                           placeholder="Email" type="email" variant="outlined" id="email"
                                />
                                <FormHelperText id="email-text">Ingrese su e-mail</FormHelperText>
                            </FormControl>
                        </Item>
                        <Item>
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.pass}
                                           placeholder="Contraseña" variant="outlined" id="pass"
                                           type={showPassword ? "text" : "password"}
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton onClick={handleShowPassword}>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}
                                />
                                <FormHelperText id="pass-text">Ingrese su contraseña</FormHelperText>
                            </FormControl>
                        </Item>
                        <Item>
                            <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}
                                onClick={login}>
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

export default LoginAdminPage;