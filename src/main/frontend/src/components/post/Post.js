import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { Avatar, CardContent, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation desde react-router-dom
import { CommentRounded, DeleteRounded, EditNoteRounded, RepeatRounded, Visibility } from "@mui/icons-material";
import axios from "axios";

function Post(props) {
    const { id, data, user, update } = props;
    const location = useLocation(); // Usa useLocation para obtener la ubicación actual
    
      console.log("Publicacion data:", data);

    const editPost = () => {
        window.localStorage.setItem("pubId", id);
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.replace("/app/edit-post");
    }

    const deletePost = async () => {
        console.log("Eliminando publicación con ID:", id);
        try {
            await axios.put("http://localhost:8080/publicacion/eliminar/" + id);
            alert("Publicación eliminada");
        } catch (error) {
            alert("Error eliminando publicación: " + error);
        }
        update();
    }

    const addOferta = async (event) => {
        event.preventDefault();
        window.localStorage.setItem("pubId", id);
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.replace("/app/add-oferta");
    }

    // Verifica si estamos en la página CommentsPage
    const isCommentsPage = location.pathname.includes("/comentarios/");


    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{data.titulo}</Typography>
                        <Typography variant="h6"><b>por: </b>{data.userFullName}</Typography>
                        <hr />
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <hr />
                        <Typography variant="h6"><b>Categoria: </b>{data.categoria_Nombre}</Typography>
                        <Typography variant="h6"><b>Estado: </b>{data.estado}</Typography>
                        <Typography variant="h6"><b>Ofertas: </b>{data.ofertas}</Typography>
                        <Typography variant="h6"><b>Comentarios: </b>{data.comentarios}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ marginLeft: "15px", width: "150px", height: "150px" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            {(user.tipoUser === 0 && user.idUser !== data.userID && data.estado === "Disponible") &&
                                <Button variant="contained" color="success" onClick={addOferta}
                                    startIcon={<RepeatRounded color="primary" />}>
                                    <Typography variant="button">Ofertar</Typography>
                                </Button>
                            }
                               {(user.tipoUser === 0 && user.idUser !== data.userID && data.estado === "Disponible" && !isCommentsPage) && 
                                <Link to={`/comentarios/${id}`}>
                                    <Button variant="contained" color="success"
                                        startIcon={<CommentRounded color="primary" />}>
                                        <Typography variant="button">Comentar</Typography>
                                    </Button>
                                </Link>
                            }
                            {user.idUser === data.userID && data.estado === "Disponible" && user.tipoUser === 0 &&
                                <Button variant="contained" color="secondary" onClick={editPost}
                                    startIcon={<EditNoteRounded color="primary" />}>
                                    <Typography variant="button">Editar</Typography>
                                </Button>
                            }
                           {((user.tipoUser === 2 && data.comentarios > 0) || (user.idUser === data.userID && data.estado === "Disponible" && !isCommentsPage && data.comentarios > 0)) && 
                                <Link to={`/comentarios/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<CommentRounded color="primary" />}>
                                        <Typography variant="button">Ver comentarios</Typography>
                                    </Button>
                                </Link>
                            }
                            {user.idUser === data.userID && data.estado === "Disponible" && !window.location.href.includes("/inspect-post") && data.ofertas > 0 &&
                                <Link to={`/inspect-post/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<Visibility color="primary" />}>
                                        <Typography variant="button">Ver Ofertas</Typography>
                                    </Button>
                                </Link>
                            }
                            {user.idUser === data.userID && data.estado === "Reservado" && !window.location.href.includes("/exchange") &&
                                <Link to={`/exchange/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<Visibility color="primary" />}>
                                        <Typography variant="button">Ver Intercambio</Typography>
                                    </Button>
                                </Link>
                            }
                            {(user.idUser === data.userID || user.tipoUser !== 0) && (data.estado !== "Eliminado" && data.estado !== "Finalizado") &&
                                <Button variant="contained" color="error" onClick={deletePost}
                                    startIcon={<DeleteRounded color="background2" />}>
                                    <Typography variant="button2">Eliminar</Typography>
                                </Button>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

Post.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default Post;
