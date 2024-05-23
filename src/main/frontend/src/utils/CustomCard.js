import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function Card(props) {
    const { sx, ...other } = props;

    return (
        <Box
            sx={{
                p: 1, m: 1, width: 1/3,
                border: 1, borderRadius: "10%",
                borderColor: "primary.main",
                alignContent: "stretch",
                fontSize: "0.875rem",
                fontWeight: "700",
                ...sx,
            }}
            {...other}
        />
    );
}

Card.propTypes = {
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

export default Card;