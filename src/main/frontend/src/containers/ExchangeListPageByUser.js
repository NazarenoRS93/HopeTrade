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
import {useParams} from "react-router-dom";

function ExchangeListPageByUser() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
        }
    }, []);
    
    const params = useParams();

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [intercambios, setIntercambio] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("PROGRAMADO");
    const [hayIntercambios, setHayIntercambios] = useState(false);

    useEffect(() => {
        fetchIntercambios();
    }, [user, selectedState]);

    const fetchIntercambios = async () => {
        try {
            let id = params.id;
            let url = "http://localhost:8080/intercambio/user/"+id;
            const response = await axios.get(url);
            let data = response.data.map(intercambio => {
                return {
                    ...intercambio,
                    imagenUrl: `data:image/jpeg;base64,${intercambio.publicacion.imagen}`,
                    imagenUrl2: `data:image/jpeg;base64,${intercambio.oferta.imagen}`
                };

            });
            // Filtrar intercambios por estado de publicacion
            if (selectedState !== "Todos") {
                data = data.filter(function (intercambio) {
                    return intercambio.estado == selectedState;
                });
            }
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
            console.log(data);
            setIntercambio(data);
        } catch (error) {
            alert("Error obteniendo intercambios: "+error);
        }
    }

    const onUpdate = () => {
    }

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        fetchIntercambios();
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
            let url = "http://localhost:8080/intercambio/confirmar/"+id;
            axios.put(url);
            fetchIntercambios();
        } catch (error) {
            console.log("Error cancelando intercambio: "+error);
            fetchIntercambios();
        }
    }

    return (
        <React.Fragment>
            { (true)?
                <FormControl>
                    <Select value={selectedState} onChange={handleStateChange} sx={{ minWidth: 250 }} >
                        <MenuItem value="Todos"> Todos </MenuItem>
                        <MenuItem value="PROGRAMADO"> Programado </MenuItem>
                        <MenuItem value="FINALIZADO"> Finalizado </MenuItem>
                        <MenuItem value="CANCELADO"> Cancelado </MenuItem>
                    </Select>
                    <FormHelperText id="categoria-text">Filtre por estado</FormHelperText>
                </FormControl>    
                : null}
            <PostGrid>
            {  intercambios?.map((intercambio) => (
                <IntercambioItem id={intercambio.id} data={intercambio} publicacion={intercambio.publicacion} oferta={intercambio.oferta} user={user} cancelar={cancelar} confirmar={confirmar}/>
            ))}
            </PostGrid>
            <Grid item xs={12}>
                { !hayIntercambios ?
                    <div style={{textAlign: "center", paddingTop: "30px", paddingBottom: "50px"}}>
                        <Typography variant="h1">No se encontraron intercambios.</Typography>
                    </div>
                    : null
                }
            </Grid>
        </React.Fragment>
    )
}

export default ExchangeListPageByUser;