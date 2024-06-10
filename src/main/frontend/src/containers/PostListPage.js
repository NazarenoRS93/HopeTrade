import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import PostItem from "../components/post/PostItem";
import {defaultFormAddPost} from "../utils/utilConstants";
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {FormLabel, Stack} from "@mui/material";

function PostListPage() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPublicaciones(usuario.idUser, 0);
        }
        fetchCategorias();
    }, []);

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [publicaciones, setPublicaciones] = useState([]);
    const [hayPublis, setHayPublis] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(0);
    const [states, setStates] = useState([]);
    const [form, setForm] = useState(defaultFormAddPost)

    const fetchPublicaciones = async (idUser, cat) => {
        try {
            let path = "/all/activas";
            if(window.location.href.includes("my-posts")) {
                path = "/user/" + idUser + "/activas";
            }
            let url = "http://localhost:8080/publicacion"+path;
            const response = await axios.get(url);
            let data = response.data.map(publicacion => {
                return {
                    ...publicacion,
                    imagenUrl: `data:image/jpeg;base64,${publicacion.imagen}`
                };

            });
            if(cat != 0) {
                console.log("CATEGORIA:"+ cat);
                data = data.filter(function (publicacion) {
                    return publicacion.categoria_ID == cat;
                });
            }
            if (data.length > 0) setHayPublis(true);
            else setHayPublis(false);
            setPublicaciones(data);
        } catch (error) {
            console.log("Error obteniendo publicaciones: " + error);
            // alert("Error obteniendo publicaciones: "+error);
        }
    }

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            setCategorias(response.data);
        } catch (error) {
            alert("Error obteniendo categorías: "+error);
        }
    }
    const onUpdate = () => {
        fetchPublicaciones(user.idUser, selectedCategoria);
    }

    const handleChange = (event) => {
        setSelectedCategoria(event.target.value);
        fetchPublicaciones(user.idUser, event.target.value);
    }

    return (

        <React.Fragment>
            <Stack spacing={2} direction="row" justifyContent="center" sx={{paddingBottom: "30px"}}>
                <FormControl>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                        value={selectedCategoria}
                        onChange={handleChange}
                        defaultValue="0"
                        sx={{ minWidth: 250 }}
                    >
                        <MenuItem value="0">
                            Todos
                        </MenuItem>
                        {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText id="categoria-text">Filtre por categoría</FormHelperText>
                </FormControl>
            </Stack>
            <PostGrid>
                { publicaciones.map((publicacion) => (
                    <PostItem id={publicacion.id} data={publicacion} user={user} update={onUpdate}/>
                ))}
            </PostGrid>
            { !hayPublis ?
                <div style={{textAlign: "center", paddingTop: "30px", paddingBottom: "50px"}}>
                    <Typography variant="h1">No se encontraron publicaciones.</Typography>
                </div>
                : null
            }
        </React.Fragment>
    )
}

export default PostListPage;