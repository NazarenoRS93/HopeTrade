import React from "react";
import '../App.css';
import Box from "@mui/material/Box";
import {colors} from "../utils/colors";
import Item from "../utils/Item";
import Typography from "@mui/material/Typography";

function Footer() {

    return (
        <div className="header-cus">
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    width: "100%"
                }}
            >
                <Item sx={{ flexGrow: 1 }}/>
                <Item>
                    <Typography variant="body1">Para uso interno, haga click aqu&iacute;</Typography>
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
            </Box>
        </div>
)
}

export default Footer;