import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {themeV5} from "./utils/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Stack} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

const theme = createTheme({ ...themeV5 });

function App() {
    return (
        <React.Fragment className="App">
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <Stack spacing={2} alignItems="center" justifyContent="center" direction="column" sx={{width:"99%"}}>
                        <Header/>
                        <Outlet/>
                        <Footer/>
                    </Stack>
                </LocalizationProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
