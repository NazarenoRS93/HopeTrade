import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";

function CommentsPage() {
    const params = useParams();
    const [publicacion, setPost] = useState({});
    const [user, setUser] = useState({});
    const [comentarioText, setComentarioText] = useState("");
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if (cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPost();
            fetchComentarios();
        }
    }, []);

    const fetchPost = async () => {
        try {
            let id = params.id;
            let url = "http://localhost:8080/publicacion/" + id;
            const response = await axios.get(url);
            const data = response.data;
            data.imagenUrl = `data:image/jpeg;base64,${data.imagen}`;
            setPost(data);
        } catch (error) {
            alert("Error obteniendo publicacion: " + error);
        }
    };

    const fetchComentarios = async () => {
        try {
            let id = params.id;
            let url = "http://localhost:8080/comentario/publicacion/"+id; 
            const response = await axios.get(url);
            setComentarios(response.data);
        } catch (error) {
            alert("Error obteniendo comentarios: " + error);
        }
    };

    const handleComentarioChange = (event) => {
        setComentarioText(event.target.value);
    };

    const guardarComentario = async () => {
        if (comentarioText.trim() === "") {
            alert("Por favor, ingresa un comentario.");
            return;
        }

        try {
            const comentarioData = {
                text: comentarioText,
                user: user.id, // Asegúrate de enviar el ID del usuario actual
                publicacion: publicacion.id // Asegúrate de enviar el ID de la publicación actual
            };

            const response = await axios.post("http://localhost:8080/comentario/guardar", comentarioData);
            alert(response.data); // Mensaje de éxito
            setComentarioText(""); // Limpiar el campo de texto después de enviar el comentario
            fetchComentarios(); // Actualizar la lista de comentarios
        } catch (error) {
            alert("Error al guardar comentario: " + error);
        }
    };

    return (
        <React.Fragment>
            <PostItem id={publicacion.id} data={publicacion} user={user} update={fetchPost} />

            {/* Sección para comentarios */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Escribe tu comentario"
                        value={comentarioText}
                        onChange={handleComentarioChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={guardarComentario}>
                        Comentar
                    </Button>
                </Grid>
            </Grid>

            {/* Mostrar comentarios existentes */}
            {comentarios.length > 0 ? (
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {comentarios.map((comentario) => (
                        <Grid item xs={12} key={comentario.id}>
                            <Typography variant="body2"> {comentario.nombre} {comentario.apellido}</Typography>
                             <Typography variant="subtitle2">{comentario.text}</Typography>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div style={{ textAlign: "center", paddingTop: "30px", paddingBottom: "50px" }}>
                    <Typography variant="h4">¡Nadie ha comentado nada, se el primero!.</Typography>
                </div>
            )}
        </React.Fragment>
    );
}

export default CommentsPage;
