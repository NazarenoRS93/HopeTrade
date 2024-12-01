import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import Intercambio from "./Intercambio";

function IntercambioItem(props) {
    const { id, data, publicacion, oferta, user, cancelar, confirmar } = props;

    return (
        <Grid item key={id} sm={12} md={6}>
            <Intercambio id={id} data={data} publicacion={publicacion} oferta={oferta} user={user} cancelar={cancelar} confirmar={confirmar}/>
        </Grid>
    )
}

export default IntercambioItem;