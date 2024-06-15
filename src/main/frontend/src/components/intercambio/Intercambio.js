import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeleteRounded, RepeatRounded} from "@mui/icons-material";

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
                        <Typography variant="h6"><strong>por: </strong>{publicacion.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{publicacion.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6"><strong>Categoria: </strong>{publicacion.categoria_Nombre}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={publicacion.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">Oferta: {oferta.titulo}</Typography>
                        <Typography variant="h6"><strong>por: </strong>{oferta.userFullName}</Typography>
                        <hr/>
                        <Typography variant="h2">{oferta.descripcion} asdasdaddas</Typography>
                        <hr/>
                        <Typography variant="h6">en <strong>{oferta.filialNombre}</strong> </Typography> 
                        <Typography variant="h6"> Fecha propuesta: {oferta.fechaIntercambio} </Typography>
                    </Grid>
                    {/*<Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            { (user.tipoUser !== 0) ?
                                    <Button variant="contained" color="success" onClick={onAccept}
                                        startIcon={<RepeatRounded color="primary"/>}>
                                    <Typography variant="button"> Confirmar Intercambio </Typography>
                                    </Button>
                                    : null
                            }
                            <Button variant="contained" color="error" onClick={onCancel}
                                    startIcon={<DeleteRounded color="background2"/>}>
                                <Typography variant="button2"> Cancelar Intercambio </Typography>
                            </Button>
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