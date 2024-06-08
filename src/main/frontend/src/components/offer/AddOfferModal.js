import React, {useContext, useEffect, useState} from "react";
import '../../App.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select, Stack} from "@mui/material";
import SessionContext from "../../context/context";
import axios from "axios";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

function AddOfferModal(props) {
    const {open,change} = props;
    const {user,handleLogin} = useContext(SessionContext);

    useEffect(() => {
        fetchCategorias();
        fetchFiliales();
    }, []);
    const [filiales, setFiliales] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [image, setImage] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState(0);
    const [filial, setFilial] = useState(0);
    const [fechaHora, setFechaHora] = useState();

    const handleChange = async (e) => {
        switch (e.target.name) {
            case "descripcion": setDesc(e.target.value); break;
            case "categoria": setCat(e.target.value); break;
            case "imagen": setImage(e.target.files[0]); break;
            case "filial": setFilial(e.target.value); break;
            case "fechaHora": setFechaHora(e.target.value); break;
            default: break;
        }
    }
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            const data = response.data;
            setCategorias(data);
        } catch (error) {
            alert("Error obteniendo categorías: "+error);
        }
    }

    const fetchFiliales = async () => {
        try {
            const response = await axios.get('http://localhost:8080/filial/all');
            setFiliales(response.data);
        } catch (error) {
            alert("Error obteniendo filiales: " + error);
        }
    };

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

    const addOffer = async (event) => {
        event.preventDefault();
        let userID = user.idUser;
        var formdata = new FormData();
        formdata.append("texto", desc);
        formdata.append("categoriaId", cat);
        formdata.append("filialId", filial);
        formdata.append("fechaIntercambio", fechaHora);
        formdata.append("imagen", await fileToBase64(image));
        formdata.append("userId", userID);
        axios.post('http://localhost:8080/oferta/guardar', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
        )
            .then(function (response) {
                alert(response.data);
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                window.location.replace(href+"/home");
                change();
            })
            .catch(function (error) {
                alert(error.response.data);
            });
    }

    return (
        <React.Fragment>
            <Dialog open={open}>
                <DialogTitle>Publicar oferta</DialogTitle>
                <DialogContent>
                    <Grid container className="FullWidthPage">
                        <Grid item xs={12} sx={{alignItems:"center", justifyContent:"center"}}>
                            <Stack spacing={1} direction="column">
                                <FormControl>
                                    <TextField onChange={(event)=> {handleChange(event)}} className="AddPostForm"
                                               placeholder="Descripción" multiline={true} rows={4} type="text" variant="outlined" name="descripcion"
                                    />
                                    <FormHelperText id="descripcion-text">Describa el producto ofertado</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <Select
                                        className="AddPostForm"
                                        onChange={(event)=> {handleChange(event)}}
                                        name="categoria" placeholder="Categoría"
                                    >
                                        { categorias.map((categoria) => (
                                            <MenuItem value={categoria.id}>{categoria.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="categoria-text">Seleccione la categoría del producto publicado</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(event)=> {handleChange(event)}}
                                               placeholder="Imagen" type="file" variant="outlined" name="imagen" className="AddPostForm"
                                    />
                                    <FormHelperText id="descripcion-text">Agregue una foto del producto publicado</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <Select
                                        className="AddPostForm"
                                        onChange={(event)=> {handleChange(event)}}
                                        name="filial" placeholder="Filial"
                                    >
                                        { filiales.map((filial) => (
                                            <MenuItem value={filial.id}>{filial.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="filial-text">Seleccione la filial de intercambio</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(event)=> {handleChange(event)}} className="AddPostForm"
                                               placeholder="Fecha-Hora" multiline={true} rows={4} type="datetime-local" variant="outlined" name="fechaHora"
                                    />
                                    <FormHelperText id="fechaHora-text">Describa el producto ofertado</FormHelperText>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" startIcon={<PersonAddAltRoundedIcon color="background2"/>}
                            onClick={change}>
                        <Typography variant="button2">Cancelar</Typography>
                    </Button>
                    <Button variant="contained" color="success" startIcon={<PostAddRoundedIcon color="primary"/>}
                            onClick={addOffer}>
                        <Typography variant="button">Publicar</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddOfferModal;
