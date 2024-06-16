import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import {defaultFormAddPost} from "../utils/utilConstants";
import IntercambioItem from "../components/intercambio/IntercambioItem";

function ExchangeListPage() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
        }
        fetchIntercambios();
    }, []);

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [intercambios, setIntercambio] = useState([]);
    const [states, setStates] = useState([]);

    const fetchIntercambios = async () => {
        try {
            let url = "http://localhost:8080/intercambio/all";
            const response = await axios.get(url);
            let data = response.data;
            // Filtrar intercambios por estado de publicacion
            data = data.filter(function (intercambio) {
                return intercambio.publicacion.estado == "Reservado";
            });
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
        </React.Fragment>
    )
}

export default ExchangeListPage;