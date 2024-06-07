import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import {DeleteRounded, EditNote, EditNoteRounded, RepeatRounded, Visibility} from "@mui/icons-material";

import axios from "axios";

function Post( props ) {
    const {id, data, user, update} = props;

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
        update();
    }
    const addOferta = async (event) => {
        event.preventDefault();

        let userID = user.idUser;
        var formdata = new FormData();

        // Valores genericos de prueba para no usar form
        var texto = "test";
        var fechaIntercambio = "2024-010-10 09:00:00.000000";

        formdata.append("texto", texto);
        formdata.append("publicacionId", id);
        formdata.append("userId", userID);
        formdata.append("filialId", 1);
        // No pude hacer andar el formato. Esta hardcodeado en el controller, por ahora
        // formdata.append("fechaIntercambio", fechaIntercambio);

        // Imagen comentada hasta que se implemente el form
        // formdata.append("imagen", await fileToBase64(imagen));

        await axios.post('http://localhost:8080/oferta/guardar', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
        )
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                alert("Error: "+error.response.data);
            });
        update();
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
                            { (user.tipoUser === 0 && user.idUser !== data.userID) ?
                                <Button variant="contained" color="success" onClick={addOferta}
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