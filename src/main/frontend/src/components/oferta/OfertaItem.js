import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import Oferta from "./Oferta";

function OfertaItem(props) {
    const { id, data, publicacion, user, update, rechazar, aceptar } = props;

    return (
        <Grid item key={id} sm={12} md={6}>
            <Oferta id={id} data={data} publicacion={publicacion} user={user} update={update} rechazar={rechazar} aceptar={aceptar}/>
        </Grid>
    )
}

export default OfertaItem;