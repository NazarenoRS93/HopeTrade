import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

function CommentsPage() {
    const params = useParams();
    const [publicacion, setPost] = useState({});
    const [user, setUser] = useState({});
    const [comentarioText, setComentarioText] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [disableComentar, setDisableComentar] = useState(true);

    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if (cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPost();
            fetchComentarios();
        }
    }, []);

    useEffect(() => {
        // Verificar si el campo de comentario está vacío o tiene más de 250 caracteres
        setDisableComentar(comentarioText.trim() === "" || comentarioText.length > 250);
    }, [comentarioText]);

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
            let url = "http://localhost:8080/comentario/publicacion/" + id;
            const response = await axios.get(url);
            // Filtrar solo los comentarios activos
            const comentariosActivos = response.data.filter(comentario => comentario.activo);
            // Ordenar los comentarios de más reciente a más antiguo
            comentariosActivos.sort((a, b) => new Date(b.fechaComentario) - new Date(a.fechaComentario));
            setComentarios(comentariosActivos);
        } catch (error) {
            alert("Error obteniendo comentarios: " + error);
        }
    };

    const handleComentarioChange = (event) => {
        const texto = event.target.value;
        setComentarioText(texto);
        // Verificar la longitud del comentario y actualizar disableComentar
        setDisableComentar(texto.trim() === "" || texto.length > 250);
    };

    const guardarComentario = async () => {
        if (comentarioText.trim() === "") {
            alert("Por favor, ingresa un comentario.");
            return;
        }

        try {
            const comentarioData = {
                text: comentarioText,
                user: user.idUser,
                publicacion: publicacion.id
            };

            const response = await axios.post("http://localhost:8080/comentario/guardar", comentarioData);
            alert(response.data); // Mensaje de éxito
            setComentarioText(""); // Limpiar el campo de texto después de enviar el comentario
            fetchComentarios(); // Actualizar la lista de comentarios
            fetchPost();
        } catch (error) {
            alert("Error al guardar comentario: " + error);
        }
    };

    const eliminarComentario = async (comentarioId) => {
        try {
            const response = await axios.delete("http://localhost:8080/comentario/eliminar/" + comentarioId);
            alert(response.data); // Mensaje de éxito
            fetchComentarios(); // Actualizar la lista de comentarios
            fetchPost();
        } catch (error) {
            alert("Error al eliminar comentario: " + error);
        }
    };
    
    console.log("Datos de usuario:", user);
    console.log("Lista de comentarios:", comentarios);

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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={guardarComentario}
                        disabled={disableComentar} // Deshabilitar el botón si el comentario está vacío o supera los 250 caracteres
                    >
                        Comentar
                    </Button>
                </Grid>
            </Grid>

            {/* Mostrar comentarios existentes */}
            {comentarios.length > 0 ? (
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {comentarios.map((comentario) => (
                        <Grid item xs={12} key={comentario.idComentario}>
                            <Typography variant="body2">
                                {comentario.nombre} {comentario.apellido} - {format(new Date(comentario.fechaComentario), "dd/MM/yyyy HH:mm:ss")}
                                {/* Verificar que comentario.user esté definido */}
                                {comentario.userId === user.idUser && (
                                    <IconButton
                                        color="error"
                                        aria-label="Eliminar comentario"
                                        onClick={() => eliminarComentario(comentario.idComentario)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Typography>
                            <Typography variant="subtitle2">{comentario.text}</Typography>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div style={{ textAlign: "center", paddingTop: "30px", paddingBottom: "50px" }}>
                    <Typography variant="h4">¡Nadie ha comentado nada, sé el primero!</Typography>
                </div>
            )}
        </React.Fragment>
    );
}

export default CommentsPage;
