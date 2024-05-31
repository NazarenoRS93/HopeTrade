import React from "react";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

function CustomCard(props) {
    const { data, icon } = props;

    return (
        <Card className="ItemGrid">
            <CardContent>
                <Typography variant="subtitle2">
                    {icon}&nbsp;{data.title}
                </Typography>
                <hr/>
                <Typography variant="h2">
                    {data.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

CustomCard.propTypes = {
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

export default CustomCard;