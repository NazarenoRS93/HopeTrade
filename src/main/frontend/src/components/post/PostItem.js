import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import {Link} from "react-router-dom";
import Post from "./Post";

function PostItem(props) {
    const { id, data, user } = props;

    return (
        <Grid item key={id} sm={12} md={6}>
            <Post id={id} data={data} user={user} />
        </Grid>
    )
}

export default PostItem;