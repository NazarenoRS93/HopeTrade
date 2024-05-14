import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Grid } from '@mui/material';
import Completo from './Completo.png';
import './App.css';
import { colors } from "./utils/colors";
import { themeV5 } from "./utils/ThemeProvider";
import UserProvider from "./context/userContext";
import Header from "./components/Header";

const theme = createTheme({ ...themeV5 });

function App() {
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <BrowserRouter basename="/" className="App">
                        <Header/>
                    </BrowserRouter>
                </UserProvider>
            </ThemeProvider>
        </Fragment>
    );
}

export default App;
