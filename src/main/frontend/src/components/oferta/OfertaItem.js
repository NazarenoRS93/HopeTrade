import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import {Link} from "react-router-dom";
import Oferta from "./Oferta";

function OfertaItem(props) {
    const { id, data, user, update, rechazar } = props;

    return (
        <Grid item key={id} sm={12} md={6}>
            <Oferta id={id} data={data} user={user} update={update} rechazar={rechazar}/>
        </Grid>
    )
}

export default OfertaItem;