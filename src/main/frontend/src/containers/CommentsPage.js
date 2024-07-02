import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../components/post/PostItem";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Box } from "@mui/material";
import ComentariosYRespuestasService from "../services/ComentariosYRespuestasService";

function CommentsPage() {
	const params = useParams();
	const [publicacion, setPost] = useState({});
	const [user, setUser] = useState({});
	const [comentarioText, setComentarioText] = useState("");
	const [comentarios, setComentarios] = useState([]);
	const [disableComentar, setDisableComentar] = useState(true);
	const [disableEnviarRespuesta, setDisableEnviarRespuesta] = useState(true);
	const [respuestaText, setRespuestaText] = useState("");
	const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
	const [respuestas, setRespuestas] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const cookie = window.localStorage.getItem("user");
		if (cookie) {
			let usuario = JSON.parse(cookie);
			setUser(usuario);
			fetchData();
		}
	}, []);

	useEffect(() => {
		setDisableComentar(comentarioText.trim() === "" || comentarioText.length > 250);
	}, [comentarioText]);

	useEffect(() => {
		setDisableEnviarRespuesta(respuestaText.trim() === "" || respuestaText.length > 250);
	}, [respuestaText]);

	const fetchData = async () => {
		try {
			await fetchPost();
			await fetchComentarios();
		} catch (error) {
			alert("Error cargando datos: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchPost = async () => {
		try {
			let id = params.id;
			let url = `http://localhost:8080/publicacion/${id}`;
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
			const comentariosActivos = await ComentariosYRespuestasService.fetchComentarios(id);
			comentariosActivos.sort((a, b) => new Date(b.fechaComentario) - new Date(a.fechaComentario));
			setComentarios(comentariosActivos);
			// Fetch respuestas for each comentario
			for (let comentario of comentariosActivos) {
				await fetchRespuestas(comentario.idComentario);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const fetchRespuestas = async (comentarioId) => {
		try {
			const respuesta = await ComentariosYRespuestasService.fetchRespuestas(comentarioId);
			setRespuestas((prevRespuestas) => ({
				...prevRespuestas,
				[comentarioId]: respuesta || null,
			}));
		} catch (error) {
			if (error.message.includes("404")) {
				// No se encontraron respuestas para este comentario
				setRespuestas((prevRespuestas) => ({
					...prevRespuestas,
					[comentarioId]: null,
				}));
			} else {
				alert("Error obteniendo respuestas: " + error.message);
			}
		}
	};

	const handleComentarioChange = (event) => {
		const texto = event.target.value;
		setComentarioText(texto);
		setDisableComentar(texto.trim() === "" || texto.length > 240);
	};

	const handleRespuestaChange = (event) => {
		const texto = event.target.value;
		setRespuestaText(texto);
		setDisableEnviarRespuesta(texto.trim() === "" || texto.length > 240);
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
				publicacion: publicacion.id,
			};
			const response = await ComentariosYRespuestasService.guardarComentario(comentarioData);
			alert(response);
			setComentarioText("");
			fetchComentarios(); // Actualiza comentarios después de agregar uno nuevo
			fetchPost();
		} catch (error) {
			alert(error.message);
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
				idComentario: comentarioId,
			};
			const response = await ComentariosYRespuestasService.guardarRespuesta(respuestaData);
			alert(response);
			setRespuestaText("");
			fetchRespuestas(comentarioId);
		} catch (error) {
			alert(error.message);
		}
	};

	const eliminarComentario = async (comentarioId) => {
		try {
			const response = await ComentariosYRespuestasService.eliminarComentario(comentarioId);
			alert(response);
			fetchComentarios();
			fetchPost();
		} catch (error) {
			alert(error.message);
		}
	};

	const handleResponderClick = (comentario) => {
		setComentarioSeleccionado(comentario);
	};

	if (loading) {
		return <Typography variant="body1">Cargando...</Typography>;
	}

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
									border: "1px solid",
									borderColor: "grey.400",
									borderRadius: "4px",
									padding: "8px",
									marginBottom: "8px",
								}}
							>
								<Typography variant="body2">
									{comentario.nombre} {comentario.apellido} - {new Date(comentario.fechaComentario).toLocaleString()}
									{(comentario.userId === user.idUser || user.tipoUser === 2) && !respuestas[comentario.idComentario] && (
										<Button
											variant="contained"
											color="error"
											size="small"
											sx={{
												marginLeft: 1,
												padding: "2px 5px",
												fontSize: "0.70rem",
											}}
											onClick={() => eliminarComentario(comentario.idComentario)}
										>
											Eliminar
										</Button>
									)}
									{publicacion.userID === user.idUser && !respuestas[comentario.idComentario] && (
										<Button
											variant="contained"
											color="primary"
											size="small"
											sx={{
												marginLeft: 1,
												padding: "2px 5px",
												fontSize: "0.70rem",
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
											borderLeft: "2px solid grey",
											marginLeft: "16px",
											paddingLeft: "8px",
											marginTop: "8px",
										}}
									>
										<Typography variant="body2">
											{publicacion.userFullName} - {respuestas[comentario.idComentario].fechaRespuesta && new Date(respuestas[comentario.idComentario].fechaRespuesta).toLocaleString()}
										</Typography>
										<Typography variant="subtitle2">{respuestas[comentario.idComentario].text}</Typography>
									</Box>
								)}
								{/* Formulario para responder */}
								{comentarioSeleccionado && comentarioSeleccionado.idComentario === comentario.idComentario && !respuestas[comentario.idComentario] && (
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
											disabled={disableEnviarRespuesta}
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
