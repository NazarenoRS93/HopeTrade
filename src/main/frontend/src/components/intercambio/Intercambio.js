import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';

import { React, useState, useEffect } from "react";
import {DeleteRounded, RepeatRounded} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Intercambio( props ) {
    const {id, publicacion, oferta, user, data, confirmar, cancelar} = props;

    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);


    const nada = () => {
        console.log(data);
        console.log(publicacion);
    };

    const onAccept = async () => {
        confirmar(id);
    }

    const onCancel = async () => {
        cancelar(id, reason);
    }

    const handleOpen = () => {
        setOpen(true);
    };
      const handleClose = () => {
        setOpen(false);
        setReason("");
    };

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
                            { (data.estado == "PROGRAMADO" && user.tipoUser !== 0)? 
                                    <Button variant="contained" color="error" onClick={handleOpen}
                                        startIcon={<DeleteRounded color="background2"/>}>
                                    <Typography variant="button2"> Cancelar Intercambio </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "FINALIZADO") && (user.idUser == publicacion.userID) && (data.puntajeOfertante == -1) && (user.tipoUser == 0) ?
                                    <Button variant="contained" color="success" onClick={nada}
                                        startIcon={<StarIcon color="background"/>}>
                                    <Typography variant="button2"> Puntuar (O) </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "FINALIZADO") && (user.idUser == publicacion.userID) && (data.puntajeOfertante != -1)? 
                                    <Typography variant="h6">Puntaje: <b>{data.puntajeOfertante}</b> </Typography>
                                    : null
                            }
                            { (data.estado == "FINALIZADO") && (user.idUser == oferta.userId) && (data.puntajePublicante == -1) && (user.tipoUser == 0) ?
                                    <Button variant="contained" color="success" onClick={nada}
                                        startIcon={<StarIcon color="background"/>}>
                                    <Typography variant="button2"> Puntuar (P) </Typography>
                                    </Button>
                                    : null
                            }
                            { (data.estado == "FINALIZADO") && (user.idUser == oferta.userID) && (data.puntajePublicante != -1) ? 
                                    <Typography variant="h6">Puntaje: <b>{data.puntajePublicante}</b> </Typography>
                                    : null
                            }
                            {
                                (data.estado == "CANCELADO") && (user.tipoUser == 1 || user.tipoUser == 2) && (data.puntajePublicante == -1) ?
                                <Button variant="contained" color="success" onClick={nada}
                                    startIcon={<StarIcon color="background"/>}>
                                <Typography variant="button2"> Puntuar Usuario Publicante </Typography>
                                </Button>
                                : null

                            }
                            {
                                (data.estado == "CANCELADO") && (user.tipoUser == 1 || user.tipoUser == 2) && (data.puntajeOfertante == -1)?
                                <Button variant="contained" color="success" onClick={nada}
                                    startIcon={<StarIcon color="background"/>}>
                                <Typography variant="button2"> Puntuar Usuario Ofertante </Typography>
                                </Button>
                                : null

                            }

                            {
                                (data.estado == "FINALIZADO" || data.estado == "CANCELADO") && (user.tipoUser == 1 || user.tipoUser == 2) && (data.puntajePublicante != -1)?
                                    <Typography variant="h6">Puntaje <b> {publicacion.userFullName}:  {data.puntajePublicante}</b> </Typography>
                                    : null
                            }

                            {
                                (data.estado == "FINALIZADO" || data.estado == "CANCELADO") && (user.tipoUser == 1 || user.tipoUser == 2) && (data.puntajePublicante != -1) ?
                                    <Typography variant="h6">Puntaje <b> {oferta.userFullName}:  {data.puntajePublicante}</b> </Typography>
                                    : null
                            }

                        </Stack>
                    </Grid>
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
                            Motivo de cancelacion
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
                                Volver
                            </Button>
                            <Button
                                onClick={onCancel}
                                color="secondary"
                                variant="contained"
                                sx={{ ml: 2, backgroundColor: 'red' }}
                                disabled={reason.trim() === ""}
                            >
                                Cancelar Intercambio
                            </Button>
                            </Box>
                        </Box>
                        </Modal>
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