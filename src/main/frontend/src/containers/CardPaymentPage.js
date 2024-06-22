import React, {useState} from "react";
import '../App.css';
import { onlyNumbers } from "../utils/utilMethods";
import { defaultFormPayment } from "../utils/utilConstants"
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import dayjs from 'dayjs';
import CardPaymentService from "../services/CardPaymentService";

function CardPaymentPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(defaultFormPayment);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [errorDatePicker, setErrorDatePicker] = useState(false);

    const verificaIngresoDatos = (tmpForm) => {
        if (tmpForm.numero.trim() !== "" && tmpForm.fecha_vencimiento.toString().trim() !== "" && tmpForm.codigo.trim() !== "" &&
            tmpForm.dni_titular.trim() !== "" && tmpForm.monto.trim() !== "" && tmpForm.nombre_titular.trim() !== "") {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        };
    }

    const handleChange = (e) => {
        let tempForm = {...form};
        switch (e.target.id) {
            case "numero": tempForm = {...tempForm, numero: e.target.value}; break;
            //case "fecha_vencimiento": tempForm = {...tempForm, fecha_vencimiento: e.target.value}; break;
            case "codigo_cvv": tempForm = {...tempForm, codigo: e.target.value}; break;
            case "dni_titular": tempForm = {...tempForm, dni_titular: e.target.value}; break;
            case "monto": tempForm = {...tempForm, monto: e.target.value}; break;
            case "nombre_titular": tempForm = {...tempForm, nombre_titular: e.target.value}; break;
            default: break;
        }
        setForm(tempForm);
        // alert(tempForm.fecha_vencimiento.toString());
        verificaIngresoDatos(tempForm);
    }

    const handleChangeDP = (val, cntxt) => {
        let sValDP = "";
        if (val !== null) {
            sValDP = val
        }
        let tempForm = {...form};
        tempForm = {...tempForm, fecha_vencimiento: sValDP};
        setForm(tempForm);
        if (cntxt.validationError === null) {
            // Se toma como error si el usuario deja en blanco la fecha del DatePicker
            setErrorDatePicker(val === null)
        } else {
            setErrorDatePicker(cntxt.validationError.length !== 0)
        }
        verificaIngresoDatos(tempForm);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const registrarPago = async () => {
        CardPaymentService.registrarPagoTarjeta(form)
            .then((response) => {
/*                 if(cookie) {
                    // si existe la cookie es porque está logueado el admin e ingresó por "registrar ayudante"
                    ret = "/home";
                    alert("¡Ayudante registrado exitosamente!");
                } else {
                    // en este caso se ingresó a "registrarse" (usuario general)
                    ret = "/login";
                    alert("¡Usuario creado con éxito!");
                };
 */             
                alert(response.data);
                let ret = "/home";
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                alert(href+ret);
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
                    <Typography variant="subtitle1">Datos de la tarjeta</Typography>
                </Grid>
                <Grid item xs={1}/>
                <Grid item container spacing={2} xs={10}>
                    <Stack spacing={2} direction="row">
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.numero}
                                        type="text" variant="outlined" id="numero" placeholder="1234567890"
                                        inputProps={{
                                            maxlength: "10",
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><CreditCardIcon /></InputAdornment>,
                                        }}
                                        onInput={(event) => onlyNumbers(event) }
                            />
                            <FormHelperText id="numero-text">Número de tarjeta</FormHelperText>
                        </FormControl>
                        <FormControl>
                            {/* <TextField onChange={(event)=> {handleChange(event)}} value={form.fecha_vencimiento}
                                        type="text" variant="outlined" id="fecha_vencimiento"
                                        inputProps={{
                                            maxlength: "5",
                                            pattern: "[0-1]{1}[0-9]{1}/2[4-9]{1}",
                                        }}
                            /> */}
                            <DatePicker onChange={(value, context)=> {handleChangeDP(value, context)}} views={['month', 'year']}
                                        variant="outlined" id="fecha_vencimiento" minDate={dayjs('2024-01-01')} 
                                        maxDate={dayjs('2029-12-31')} format="MMM YYYY"
                            />
                            <FormHelperText id="fecha-vencimiento-text">Fecha de vencimiento</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.codigo} 
                                        type={showPassword ? "text" : "password"} variant="outlined" id="codigo_cvv" 
                                        inputProps={{
                                            maxlength: "4",
                                        }}
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
                                        onInput={(event) => onlyNumbers(event) }
                            />
                            <FormHelperText id="codigo-cvv-text">Código de seguridad</FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={1}/>
                <Grid item container spacing={2} xs={10}>
                    <Stack spacing={2} direction="row">
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.dni_titular}
                                        type="text" variant="outlined" id="dni_titular" 
                                        inputProps={{
                                            maxlength: "8",
                                        }}
                                        onInput={(event) => onlyNumbers(event) }
                            />
                            <FormHelperText id="dni-titular-text">Ingrese n° de documento sin puntos</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.monto}
                                        type="text" variant="outlined" id="monto" 
                                        inputProps={{
                                            maxlength: "8",
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        onInput={(event) => onlyNumbers(event) }
                            />
                            <FormHelperText id="monto-text">Monto a donar</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}} value={form.nombre_titular}
                                        type="text" variant="outlined" id="nombre_titular" 
                                        inputProps={{
                                            maxlength: "50",
                                        }}
                            />
                            <FormHelperText id="nombre-titular-text">Nombre y apellido del titular</FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={1}/>
                <Grid item container spacing={2} xs={10}>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="secondary" startIcon={<CreditScoreIcon color="primary"/>}
                                    onClick={registrarPago} disabled={btnDisabled || errorDatePicker}>
                            <Typography variant="button">Donar</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CardPaymentPage;
