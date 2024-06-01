import {Box, Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import CustomCard from "../../utils/CustomCard";
import {Link} from "react-router-dom";
import Post from "./Post";

function PostItem(props) {
    const { link, key, data } = props;

    return (
        <Grid item key={key} sm={12} md={6}>
            <Link to={link.concat(key)}>
                <Post data={data} />
            </Link>
        </Grid>
    )
}

export default PostItem;