import React, {useContext, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {defaultFormLoginAdmin} from "../utils/utilConstants";
import LoginService from "../services/LoginService";
import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import SessionContext from "../context/context";

function LoginAdminPage() {
    const {user,handleLogin} = useContext(SessionContext);
    const [showPassword, setShowPassword] = useState(false);
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
                let tempUserData = {...response.data};
                let tempData =
                    { ...user, isLogged:true, idUser:tempUserData.id, nombre:tempUserData.nombre,
                        apellido:tempUserData.apellido, tipoUser: tempUserData.tipo };
                handleLogin(tempData);
                window.localStorage.setItem("user",JSON.stringify(tempData));
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                let path = "/home";
                if (tempUserData.tipo === 1) {
                    path = "/select-filial";
                }
                window.location.replace(href+path);
            })
            .catch((err) => {
                alert(err.response.data.responseMsg);
            })
    }

    return (
        <React.Fragment>
            <Grid container className="FullWidthPage">
                <Grid item xs={1} sm={3} md={4}/>
                <Grid item xs={10} sm={6} md={4} sx={{alignItems:"center", justifyContent:"center"}}>
                    <Stack spacing={2} direction="column">
                        <Typography variant="subtitle1">Ingresar como Administrador</Typography>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.email}
                                       placeholder="Email" type="email" variant="outlined" id="email"
                            />
                            <FormHelperText id="email-text">Ingrese su e-mail</FormHelperText>
                        </FormControl>
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
                        <Button variant="contained" color="success" onClick={login}
                                startIcon={<VpnKeyRoundedIcon color="primary"/>}>
                            <Typography variant="button">Ingresar</Typography>
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={1} sm={3} md={4}/>
            </Grid>
        </React.Fragment>
    )
}

export default LoginAdminPage;