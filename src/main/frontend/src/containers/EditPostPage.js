import React, { useEffect, useState } from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { defaultFormAddPost } from "../utils/utilConstants";

function EditPostPage() {
    // Render on start
    useEffect(() => {
        fetchCategorias();
        fetchPost();
        const cookie = window.localStorage.getItem("user");
        if (cookie) {
            let user = JSON.parse(cookie);
            setUser(user);
        };
    }, []);

    const [form, setForm] = useState(defaultFormAddPost);
    const [categorias, setCategorias] = useState([]);
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if (post.descripcion) {
            setForm((prevForm) => ({
                ...prevForm,
                desc: post.descripcion
            }));
            validar({ ...form, desc: post.descripcion }, post.descripcion);
        }
    }, [post]);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            const data = response.data;
            setCategorias(data);
        } catch (error) {
            alert("Error obteniendo categorías: " + error);
        }
    };

    const validar = (form, originalDesc) => {
        if (form.desc.trim() !== "" && form.desc.length <= 250 && form.desc !== originalDesc) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    };

    const handleChange = async (e) => {
        let tempForm = form;
        switch (e.target.name) {
            case "titulo": tempForm = { ...tempForm, titulo: e.target.value }; break;
            case "descripcion": tempForm = { ...tempForm, desc: e.target.value }; break;
            case "categoria": tempForm = { ...tempForm, cat: e.target.value }; break;
            case "imagen": tempForm = { ...tempForm, image: e.target.files[0] }; break;
            default: break;
        }
        setForm(tempForm);
        validar(tempForm, post.descripcion);
    };

    const fetchPost = async () => {
        try {
            let id = window.localStorage.getItem("pubId");
            let url = "http://localhost:8080/publicacion/" + id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`;
            setPost(data);
            console.log(data);
        } catch (error) {
            alert("Error obteniendo publicacion: " + error);
        }
    };

    const editPost = async (event) => {
        event.preventDefault();
        let userID = user.idUser;
        let publicacionID = window.localStorage.getItem("pubId");
        var formdata = new FormData();
        formdata.append("titulo", post.titulo);
        formdata.append("descripcion", form.desc);
        formdata.append("categoria_ID", post.categoria_ID);
        formdata.append("imagen", post.imagen);
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
                window.location.replace(href + "/home");
            })
            .catch(function (error) {
                console.log(error.response.data);
                alert(error.response.data);
            });
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Editar Publicación</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <TextField value={post.titulo}
                                type="text" variant="outlined" id="titulo"
                                InputLabelProps={{ shrink: true }} label="Titulo" InputProps={{ readOnly: true }}
                            />
                            <FormHelperText id="titulo-text"></FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField value={form.desc}
                                onChange={(event) => { handleChange(event) }}
                                multiline={true} rows={4} type="text" variant="outlined" name="descripcion"
                            />
                            <FormHelperText id="descripcion-text">Descripción</FormHelperText>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2} direction="column">
                        <FormControl>
                            <TextField value={post.categoria_Nombre}
                                type="text" variant="outlined" id="categoria"
                                InputLabelProps={{ shrink: true }} label="Categoria" InputProps={{ readOnly: true }}
                            />
                            <FormHelperText id="categoria-text"></FormHelperText>
                        </FormControl>
                        <Button startIcon={<PostAddRoundedIcon color="primary" />} disabled={btnDisabled}
                            variant="contained" color="success" onClick={editPost}>
                            <Typography variant="button">Editar</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default EditPostPage;
