import React, { useState } from "react";
import '../App.css';
import { onlyNumbers } from "../utils/utilMethods";
import { defaultFormPayment } from "../utils/utilConstants";
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
            tmpForm.dni_titular.trim() !== "" && tmpForm.monto.trim() !== "" && parseFloat(tmpForm.monto) >= 10 &&
            tmpForm.nombre_titular.trim() !== "") {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    };

    const handleChange = (e) => {
        let tempForm = { ...form };
        switch (e.target.id) {
            case "numero":
                tempForm = { ...tempForm, numero: e.target.value };
                break;
            case "codigo_cvv":
                tempForm = { ...tempForm, codigo: e.target.value };
                break;
            case "dni_titular":
                tempForm = { ...tempForm, dni_titular: e.target.value };
                break;
            case "monto":
                tempForm = { ...tempForm, monto: e.target.value };
                break;
            case "nombre_titular":
                tempForm = { ...tempForm, nombre_titular: e.target.value };
                break;
            default:
                break;
        }
        setForm(tempForm);
        verificaIngresoDatos(tempForm);
    };

    const handleChangeDP = (val, cntxt) => {
        let sValDP = "";
        if (val !== null) {
            sValDP = val;
        }
        let tempForm = { ...form };
        tempForm = { ...tempForm, fecha_vencimiento: sValDP };
        setForm(tempForm);
        if (cntxt.validationError === null) {
            setErrorDatePicker(val === null);
        } else {
            setErrorDatePicker(cntxt.validationError.length !== 0);
        }
        verificaIngresoDatos(tempForm);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const registrarPago = async () => {
        CardPaymentService.registrarPagoTarjeta(form)
            .then((response) => {
                alert(response.data);
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center">Datos de la tarjeta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <FormControl fullWidth>
                                <TextField onChange={(event) => { handleChange(event) }} value={form.numero}
                                    type="text" variant="outlined" id="numero" placeholder="1234567890123456"
                                    inputProps={{
                                        maxLength: "16",
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><CreditCardIcon /></InputAdornment>,
                                    }}
                                    onInput={(event) => onlyNumbers(event)}
                                />
                                <FormHelperText id="numero-text">Número de tarjeta</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <DatePicker onChange={(value, context) => { handleChangeDP(value, context) }} views={['month', 'year']}
                                    variant="outlined" id="fecha_vencimiento" minDate={dayjs('2024-01-01')}
                                    maxDate={dayjs('2029-12-31')} format="MMM YYYY"
                                    error={errorDatePicker}
                                />
                                <FormHelperText id="fecha-vencimiento-text">Fecha de vencimiento</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField onChange={(event) => { handleChange(event) }} value={form.codigo}
                                    type={showPassword ? "text" : "password"} variant="outlined" id="codigo_cvv"
                                    inputProps={{
                                        maxLength: "3", // Aquí cambiamos a 3 dígitos
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
                                    onInput={(event) => onlyNumbers(event)}
                                />
                                <FormHelperText id="codigo-cvv-text">Código de seguridad</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <FormControl>
                                <TextField onChange={(event) => { handleChange(event) }} value={form.dni_titular}
                                    type="text" variant="outlined" id="dni_titular"
                                    inputProps={{
                                        maxLength: "8",
                                    }}
                                    onInput={(event) => onlyNumbers(event)}
                                />
                                <FormHelperText id="dni-titular-text">Ingrese n° de documento sin puntos</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField onChange={(event) => { handleChange(event) }} value={form.monto}
                                    type="text" variant="outlined" id="monto"
                                    inputProps={{
                                        maxLength: "9",
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    onInput={(event) => onlyNumbers(event)}
                                />
                                <FormHelperText id="monto-text">Monto a donar</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <TextField onChange={(event) => { handleChange(event) }} value={form.nombre_titular}
                                    type="text" variant="outlined" id="nombre_titular"
                                    inputProps={{
                                        maxLength: "50",
                                    }}
                                />
                                <FormHelperText id="nombre-titular-text">Nombre y apellido del titular</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button variant="contained" color="secondary" startIcon={<CreditScoreIcon color="primary" />}
                                onClick={registrarPago} disabled={btnDisabled || errorDatePicker || parseFloat(form.monto) < 10}>
                                <Typography variant="button">Donar</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default CardPaymentPage;
