import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Item from "../utils/Item";
import {colors} from "../utils/colors";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import {defaultFormAddPost} from "../utils/utilConstants";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import {Select} from "@mui/material";

function AddPostPage() {
    const [user, setUser] = useState({});
    const reader = new FileReader();
    const [categorias, setCategorias] = useState([])
    const [form, setForm] = useState(defaultFormAddPost);

    useEffect(() => {
        fetchCategorias();
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            setUser(user);
        };
    }, []);
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            setCategorias(response.data);
        } catch (error) {
            alert("Error obteniendo categorías: "+error);
        }
    }

    const handleChange = (e) => {
        let tempForm = {...form};
        switch (e.target.id) {
            case "titulo": tempForm = {...tempForm, titulo: e.target.value}; break;
            case "descripcion": tempForm = {...tempForm, descripcion: e.target.value}; break;
            case "categoria": tempForm = {...tempForm, categoria: e.target.value}; break;
            case "imagen": tempForm = {...tempForm, imagen: e.target.value}; break;
            default: break;
        }
        setForm(tempForm);
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

    const addPost = async () => {
        var formdata = new FormData();
        formdata.append("titulo", form.titulo);
        formdata.append("descripcion", form.descripcion);
        formdata.append("categoria", form.categoria);
        formdata.append("imagen", await fileToBase64(form.imagen));
        formdata.append("userID", user.id);
        axios.post('http://localhost:8080/publicacion/add', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
        )
            .then(function (response) {
                alert(response.data);
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
                        <TextField onChange={(event)=> {handleChange(event)}} value={form.titulo}
                                   placeholder="Título" type="text" variant="outlined" id="titulo" className="AddPostForm"
                        />
                        <FormHelperText id="titulo-text">Ingrese el título de su publicación</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}} value={form.descripcion} className="AddPostForm"
                                   placeholder="Descripción" multiline={true} rows={4} type="text" variant="outlined" id="descripcion"
                        />
                        <FormHelperText id="descripcion-text">Describa el producto publicado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <Select
                            defaultValue="Seleccionar" className="AddPostForm"
                            onChange={(event)=> {handleChange(event)}}
                            id="categoria" placeholder="Categoría"
                            options={[...categorias]}
                            value={form.categoria}
                        />
                        <FormHelperText id="categoria-text">Seleccione la categoría del producto publicado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl>
                        <TextField onChange={(event)=> {handleChange(event)}} value={form.imagen}
                                   placeholder="Imagen" type="file" variant="outlined" id="imagen" className="AddPostForm"
                        />
                        <FormHelperText id="descripcion-text">Agregue una foto del producto publicado</FormHelperText>
                    </FormControl>
                </Item>
                <Item>
                    <Button variant="contained" color="success" startIcon={<PostAddRoundedIcon color="primary"/>}
                            onClick={addPost}>
                        <Typography variant="button">Ingresar</Typography>
                    </Button>
                </Item>
            </Box>
        </React.Fragment>
    )
}

export default AddPostPage;