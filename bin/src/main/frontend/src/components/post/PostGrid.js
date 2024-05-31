import {Grid} from "@mui/material";

function PostGrid(props) {
    const { children } = props;

    return (
        <Grid container spacing={2}>
            { children }
        </Grid>
    );
}

export default PostGrid;
