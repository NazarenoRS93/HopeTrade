import React, {useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import {defaultFormRegister} from "../utils/utilConstants";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RegisterService from "../services/RegisterService";
import Grid from "@mui/material/Grid";

function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(defaultFormRegister);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const cookie = window.localStorage.getItem("user");

    const handleChange = (e) => {
        let tempForm = {...form};
        switch (e.target.id) {
            case "nombre": tempForm = {...tempForm, nombre: e.target.value}; break;
            case "apellido": tempForm = {...tempForm, apellido: e.target.value}; break;
            case "dni": tempForm = {...tempForm, dni: e.target.value}; break;
            case "fecha_nacimiento": tempForm = {...tempForm, fecha_nacimiento: e.target.value}; break;
            case "email": tempForm = {...tempForm, email: e.target.value}; break;
            case "pass": tempForm = {...tempForm, pass: e.target.value}; break;
            default: break;
        }
        setForm(tempForm);
        if (tempForm.nombre.trim() !== "" && tempForm.apellido.trim() !== "" && tempForm.dni.trim() !== "" &&
            (tempForm.fecha_nacimiento.trim() !== "" || cookie) && tempForm.email.trim() !== "" && tempForm.pass.trim() !== "") {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        };
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const register = async () => {
        RegisterService.register(form)
            .then((response) => {
                let ret;
                if(cookie) {
                    // si existe la cookie es porque está logueado el admin e ingresó por "registrar ayudante"
                    ret = "/home";
                    alert("¡Ayudante registrado exitosamente!");
                } else {
                    // en este caso se ingresó a "registrarse" (usuario general)
                    ret = "/login";
                    alert("¡Usuario creado con éxito!");
                };
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                window.location.replace(href+ret);
            })
            .catch((err) => {
                alert(err.response.data);
            })
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{cookie ? "¡Registra un Ayudante!" : "¡Registrate!"}</Typography>
                </Grid>
                <Grid item xs={1}/>
                <Grid item container spacing={2} xs={10}>
                    <Grid item xs={4}>
                        <Stack spacing={2} direction="column">
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.nombre}
                                           type="text" variant="outlined" id="nombre"
                                />
                                <FormHelperText id="nombre-text">Ingrese su nombre</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.fecha_nacimiento}
                                           type="date" variant="outlined" id="fecha_nacimiento"
                                />
                                <FormHelperText id="fecha-nacimiento-text">Ingrese su fecha de nacimiento</FormHelperText>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2} direction="column">
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.apellido}
                                           type="text" variant="outlined" id="apellido"
                                />
                                <FormHelperText id="apellido-text">Ingrese su apellido</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.email}
                                           type="email" variant="outlined" id="email"
                                />
                                <FormHelperText id="email-text">Ingrese su e-mail</FormHelperText>
                            </FormControl>
                            <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}
                                    onClick={register} disabled={btnDisabled}>
                                <Typography variant="button">Registrar</Typography>
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2} direction="column">
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.dni}
                                           type="number" variant="outlined" id="dni"
                                />
                                <FormHelperText id="dni-text">Ingrese su n° de documento sin puntos</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField onChange={(event)=> {handleChange(event)}} value={form.pass}
                                           variant="outlined" id="pass" type={showPassword ? "text" : "password"}
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
                                <FormHelperText id="pass-text">Ingrese su contraseña</FormHelperText>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </React.Fragment>
    )
}

export default SignUpPage;