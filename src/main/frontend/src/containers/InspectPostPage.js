import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostItem from "../components/post/PostItem";
import OfertaGrid from "../components/oferta/OfertaGrid";
import OfertaItem from "../components/oferta/OfertaItem";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
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

            console.log(user);
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
            let data = response.data;
            console.log(data);
            data.filter(function (oferta) {
                return oferta.estado == "ACTIVA";
            });
            setOfertas(data);
            if (data.length > 0) setHayOfertas(true);
            else setHayOfertas(false);
        } catch (error) {
            alert("Error obteniendo ofertas: "+error);
        }
    }

    const rechazarOferta = async (id, motivo) => {
        console.log("Rechazando oferta con ID:", id);
        const url = `http://localhost:8080/oferta/rechazar/${id}`;
        let respuesta = motivo;
        const params = { respuesta: respuesta };

        console.log("Request URL:", url);
        console.log("Params:", params);

        await axios.put(url, null, { params: params })
        .then(function (response) {
            alert("Oferta rechazada!");
        })
        .catch(function (error) {
            console.log("Error rechazando oferta: " + (error.response ? error.response.data : error.message));
        });
        fetchPost();
        fetchOfertas();
    }

    const aceptarOferta = async (id) => {
        console.log("Aceptando oferta con ID:", id);
        await axios.put("http://localhost:8080/oferta/aceptar/"+id)
        .then(function (response) {
            alert("Oferta Aceptada!");
            window.location.href = "/app/home";
        })
        .catch(function (error) {
            console.log("Error aceptando oferta: "+error.response.data);
        });
        fetchPost();
        fetchOfertas();
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