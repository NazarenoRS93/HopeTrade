import {Grid} from "@mui/material";

function HomeGrid(props) {
    const { children } = props;

    return (
        <Grid container alignItems="center" justifyContent="flex-start" >
            { children }
        </Grid>
    );
}

export default HomeGrid;
