import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Grid} from "@mui/material";

function Footer() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
        }
    }, []);
    const [user, setUser] = useState({});

    return (
        <Grid container className="FullWidthFooter">
            <Grid item xs={12}>
                    { !user.isLogged ?
                        <Typography variant="body1">Para uso interno, haga click <Link to="/logAdmin">aqu&iacute;</Link></Typography>
                        : null
                    }
            </Grid>
        </Grid>
)
}

export default Footer;