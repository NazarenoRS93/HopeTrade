import {Grid} from "@mui/material";

function HomeGrid(props) {
    const { children } = props;

    return (
        <Grid container spacing={2} className="FullWidthPage">
            { children }
        </Grid>
    );
}

export default HomeGrid;
