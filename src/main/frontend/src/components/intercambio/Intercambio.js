import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeleteRounded, RepeatRounded} from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';

function Intercambio( props ) {
    const {id, publicacion, oferta, user, data, confirmar, cancelar} = props;

    const nada = () => {
        console.log(data);
        console.log(publicacion);
    };

    const onAccept = async () => {
        confirmar(id);
    }

    const onCancel = async () => {
        cancelar(id);
    }

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">{publicacion.titulo}</Typography>
                        <Typography variant="h6"><b>por: </b>{publicacion.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{publicacion.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6"><b>Categoria: </b>{publicacion.categoria_Nombre}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">Oferta: {oferta.titulo}</Typography>
                        <Typography variant="h6"><b>por: </b>{oferta.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{oferta.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6">en <b>{oferta.filialNombre}</b> </Typography> 
                        { (data.estado == "PROGRAMADO")? <Typography variant="h6">Fecha propuesta: {oferta.fechaIntercambio}</Typography> : null}
                        { (data.estado == "FINALIZADO")? <Typography variant="h6">El intercambio se realizó: {oferta.fechaIntercambio}</Typography> : null}
                        { (data.estado == "CANCELADO")? <Typography variant="h6">El intercambio se canceló </Typography> : null}
                    </Grid>
                    {/*<Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            { (user.tipoUser !== 0) && (data.estado == "PROGRAMADO")?
                                    <Button variant="contained" color="success" onClick={onAccept}
                                        startIcon={<RepeatRounded color="primary"/>}>
                                    <Typography variant="button"> Confirmar Intercambio </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "PROGRAMADO")? 
                                    <Button variant="contained" color="error" onClick={onCancel}
                                        startIcon={<DeleteRounded color="background2"/>}>
                                    <Typography variant="button2"> Cancelar Intercambio </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "CANCELADO" || data.estado == "FINALIZADO") && (user.idUser == publicacion.userID) && (data.puntajeOfertante == -1) && (user.tipoUser == 0) ?
                                    <Button variant="contained" color="success" onClick={nada}
                                        startIcon={<StarIcon color="background"/>}>
                                    <Typography variant="button2"> Puntuar (O) </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "CANCELADO" || data.estado == "FINALIZADO") && (user.idUser == publicacion.userID) && (data.puntajeOfertante != -1)? 
                                    <Typography variant="h6">Puntaje: <b>{data.puntajeOfertante}</b> </Typography>
                                    : null
                            }
                            { (data.estado == "CANCELADO" || data.estado == "FINALIZADO") && (user.idUser == oferta.userId) && (data.puntajePublicante == -1) && (user.tipoUser == 0) ?
                                    <Button variant="contained" color="success" onClick={nada}
                                        startIcon={<StarIcon color="background"/>}>
                                    <Typography variant="button2"> Puntuar (P) </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "CANCELADO" || data.estado == "FINALIZADO") && (user.idUser == oferta.userID) && (data.puntajePublicante != -1) ? 
                                    <Typography variant="h6">Puntaje: <b>{data.puntajePublicante}</b> </Typography>
                                    : null
                            }

                            {
                                (data.estado == "CANCELADO" || data.estado == "FINALIZADO") && (user.tipoUser == 1 || user.tipoUser == 2) ?
                                    <Typography variant="h6">Puntajes: <b> {publicacion.userFullName}: 
                                        (data.puntajePublicante != -1) ? {data.puntajePublicante} / {oferta.userFullName}: {data.puntajeOfertante} </b> </Typography>
                                    : null
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

Intercambio.propTypes = {
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

export default Intercambio;