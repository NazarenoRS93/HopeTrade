import React, {useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {baseUser, defaultFormLoginAdmin} from "../utils/utilConstants";
import LoginService from "../services/LoginService";
import Grid from "@mui/material/Grid";

function LoginAdminPage(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(defaultFormLoginAdmin);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const handleChange = (e) => {
        let tempForm = {...form};
        switch (e.target.id) {
            case "email": tempForm = {...tempForm, email: e.target.value}; break;
            case "pass": tempForm = {...tempForm, pass: e.target.value}; break;
            default: break;
        }
        setForm(tempForm);
        if (tempForm.email.trim() !== "" && tempForm.pass.trim() !== "") {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        };
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const login = async () => {
        LoginService.loginAdmin(form)
            .then((response) => {
                let tempUser = {...response.data};
                let tempData =
                    { ...baseUser, isLogged:true, idUser:tempUser.id,
                        nombre:tempUser.nombre, tipoUser: tempUser.tipo };
                window.localStorage.setItem("user",JSON.stringify(tempData));
                console.log(response.data);
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                let path = "/home";
                if (tempUser.tipo === 1) {
                    path = "/select-filial";
                }
                window.location.replace(href+path)
            })
            .catch((err) => {
                alert(err.response.data.responseMsg);
            })
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Ingresar como Ayudante / Administrador</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Stack spacing={2} direction="column">
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
                        <Button variant="contained" color="success" startIcon={<VpnKeyRoundedIcon color="primary"/>}
                                onClick={login} disabled={btnDisabled}>
                            <Typography variant="button">Ingresar</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default LoginAdminPage;