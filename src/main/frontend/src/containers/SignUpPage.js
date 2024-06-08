import React, {useContext, useState} from "react";
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
import SessionContext from "../context/context";

function SignUpPage(props) {
    const {user} = useContext(SessionContext);

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(defaultFormRegister);

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
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const register = async () => {
        RegisterService.register(form)
            .then((response) => {
                let ret;
                if(user.isLogged) {
                    ret = "/home";
                } else {
                    ret = "/login";
                };
                alert("¡Usuario creado con éxito!");
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
                            <Typography variant="subtitle1">¡Registrate!</Typography>
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
                                                   placeholder="Nombre" type="text" variant="outlined" id="nombre"
                                        />
                                        <FormHelperText id="email-text">Ingrese su nombre</FormHelperText>
                                    </FormControl>
                                </Item>
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.apellido}
                                                   placeholder="Apellido" type="text" variant="outlined" id="apellido"
                                        />
                                        <FormHelperText id="email-text">Ingrese su apellido</FormHelperText>
                                    </FormControl>
                                </Item>
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.dni}
                                                   placeholder="DNI" type="number" variant="outlined" id="dni"
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
                                <Item>
                                    <FormControl>
                                        <TextField onChange={(event)=> {handleChange(event)}} value={form.fecha_nacimiento}
                                                   placeholder="Fecha de nacimiento" type="date" variant="outlined" id="fecha_nacimiento"
                                        />
                                        <FormHelperText id="email-text">Ingrese su fecha de nacimiento</FormHelperText>
                                    </FormControl>
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
                                    onClick={register}>
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