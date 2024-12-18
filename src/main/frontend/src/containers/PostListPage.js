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
import Grid from "@mui/material/Grid";

function PostListPage() {

    const reader = new FileReader();
    const [ready, setReady] = useState(null);
    const [user, setUser] = useState({});
    const [publicaciones, setPublicaciones] = useState([]);
    const [hayPublis, setHayPublis] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(0);
    const [selectedState, setSelectedState] = useState("Disponible");

    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
        }
        fetchCategorias();
    }, []);

    useEffect(() => {
        fetchPublicaciones(user.idUser);
    }, [user, selectedState, selectedCategoria]);

    const fetchPublicaciones = async (idUser) => {
        try {
            let path = "/all/activas";
            if(window.location.href.includes("my-posts")) {
                // wait for idUser to resolve
                while(idUser === undefined) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                path = "/user/" + user.idUser;
            }
            if (user.tipoUser === 1 || user.tipoUser === 2) {
                path = "/all";
            }
            let url = "http://localhost:8080/publicacion"+path;
            const response = await axios.get(url);
            let data = response.data.map(publicacion => {
                return {
                    ...publicacion,
                    imagenUrl: `data:image/jpeg;base64,${publicacion.imagen}`
                };

            });
            if (!window.location.href.includes("my-posts") && user.tipoUser === 0) {
                data = data.filter(function (publicacion) {
                    return publicacion.estado == "Disponible";
                });
            }
            else if (window.location.href.includes("my-posts") && user.tipoUser === 0) {
                data = data.filter(function (publicacion) {
                    return publicacion.estado == "Disponible" || publicacion.estado == "Reservado" || publicacion.estado == "Finalizado";
                });
            }
            if (selectedState != 0 && selectedState != null) {
                data = data.filter(function (publicacion) {
                    return publicacion.estado == selectedState;
                });
            }
            if(selectedCategoria != 0 && selectedCategoria != null) {
                data = data.filter(function (publicacion) {
                    return publicacion.categoria_ID == selectedCategoria;
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
        fetchPublicaciones(user.idUser);
    }

    const handleCatChange = (event) => {
        setSelectedCategoria(event.target.value);
        fetchPublicaciones(user.idUser);
    }

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        fetchPublicaciones(user.idUser);
    }


    return (

        <React.Fragment>
            <Grid container spacing={4} className="FullWidthPage">
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <FormControl>
                            <Select
                                value={selectedCategoria}
                                onChange={handleCatChange}
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
                        { (user.tipoUser !== 0)?
                            <FormControl>
                                <Select
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    sx={{ minWidth: 250 }}
                                >
                                    <MenuItem value="0">
                                        Todos
                                    </MenuItem>
                                    <MenuItem value="Disponible">
                                        Disponible
                                    </MenuItem>
                                    <MenuItem value="Reservado">
                                        Reservado
                                    </MenuItem>
                                    <MenuItem value="Finalizado">
                                        Finalizado
                                    </MenuItem>
                                    { (user.tipoUser !== 0) ?
                                        <MenuItem value="Eliminado">
                                            Eliminado
                                        </MenuItem>
                                        : null
                                    }
                                </Select>
                                <FormHelperText id="categoria-text">Filtre por estado</FormHelperText>
                            </FormControl>    
                            : null
                        }
                    </Stack>           
                </Grid>
                <Grid item xs={12}>
                    <PostGrid>
                        { publicaciones.map((publicacion) => (
                            <PostItem id={publicacion.id} data={publicacion} user={user} update={onUpdate}/>
                        ))}
                    </PostGrid>
                </Grid>
                <Grid item xs={12}>
                    { !hayPublis ?
                        <div style={{textAlign: "center", paddingTop: "30px", paddingBottom: "50px"}}>
                            <Typography variant="h1">No se encontraron publicaciones.</Typography>
                        </div>
                        : null
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PostListPage;