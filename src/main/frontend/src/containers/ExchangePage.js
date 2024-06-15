import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import IntercambioItem from "../components/intercambio/IntercambioItem";
import {useParams} from "react-router-dom";
// import SessionContext from "../context/context";
// import AddOfferModal from "../components/offer/AddOfferModal";

function Exchange() {
    // const {user} = useContext(SessionContext);
    // Render on start

    const params = useParams();
    useEffect(() => {

        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetch();
        }
    }, []);


    const reader = new FileReader();
    const [publicacion, setPost] = useState([]);
    const [intercambio, setIntercambio] = useState([]);
    const [oferta, setOferta] = useState([]);
    const [user, setUser] = useState({});

    const cancelar = (id) => {
        try {
            let url = "http://localhost:8080/intercambio/cancelar/"+id;
            axios.put(url);
            window.location.href = "/app/home";
        } catch (error) {
            alert("Error cancelando intercambio: "+error);
            fetch();
        }
    }

    const confirmar = (id) => {
        try {
            let url = "http://localhost:8080/intercambio/confirmar/"+id;
            axios.put(url);
            window.location.href = "/app/home";
        } catch (error) {
            alert("Error cancelando intercambio: "+error);
            fetch();
        }
    }


    const fetch = async () => {
        try {
            const id = params.id;
            let url = "http://localhost:8080/publicacion/"+id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`
            setPost(data);
        } catch (error) {
            alert("Error obteniendo publicacion: "+error);
        }
        try {
            const id = params.id;
            let url = "http://localhost:8080/intercambio/publicacion/"+id;
            const response = await axios.get(url);
            let data = response.data;
            setIntercambio(response.data);
            setOferta(response.data.oferta);
        } catch (error) {
            alert("Error obteniendo intercambios: "+error);
        }
    }
    
    return (
        <React.Fragment>
            <IntercambioItem id={intercambio.id} data={intercambio} publicacion={publicacion} oferta={oferta} user={user} cancelar={cancelar} confirmar={confirmar}/>
        </React.Fragment>
    )
}

export default Exchange;