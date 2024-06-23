import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

function CommentsPage() {
    const params = useParams();
    const [publicacion, setPost] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if (cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPost();
        }
    }, []);

    const fetchPost = async () => {
        try {
            let id = params.id;
            let url = "http://localhost:8080/publicacion/"+id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`
            setPost(data);
        } catch (error) {
            alert("Error obteniendo publicacion: "+error);
        }
    }
    

    return (
        <React.Fragment>
            <PostItem id={publicacion.id} data={publicacion} user={user} update={fetchPost} />

            {/* Aquí podrías agregar secciones para los comentarios si lo deseas */}

            {/* Mensaje si no hay comentarios */}
            {true ? (
                <div style={{ textAlign: "center", paddingTop: "30px", paddingBottom: "50px" }}>
                    <Typography variant="h1">No se encontraron comentarios.</Typography>
                </div>
            ) : null}
        </React.Fragment>
    );
}

export default CommentsPage;
