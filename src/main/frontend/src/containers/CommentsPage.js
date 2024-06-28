import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Box } from "@mui/material";

function CommentsPage() {
    const params = useParams();
    const [publicacion, setPost] = useState({});
    const [user, setUser] = useState({});
    const [comentarioText, setComentarioText] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [disableComentar, setDisableComentar] = useState(true);
    const [respuestaText, setRespuestaText] = useState("");
    const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
    const [respuestas, setRespuestas] = useState({});

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
            const comentariosActivos = response.data;
            comentariosActivos.sort((a, b) => new Date(b.fechaComentario) - new Date(a.fechaComentario));
            setComentarios(comentariosActivos);
            // Fetch respuestas for each comentario
            for (let comentario of comentariosActivos) {
                fetchRespuestas(comentario.idComentario);
            }
        } catch (error) {
            alert("Error obteniendo comentarios: " + error);
        }
    };

	const fetchRespuestas = async (comentarioId) => {
	    try {
	        let url = "http://localhost:8080/respuesta-comentario/" + comentarioId;
	        const response = await axios.get(url);
	        const respuesta = response.data;
	        if (respuesta && respuesta.length > 0) {
	            // Si hay respuestas, actualizar el estado
	            setRespuestas(prevRespuestas => ({
	                ...prevRespuestas,
	                [comentarioId]: respuesta
	            }));
	        } else {
	            // Si no hay respuestas, establecer un valor vacío o null
	            setRespuestas(prevRespuestas => ({
	                ...prevRespuestas,
	                [comentarioId]: null
	            }));
	        }
	    } catch (error) {
	        // Manejar errores aquí
	        console.error("Error obteniendo respuestas:", error);
	        alert("Error obteniendo respuestas: " + error.message);
	    }
	};

    const handleComentarioChange = (event) => {
        const texto = event.target.value;
        setComentarioText(texto);
        setDisableComentar(texto.trim() === "" || texto.length > 240);
    };

    const handleRespuestaChange = (event) => {
        setRespuestaText(event.target.value);
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
            alert(response.data);
            setComentarioText("");
            fetchComentarios();
            fetchPost();
        } catch (error) {
            alert("Error al guardar comentario: " + error);
        }
    };

    const guardarRespuesta = async (comentarioId) => {
        if (respuestaText.trim() === "") {
            alert("Por favor, ingresa una respuesta.");
            return;
        }

        try {
            const respuestaData = {
                text: respuestaText,
                idUser: user.idUser,
                idComentario: comentarioId
            };
            const response = await axios.post("http://localhost:8080/respuesta-comentario/guardar", respuestaData);
            alert(response.data);
            setRespuestaText("");
            fetchRespuestas(comentarioId);
        } catch (error) {
            alert("Error al guardar respuesta: " + error);
        }
    };

    const eliminarComentario = async (comentarioId) => {
        try {
            const response = await axios.delete("http://localhost:8080/comentario/eliminar/" + comentarioId);
            alert(response.data);
            fetchComentarios();
            fetchPost();
        } catch (error) {
            alert("Error al eliminar comentario: " + error);
        }
    };

    const handleResponderClick = (comentario) => {
        setComentarioSeleccionado(comentario);
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={guardarComentario}
                        disabled={disableComentar}
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
                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'grey.400',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    marginBottom: '8px'
                                }}
                            >
                                <Typography variant="body2">
                                    {comentario.nombre} {comentario.apellido} - {new Date(comentario.fechaComentario).toLocaleString()}
                                    {(comentario.userId === user.idUser || user.tipoUser === 2) && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            sx={{
                                                marginLeft: 1,
                                                padding: '2px 5px',
                                                fontSize: '0.70rem'
                                            }}
                                            onClick={() => eliminarComentario(comentario.idComentario)}
                                        >
                                            Eliminar
                                        </Button>
                                    )}
                                    {publicacion.id === user.idUser && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                marginLeft: 1,
                                                padding: '2px 5px',
                                                fontSize: '0.70rem'
                                            }}
                                            onClick={() => handleResponderClick(comentario)}
                                        >
                                            Responder
                                        </Button>
                                    )}
                                </Typography>
                                <Typography variant="subtitle2">{comentario.text}</Typography>

								{/* Mostrar respuesta si existe */}
								{respuestas[comentario.idComentario] && (
								    <Box
								        sx={{
								            borderLeft: '2px solid grey',
								            marginLeft: '16px',
								            paddingLeft: '8px',
								            marginTop: '8px'
								        }}
								    >
								        <Typography variant="body2">
								            {respuestas[comentario.idComentario].nombre} {respuestas[comentario.idComentario].apellido} - {respuestas[comentario.idComentario].fechaRespuesta && new Date(respuestas[comentario.idComentario].fechaRespuesta).toLocaleString()}
								        </Typography>
								        <Typography variant="subtitle2">{respuestas[comentario.idComentario].text}</Typography>
								    </Box>
								)}
								{/* Formulario para responder */}
								{comentarioSeleccionado && comentarioSeleccionado.idComentario === comentario.idComentario && (
								    <Box sx={{ marginLeft: 2, marginTop: 1 }}>
								        <TextField
								            fullWidth
								            multiline
								            rows={2}
								            variant="outlined"
								            label="Escribe tu respuesta"
								            value={respuestaText}
								            onChange={handleRespuestaChange}
								        />
								        <Button
								            variant="contained"
								            color="primary"
								            onClick={() => guardarRespuesta(comentario.idComentario)}
								            sx={{ marginTop: 1 }}
								        >
								            Enviar Respuesta
								        </Button>
								    </Box>
								)}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" style={{ marginTop: "20px" }}>
                    No hay comentarios para mostrar.
                </Typography>
            )}
        </React.Fragment>
    );
}

export default CommentsPage;
