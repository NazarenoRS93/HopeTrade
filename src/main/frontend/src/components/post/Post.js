import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {DeleteRounded, EditNoteRounded, RepeatRounded, Visibility} from "@mui/icons-material";

import axios from "axios";

function Post( props ) {
    const {id, data, user, update} = props;

    const editPost = () => {
        window.localStorage.setItem("pubId", id);
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.replace(href+"/edit-post");
    }
    const deletePost = async () => {
        console.log("Eliminando publicación con ID:", id);
        try {
            await axios.put("http://localhost:8080/publicacion/eliminar/"+id);
            alert("Publicación eliminada");
        } catch (error) {
            alert("Error eliminando publicación: "+error);
        }
        update();
    }
    const addOferta = async (event) => {
        event.preventDefault();
        window.localStorage.setItem("pubId", id);
        let href = window.location.href;
        href = href.substring(0, href.lastIndexOf('/'));
        window.location.replace(href+"/add-oferta");
    }

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">{data.titulo}</Typography>
                        <Typography variant="h6"><strong>por: </strong>{data.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6"><strong>Categoria: </strong>{data.categoria_Nombre}</Typography>
                        <Typography variant="h6"><strong>Estado: </strong>{data.estado}</Typography>
                        <Typography variant="h6"><strong>Ofertas: </strong>{data.ofertas}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            { (user.tipoUser === 0 && user.idUser !== data.userID && data.estado === "Disponible") ?
                                <Button variant="contained" color="success" onClick={addOferta}
                                        startIcon={<RepeatRounded color="primary"/>}>
                                    <Typography variant="button">Ofertar</Typography>
                                </Button>
                                : null
                            }
                            { user.idUser === data.userID && data.estado === "Disponible" ?
                                <Button variant="contained" color="secondary" onClick={editPost}
                                        startIcon={<EditNoteRounded color="primary"/>}>
                                    <Typography variant="button">Editar</Typography>
                                </Button>
                                : null
                            }
                            { user.idUser === data.userID && data.estado === "Disponible" && !window.location.href.includes("/inspect-post") && data.ofertas > 0 ?
                                <Link to={"/inspect-post/"+id}> 
                                <Button variant="contained" color="secondary" onClick={editPost}
                                        startIcon={<Visibility color="primary"/>}>
                                    <Typography variant="button">Ver Ofertas</Typography>
                                </Button> 
                                </Link>
                                : null
                            }
                              { user.idUser === data.userID && data.estado === "Reservado" && !window.location.href.includes("/exchange") ?
                                <Link to={"/exchange/"+id}> 
                                <Button variant="contained" color="secondary" onClick={editPost}
                                        startIcon={<Visibility color="primary"/>}>
                                    <Typography variant="button">Ver Intercambio</Typography>
                                </Button> 
                                </Link>
                                : null
                            }                          
                            { (user.idUser === data.userID || user.tipoUser !== 0) ?
                                <Button variant="contained" color="error" onClick={deletePost}
                                        startIcon={<DeleteRounded color="background2"/>}>
                                    <Typography variant="button2">Eliminar</Typography>
                                </Button>
                                : null
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