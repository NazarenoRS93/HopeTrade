import {Grid} from "@mui/material";

function OfertaGrid(props) {
    const { children } = props;

    return (
        <Grid container spacing={2}>
            { children }
        </Grid>
    );
}

export default OfertaGrid;
