import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {Avatar, CardContent, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

function Post(props) {
    const { data } = props;

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle2">{data.titulo}</Typography>
                        <hr/>
                        <Typography variant="h2">{data.descripcion}</Typography>
                        <hr/>
                        <Typography variant="h6">Categoria: {data.categoria}</Typography>
                        <hr/>
                        <Typography variant="h6">Estado: {data.estado}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src={data.imagenUrl} variant="rounded" sx={{ width:"150px",height:"150px"}} />
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