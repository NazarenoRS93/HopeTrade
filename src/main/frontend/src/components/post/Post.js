import { React, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { Avatar, CardContent, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { CommentRounded, DeleteRounded, EditNoteRounded, RepeatRounded, Visibility } from "@mui/icons-material";
import axios from "axios";

import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Post(props) {
    const { id, data, user, update } = props;
    const location = useLocation(); // Usa useLocation para obtener la ubicación actual

    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);

    
    const handleOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
        setReason("");
    };

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
        window.location.href = "/app/home";
    }

    const adminDeletePost = async () => {
        console.log("Eliminando publicación con ID:", id);
        const url = `http://localhost:8080/publicacion/eliminar/${id}`;
        const params = { motivo: reason };

        await axios.put(url, null, { params: params })
        .then(function (response) {
            alert("Publicación eliminada");
        })
        .catch(function (error) {
            console.log("Error eliminando publicación: " + (error.response ? error.response.data : error.message));
        });
        window.location.href = "/app/home";
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
                            {(user.tipoUser === 0 && user.idUser !== data.userID && data.estado === "Disponible" && isCommentsPage ) &&
                                <Button variant="contained" color="success" onClick={addOferta}
                                    startIcon={<RepeatRounded color="primary" />}>
                                    <Typography variant="button">Ofertar</Typography>
                                </Button>
                            }
                               {(user.tipoUser === 0 && user.idUser !== data.userID && data.estado === "Disponible" && !isCommentsPage) && 
                                <Link to={`/comentarios/${id}`}>
                                    <Button variant="contained" color="success"
                                        startIcon={<CommentRounded color="primary" />}>
                                        <Typography variant="button">Ver detalle</Typography>
                                    </Button>
                                </Link>
                            }
                            {user.idUser === data.userID && data.estado === "Disponible" && user.tipoUser === 0 && isCommentsPage &&
                                <Button variant="contained" color="secondary" onClick={editPost}
                                    startIcon={<EditNoteRounded color="primary" />}>
                                    <Typography variant="button">Editar</Typography>
                                </Button>
                            }
                           {((user.tipoUser >0 && !isCommentsPage) || (user.idUser === data.userID && data.estado === "Disponible" && !isCommentsPage  &&  user.tipoUser === 0)) && 
                                <Link to={`/comentarios/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<CommentRounded color="primary" />}>
                                        <Typography variant="button">Ver detalle</Typography>
                                    </Button>
                                </Link>
                            }
                            {user.idUser === data.userID && data.estado === "Disponible" && isCommentsPage  && !window.location.href.includes("/inspect-post") && data.ofertas > 0 &&
                                <Link to={`/inspect-post/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<Visibility color="primary" />}>
                                        <Typography variant="button">Ver Ofertas</Typography>
                                    </Button>
                                </Link>
                            }
                            { (false) &&
                                <Link to={`/exchange/${id}`}>
                                    <Button variant="contained" color="secondary"
                                        startIcon={<Visibility color="primary" />}>
                                        <Typography variant="button">Ver Intercambio</Typography>
                                    </Button>
                                </Link>
                            }
                            {(user.idUser === data.userID && user.tipoUser === 0) && (data.estado === "Disponible") && (isCommentsPage) &&
                                <Button variant="contained" color="error" onClick={deletePost}
                                    startIcon={<DeleteRounded color="background2" />}>
                                    <Typography variant="button2">Eliminar</Typography>
                                </Button>
                            }
                            {(  user.tipoUser === 2) && (data.estado === "Disponible") && (isCommentsPage) &&
                                <Button variant="contained" color="error" onClick={handleOpen}
                                    startIcon={<DeleteRounded color="background2" />}>
                                    <Typography variant="button2">Eliminar</Typography>
                                </Button>
                            }
                        </Stack>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                backgroundColor: 'background.paper',
                                boxShadow: 24,
                                padding: 4,
                            }}>
                                <Typography variant="h6" gutterBottom>
                                Motivo de la eliminación
                                </Typography>
                                <TextField
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                type="text"
                                variant="outlined"
                                id="reason"
                                label="Motivo"
                                fullWidth
                                />
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={adminDeletePost}
                                    color="secondary"
                                    variant="contained"
                                    sx={{ ml: 2, backgroundColor: 'red' }}
                                    disabled={reason.trim() === ""}
                                >
                                    Eliminar
                                </Button>
                                </Box>
                            </Box>
                            </Modal>
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
