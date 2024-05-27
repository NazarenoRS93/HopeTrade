import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {CardContent, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

function Post(props) {
    const { key, data } = props;

    return (
        <Card className="PostItemElement">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={8}>
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">{data.titulo}</Typography>
                        <Divider variant="middle" />
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <Divider variant="middle" />
                        <Typography variant="h6">Estado: {data.activo ? "Disponible" : "Finalizado"}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Divider variant="middle" orientation="vertical" />
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar variant="middle" orientation="vertical" />
                    </Grid>
                </Grid>
            </CardContent>


        </Card>
    );
}

Post.propTypes = {
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

export default Post;