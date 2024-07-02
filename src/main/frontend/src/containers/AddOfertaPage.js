import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import {MenuItem, Select, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import {DateTimePicker} from "@mui/x-date-pickers";
import {isWeekend} from "../utils/utilMethods";
import {defaultFormAddOferta, defDateTime, endTime, nextDay, nextMonth, startTime} from "../utils/utilConstants";

function AddOfertaPage() {
    // Render on start
    useEffect(() => {
        fetchFiliales();
        fetchPost();
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            setUser(user);
        };
    }, []);
    const [form, setForm] = useState(defaultFormAddOferta);
    const [filiales, setFiliales] = useState([]);
    const [selectedFilial, setSelectedFilial] = useState('');
    const reader = new FileReader();

    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [image, setImage] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState(0);
    const [fil, setFil] = useState(0);
    const [fecha, setFecha] = useState(defDateTime);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const fetchFiliales = async () => {
        try {
            const response = await axios.get('http://localhost:8080/filial/all');
            setFiliales(response.data);
        } catch (error) {
            alert("Error obteniendo filiales: " + error);
        }
    };

    const fetchPost = async () => {
        try {
            let id = window.localStorage.getItem("pubId");
            let url = "http://localhost:8080/publicacion/"+id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`
            setPost(data);
            console.log(data);
        } catch (error) {
            alert("Error obteniendo publicacion: "+error);
        }
    }

    const validar = (form) => {
        if(form.titulo.trim()!=="" && form.desc.trim()!=="" && form.fil !== 0 && form.image !== null) {
            setBtnDisabled(false);
        } else setBtnDisabled(true);
    }
    const handleChange = async (e) => {
        let tempForm = form;
        switch (e.target.name) {
            case "titulo": tempForm = {...tempForm, titulo: e.target.value}; break;
            case "descripcion": tempForm = {...tempForm, desc: e.target.value}; break;
            case "imagen": tempForm = {...tempForm, image: e.target.files[0]}; break;
            case "filial": tempForm = {...tempForm, fil: e.target.value}; break;
            case "fechaHora": tempForm = {...tempForm, fecha: e.$d}; break;
            default: break;
        }
        setForm(tempForm);
        validar(tempForm);
    }
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const addOferta = async (event) => {
        event.preventDefault();
        let pubId = window.localStorage.getItem("pubId");
        let userId = user.idUser;
        var formdata = new FormData();
        formdata.append("titulo", form.titulo);
        formdata.append("descripcion", form.desc);
        formdata.append("publicacionId", pubId);
        formdata.append("userId", userId);
        formdata.append("filialId", form.fil);
        formdata.append("categoria", post.categoria_ID);
        formdata.append("fechaIntercambio", form.fecha.toISOString());
        formdata.append("imagen", await fileToBase64(form.image));

        await axios.post('http://localhost:8080/oferta/guardar', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
        )
            .then(function (response) {
                alert(response.data);
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                window.localStorage.removeItem("pubId");
                window.location.replace(href+"/home");
            })
            .catch(function (error) {
                alert(error.response.data);
            });
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Ofertar</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       type="text" variant="outlined" name="titulo"
                            />
                            <FormHelperText id="titulo-text">Ingrese el título de su oferta</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       multiline={true} rows={4} type="text" name="descripcion" variant="outlined"
                            />
                            <FormHelperText id="descripcion-text">Describa el producto ofertado</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField value={post.categoria_Nombre}
                                            type="text" variant="outlined" id="apellido"
                                            InputLabelProps={{ shrink: true }} label="Categoria" InputProps={{ readOnly: true }}
                                        />
                                        <FormHelperText id="categoria-text"> Verifique que la oferta sea de la misma categoría que la publicacion original. </FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       type="file" variant="outlined" name="imagen"
                            />
                            <FormHelperText id="imagen-text">Agregue una foto del producto ofertado</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Select onChange={(event)=> {handleChange(event)}}
                                    name="filial" value={form.fil} variant="outlined"
                            >
                                <MenuItem value={0} disabled>
                                    Seleccione una filial
                                </MenuItem>
                                { filiales.map((filial) => (
                                    <MenuItem value={filial.id}>{filial.nombre} ({filial.direccion})</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="filial-text">Seleccione la filial donde desea realizar el intercambio</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <DateTimePicker onChange={(event)=> {handleChange({...event, target: {name:"fechaHora"}})}}
                                            variant="outlined" name="fechaHora" defaultValue={defDateTime}
                                            minDate={nextDay} maxDate={nextMonth} timeSteps={{minutes: 30}}
                                            minTime={startTime} maxTime={endTime} shouldDisableDate={isWeekend}
                                            slotProps={{ textField: { readOnly: true } }}
                            />
                            <FormHelperText id="fechaHora-text">Indique fecha y hora deseadas para realizar el intercambio</FormHelperText>
                        </FormControl>
                        <Button startIcon={<PostAddRoundedIcon color="primary"/>} disabled={btnDisabled}
                                variant="contained" color="success" onClick={addOferta}>
                            <Typography variant="button">Realizar oferta</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddOfertaPage;