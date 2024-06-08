import {Grid} from "@mui/material";
import React from "react";
import "../../App.css";
import Post from "./Post";

function PostItem(props) {
    const { id, data, change, update, open } = props;

    return (
        <Grid item key={id} sm={12} md={6}>
            <Post id={id} data={data} change={change} update={update} open={open}/>
        </Grid>
    )
}

export default PostItem;