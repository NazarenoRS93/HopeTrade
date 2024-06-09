import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import {DeleteRounded, EditNote, EditNoteRounded, RepeatRounded, Visibility} from "@mui/icons-material";

import axios from "axios";

function Oferta( props ) {
    const {id, data, user, update, rechazar} = props;

    const nada = () => {

    };

    const onRechazar = async () => {
        rechazar(id);
    }

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">Oferta {data.id}: {data.titulo}</Typography>
                        <Typography variant="h6"><strong>por: </strong>{data.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{data.descripcion} asdasdaddas</Typography>
                        <hr/>
                        <Typography variant="h6">en <strong>{data.filialNombre}</strong> </Typography> 
                        <Typography variant="h6"> Fecha propuesta: {data.fechaIntercambio} </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="success" onClick={nada}
                                startIcon={<RepeatRounded color="primary"/>}>
                                <Typography variant="button">Aceptar</Typography>
                            </Button>
                            <Button variant="contained" color="error" onClick={onRechazar}
                                    startIcon={<DeleteRounded color="background2"/>}>
                                <Typography variant="button2">Rechazar</Typography>
                            </Button>
                        </Stack>
                    </Grid>
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