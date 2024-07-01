import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import {defaultFormAddPost} from "../utils/utilConstants";
import IntercambioItem from "../components/intercambio/IntercambioItem";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

function ExchangeListPage() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
        }
    }, []);

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [intercambios, setIntercambio] = useState([]);
    const [states, setStates] = useState([]);
    const [hayIntercambios, setHayIntercambios] = useState(false);

    useEffect(() => {
        fetchIntercambios();
    }, [user]);

    const fetchIntercambios = async () => {
        try {
            let url = "http://localhost:8080/intercambio/all";
            const response = await axios.get(url);
            let data = response.data.map(intercambio => {
                return {
                    ...intercambio,
                    imagenUrl: `data:image/jpeg;base64,${intercambio.publicacion.imagen}`
                };

            });
            // Filtrar intercambios por estado de publicacion
            data = data.filter(function (intercambio) {
                return intercambio.estado == "PROGRAMADO";
            });
            if (user.tipoUser === 1) {
                data = data.filter(function (intercambio) {
                    return intercambio.oferta.filialId == user.filial;
                });
            }
            // Ordenar data por fecha
            data.sort(function (a, b) {
                return new Date(b.oferta.fechaIntercambio) - new Date(a.oferta.fechaIntercambio);
            });
            setHayIntercambios(data.length > 0);
            setIntercambio(data);
        } catch (error) {
            alert("Error obteniendo intercambios: "+error);
        }
    }

    const onUpdate = () => {
    }

    const handleChange = (event) => {
    }

    const cancelar = (id) => {
        try {
            let url = "http://localhost:8080/intercambio/cancelar/"+id;
            axios.put(url);
            fetchIntercambios();
        } catch (error) {
            alert("Error cancelando intercambio: "+error);
            fetchIntercambios();
        }
    }

    const confirmar = (id) => {
        try {
            let url = "http://localhost:8080/intercambio/cancelar/"+id;
            axios.put(url);
            fetchIntercambios();
        } catch (error) {
            console.log("Error cancelando intercambio: "+error);
            fetchIntercambios();
        }
    }

    return (
        
        <React.Fragment>
            <PostGrid>
            {  intercambios?.map((intercambio) => (
                <IntercambioItem id={intercambio.id} data={intercambio} publicacion={intercambio.publicacion} oferta={intercambio.oferta} user={user} cancelar={cancelar} confirmar={confirmar}/>
            ))}
            </PostGrid>
            <Grid item xs={12}>
                { !hayIntercambios ?
                    <div style={{textAlign: "center", paddingTop: "30px", paddingBottom: "50px"}}>
                        <Typography variant="h1">No se encontraron intercambios programados.</Typography>
                    </div>
                    : null
                }
            </Grid>
        </React.Fragment>
    )
}

export default ExchangeListPage;