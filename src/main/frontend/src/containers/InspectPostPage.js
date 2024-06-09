import React, {useContext, useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import PostItem from "../components/post/PostItem";
import {defaultFormAddPost} from "../utils/utilConstants";
import Typography from "@mui/material/Typography";
import SessionContext from "../context/context";
import AddOfferModal from "../components/offer/AddOfferModal";

function InspectPostPage() {
    // const {user} = useContext(SessionContext);
    // Render on start
    useEffect(() => {
        fetchPost();
    }, []);


    const reader = new FileReader();
    const [ofertas, setOfertas] = useState([]);
    const [publicacion, setPost] = useState([]);

    const fetchPost = async () => {
        try {
            let id = 1;
            let url = "http://localhost:8080/publicacion/{id}";
            const response = await axios.get(url);
            setPost(response.data);
        } catch (error) {
            alert("Error obteniendo publicacion: "+error);
        }
    }
    const fetchOfertas = async () => {
        try {
            // id = post.id;
            // TEST
            let id = 1;
            let url = "http://localhost:8080/publicacion/{id}/ofertas";
            const response = await axios.get(url);
            setOfertas(response.data);
        } catch (error) {
            alert("Error obteniendo ofertas: "+error);
        }
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
    
    return (
        <React.Fragment>
            <Typography variant="h1">No hay publicaciones</Typography>
            <PostItem id={publicacion.id} data={publicacion}
                          update={fetchOfertas}/>
        </React.Fragment>
    )
}

export default InspectPostPage;