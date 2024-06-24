import React, {useContext, useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Post from "../components/post/Post";
import OfertaGrid from "../components/oferta/OfertaGrid";
import OfertaItem from "../components/oferta/OfertaItem";
import {defaultFormAddPost} from "../utils/utilConstants";
import Typography from "@mui/material/Typography";
import {Link, useParams} from "react-router-dom";
// import SessionContext from "../context/context";
// import AddOfferModal from "../components/offer/AddOfferModal";

function InspectPostPage() {
    // const {user} = useContext(SessionContext);
    // Render on start

    const params = useParams();
    useEffect(() => {

        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPost();
        }
    }, []);


    const reader = new FileReader();
    const [hayOfertas, setHayOfertas] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [publicacion, setPost] = useState([]);
    const [user, setUser] = useState({});

    const fetchPost = async () => {
        try {
            let id = params.id;
            let url = "http://localhost:8080/publicacion/"+id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`
            setPost(data);
            fetchOfertas();
        } catch (error) {
            alert("Error obteniendo publicacion: "+error);
        }
    }
    const fetchOfertas = async () => {
        try {
            // id = post.id;
            // TEST
            let id = params.id;
            let url = "http://localhost:8080/publicacion/"+id+"/ofertas";
            const response = await axios.get(url);
            setOfertas(response.data);
            if (response.data.length > 0) setHayOfertas(true);
            else setHayOfertas(false);
        } catch (error) {
            alert("Error obteniendo ofertas: "+error);
        }
    }

    const rechazarOferta = async (id) => {
        console.log("Eliminando oferta con ID:", id);
        try {
            await axios.delete("http://localhost:8080/oferta/eliminar/"+id);
            fetchOfertas();
        } catch (error) {
            console.log("Error eliminando oferta: "+error);
        }
        fetchOfertas();
    }

    const aceptarOferta = async (id) => {
        console.log("Aceptando oferta con ID:", id);
        try {
            await axios.put("http://localhost:8080/oferta/aceptar/"+id);
        } catch (error) {
            console.log("Error aceptando oferta: "+error);
        }
        fetchPost();
    }
    
    return (
        <React.Fragment>
            <PostItem id={publicacion.id} data={publicacion} user={user} update={fetchPost}/>
            <OfertaGrid>
                { ofertas.map((oferta) => (
                    <OfertaItem id={oferta.id} data={oferta} publicacion={publicacion} user={user} update={fetchOfertas} rechazar={rechazarOferta} aceptar={aceptarOferta}/>
                ))}
            </OfertaGrid>            
            { !hayOfertas ?
                <div style={{textAlign: "center", paddingTop: "30px", paddingBottom: "50px"}}>
                    <Typography variant="h1">No se encontraron ofertas.</Typography>
                </div>
                : null
            }

        </React.Fragment>
    )
}

export default InspectPostPage;