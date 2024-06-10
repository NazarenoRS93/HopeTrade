import React, {useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Item from "../utils/Item";
import FormControl from "@mui/material/FormControl";
import {colors} from "../utils/colors";
import {defaultFormRegister} from "../utils/utilConstants";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RegisterService from "../services/RegisterService";

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
                            <Typography variant="subtitle1">{cookie ? "¡Registra un Ayudante!" : "¡Registrate!"}</Typography>
                        </Item>
                        <Item>
                            <Box
                                sx={{
                                    backgroundColor: colors.background,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.nombre}
                                                   type="text" variant="outlined" id="nombre"
                                                   required label="Nombre"
                                        />
                                        <FormHelperText id="nombre-text">Ingrese su nombre</FormHelperText>
                                    </FormControl>
                                </Item>
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.apellido}
                                                   type="text" variant="outlined" id="apellido"
                                                   required label="Apellido"
                                        />
                                        <FormHelperText id="apellido-text">Ingrese su apellido</FormHelperText>
                                    </FormControl>
                                </Item>
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.dni}
                                                   type="number" variant="outlined" id="dni"
                                                   required label="DNI"
                                        />
                                        <FormHelperText id="dni-text">Ingrese su n° de documento sin puntos</FormHelperText>
                                    </FormControl>
                                </Item>
                            </Box>
                        </Item>
                        <Item>
                            <Box
                                sx={{
                                    backgroundColor: colors.background,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                            { !cookie ?
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.fecha_nacimiento}
                                                   type="date" variant="outlined" id="fecha_nacimiento"
                                                   required 
                                        />
                                        <FormHelperText id="fecha-nacimiento-text">Ingrese su fecha de nacimiento</FormHelperText>
                                    </FormControl>
                                </Item>
                                : <p></p>
                            }
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.email}
                                                   type="email" variant="outlined" id="email"
                                                   required label="Email"
                                        />
                                        <FormHelperText id="email-text">Ingrese su e-mail</FormHelperText>
                                    </FormControl>
                                </Item>
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.pass}
                                                   label="Contraseña" variant="outlined" id="pass" required
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
                                        <FormHelperText id="pass-text">Ingrese su contraseña</FormHelperText>
                                    </FormControl>
                                </Item>
                            </Box>
                        </Item>
                        <Item>
                            <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary"/>}
                                    onClick={register} disabled={btnDisabled}>
                                <Typography variant="button">Registrar</Typography>
                            </Button>
                        </Item>
                    </Box>
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
            </Box>
        </React.Fragment>
    )
}

export default SignUpPage;