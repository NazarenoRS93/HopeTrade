import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import CustomCard from "../../utils/CustomCard";
import {Link} from "react-router-dom";

function HomeItem(props) {
    const { link, data, icon } = props;

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Link to={link}>
                <CustomCard data={data} icon={icon}/>
            </Link>
        </Grid>
    )
}

export default HomeItem;