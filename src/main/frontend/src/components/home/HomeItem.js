import { Box, FormControl, Grid, Typography } from "@mui/material";
import React from "react";
import { colors } from "styles/colors";
import "../../App.css";

function HomeItem(props) {
    const { data, list, setList } = props;

    return (
        <Grid item xs={6} sm={4} md={2} lg={2}>
            <Box className={styles.elemContainer}>
                <Typography style={{ fontSize: 12, color: colors.darkBlue, fontWeight: "bold", textAlign: "center" }}>{labelTitle + ":"}</Typography>
                <FormControl fullWidth>
                    {children}
                </FormControl>
            </Box>
        </Grid>
    );
}

export default FilterComponent;