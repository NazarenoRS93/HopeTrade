import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { React, useState, useEffect } from "react";
import {DeleteRounded, RepeatRounded} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Oferta( props ) {
    const {id, publicacion, data, user, update, rechazar, aceptar} = props;

    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);

    const nada = () => {
        console.log(data);
        console.log(publicacion);
    };

    const onAccept = async () => {
        aceptar(id);
    }

    const onRechazar = async () => {
        rechazar(id, reason);
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
                        <Typography variant="subtitle2">Oferta: {data.titulo}</Typography>
                        <Typography variant="h6"><b>por: </b>{data.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6">en <b>{data.filialNombre}</b> </Typography> 
                        <Typography variant="h6"> Fecha propuesta: {data.fechaIntercambio} </Typography>
                    </Grid>
                    {/*<Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            { (publicacion.estado === "Disponible" && user.idUser === publicacion.userID && user.tipoUser === 0) ?
                                    <Button variant="contained" color="success" onClick={onAccept}
                                        startIcon={<RepeatRounded color="primary"/>}>
                                    <Typography variant="button">Aceptar</Typography>
                                    </Button>
                                    : null
                            }
                            { (publicacion.estado === "Disponible") ?
                            <Button variant="contained" color="error" onClick={handleOpen}
                                    startIcon={<DeleteRounded color="background2"/>}>
                                <Typography variant="button2">Rechazar</Typography>
                            </Button>
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
           Motivo del rechazo
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
             onClick={onRechazar}
             color="secondary"
             variant="contained"
             sx={{ ml: 2, backgroundColor: 'red' }}
             disabled={reason.trim() === ""}
           >
             Rechazar
           </Button>
         </Box>
       </Box>
     </Modal>
                </Grid>
            </CardContent>
        </Card>
    );
}

Oferta.propTypes = {
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

export default Oferta;