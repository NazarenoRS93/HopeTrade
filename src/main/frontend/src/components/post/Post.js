import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import {DeleteRounded, EditNote, EditNoteRounded, RepeatRounded, Visibility} from "@mui/icons-material";

import axios from "axios";

function Post(props) {
    const {id, data, user} = props;

    const editPost = () => {

    }
    const deletePost = async () => {
        console.log("Eliminando publicación con ID:", id);
        try {
            await axios.put("http://localhost:8080/publicacion/eliminar/"+id);
            alert("Publicación eliminada");
        } catch (error) {
            alert("Error eliminando publicación: "+error);
        }
    }
    const addIntercambio = () => {}

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">{data.titulo}</Typography>
                        <hr/>
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6"><strong>Categoria: </strong>{data.categoria_Nombre}</Typography>
                        <Typography variant="h6"><strong>Estado: </strong>{data.estado}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            { (user.tipoUser === 0 && user.idUser !== data.userID) ?
                                <Button variant="contained" color="success" onClick={addIntercambio}
                                        startIcon={<RepeatRounded color="primary"/>}>
                                    <Typography variant="button">Ofertar</Typography>
                                </Button>
                                : null
                            }
                            { user.idUser === data.userID ?
                                <Button variant="contained" color="secondary" onClick={editPost}
                                        startIcon={<EditNoteRounded color="primary"/>}>
                                    <Typography variant="button">Editar</Typography>
                                </Button>
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