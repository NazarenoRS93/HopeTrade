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
import {defaultFormAddPost} from "../utils/utilConstants";

function EditPostPage() {
    // Render on start
    useEffect(() => {
        fetchCategorias();
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            setUser(user);
        };
    }, []);
    const [form, setForm] = useState(defaultFormAddPost);
    const [categorias, setCategorias] = useState([])
    const reader = new FileReader();

    const [user, setUser] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(true);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            const data = response.data;
            setCategorias(data);
        } catch (error) {
            alert("Error obteniendo categorías: "+error);
        }
    }

    const validar = (form) => {
        if(form.titulo.trim()!=="" && form.desc.trim()!=="" && form.cat !== 0 && form.image !== null) {
            setBtnDisabled(false);
        } else setBtnDisabled(true);
    }
    const handleChange = async (e) => {
        let tempForm = form;
        switch (e.target.name) {
            case "titulo": tempForm = {...tempForm, titulo: e.target.value}; break;
            case "descripcion": tempForm = {...tempForm, desc: e.target.value}; break;
            case "categoria": tempForm = {...tempForm, cat: e.target.value}; break;
            case "imagen": tempForm = {...tempForm, image: e.target.files[0]}; break;
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

    const editPost = async (event) => {
        event.preventDefault();
        let userID = user.idUser;
        let publicacionID = window.localStorage.getItem("pubId");
        var formdata = new FormData();
        formdata.append("titulo", form.titulo);
        formdata.append("descripcion", form.desc);
        formdata.append("categoria_ID", form.cat);
        formdata.append("imagen", await fileToBase64(form.image));
        formdata.append("userID", userID);
        formdata.append("id", publicacionID);
        axios.put('http://localhost:8080/publicacion/update', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
        )
            .then(function (response) {
                alert(response.data);
                let href = window.location.href;
                href = href.substring(0, href.lastIndexOf('/'));
                window.location.replace(href+"/home");
            })
            .catch(function (error) {
                console.log(error.response.data);
                alert(error.response.data);
            });
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Editar Publicación</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       type="text" variant="outlined" name="titulo"
                            />
                            <FormHelperText id="titulo-text">Ingrese el título de su publicación</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       multiline={true} rows={4} type="text" variant="outlined" name="descripcion"
                            />
                            <FormHelperText id="descripcion-text">Describa el producto publicado</FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <Select onChange={(event)=> {handleChange(event)}}
                                    value={form.cat} name="categoria" variant="outlined"
                            >
                                <MenuItem value={0} disabled>
                                    Seleccione una categoría
                                </MenuItem>
                                { categorias.map((categoria) => (
                                    <MenuItem value={categoria.id}>{categoria.nombre}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="categoria-text">Seleccione la categoría del producto publicado</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event)=> {handleChange(event)}}
                                       type="file" variant="outlined" name="imagen" className="AddPostForm"
                            />
                            <FormHelperText id="descripcion-text">Agregue una foto del producto publicado</FormHelperText>
                        </FormControl>
                        <Button variant="contained" color="success" onClick={editPost}
                                startIcon={<PostAddRoundedIcon color="primary"/>}>
                            <Typography variant="button">Publicar</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default EditPostPage;