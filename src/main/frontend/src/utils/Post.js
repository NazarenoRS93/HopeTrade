import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

function Post(props) {
    const { key, data } = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle2">{data.titulo}</Typography>
                <hr/>
                <Typography variant="h2">{data.descripcion}</Typography>
                <hr/>
                <Typography variant="h6">Estado: {data.activo ? "Disponible" : "Finalizado"}</Typography>
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