import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {themeV5} from "./utils/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";

const theme = createTheme({ ...themeV5 });

function App() {

    return (
        <React.Fragment className="App">
                <ThemeProvider theme={theme}>
                    <Stack spacing={1} direction="column">
                        <Header/>
                        <Outlet/>
                        <Footer/>
                    </Stack>
                </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
