import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Item from "../utils/Item";
import {colors} from "../utils/colors";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import {defaultFormAddPost} from "../utils/utilConstants";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import {MenuItem, Select} from "@mui/material";
import PostItem from "../components/post/PostItem";

function AddOfertaPage() {
    // Render on start
    useEffect(() => {
        fetchCategorias();
        fetchFiliales();
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            setUser(user);
        };
    }, []);
    const [categorias, setCategorias] = useState([])
    const [filiales, setFiliales] = useState([]);
    const [selectedFilial, setSelectedFilial] = useState('');
    const reader = new FileReader();

    const [user, setUser] = useState({});
    const [image, setImage] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState(0);
    const [fil, setFil] = useState(0);
    const [fecha, setFecha] = useState(Date());

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
            console.log(response.data);
        } catch (error) {
            alert("Error obteniendo filiales: " + error);
        }
    };

    const handleChange = async (e) => {
        switch (e.target.name) {
            case "titulo": setTitulo(e.target.value); break;
            case "descripcion": setDesc(e.target.value); break;
            case "categoria": setCat(e.target.value); break;
            case "imagen": setImage(e.target.files[0]); break;
            case "filial": setFil(e.target.value); break;
            case "fechaHora": setFecha(e.target.value); break;
            default: break;
        }
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
        formdata.append("titulo", titulo);
        formdata.append("descripcion", desc);
        formdata.append("publicacionId", pubId);
        formdata.append("userId", userId);
        formdata.append("filialId", fil);
        formdata.append("categoriaId", cat);
        formdata.append("fechaIntercambio", fecha);
        formdata.append("imagen", await fileToBase64(image));

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
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "column",
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <Item>
                    <Typography variant="subtitle1">Registrar Publicación</Typography>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}}
                                   placeholder="Título" type="text" variant="outlined" name="titulo" className="AddPostForm"
                        />
                        <FormHelperText id="titulo-text">Ingrese el título de su publicación</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}} className="AddPostForm"
                                   placeholder="Descripción" multiline={true} rows={4} type="text" variant="outlined" name="descripcion"
                        />
                        <FormHelperText id="descripcion-text">Describa el producto publicado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
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
                        <FormHelperText id="categoria-text">Seleccione la categoría del producto ofertado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}}
                                   placeholder="Imagen" type="file" variant="outlined" name="imagen" className="AddPostForm"
                        />
                        <FormHelperText id="descripcion-text">Agregue una foto del producto ofertado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
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
                        <FormHelperText id="filial-text">Seleccione la filial para realizar el intercambio</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}} className="AddPostForm"
                                   placeholder="Fecha/Hora" type="datetime-local" variant="outlined" name="fechaHora"
                        />
                        <FormHelperText id="fechaHora-text">Proponga fecha y hora para el intercambio</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <Button variant="contained" color="success" startIcon={<PostAddRoundedIcon color="primary"/>}
                            onClick={addOferta}>
                        <Typography variant="button">Realizar oferta</Typography>
                    </Button>
                </Item>
            </Box>
        </React.Fragment>
    )
}

export default AddOfertaPage;