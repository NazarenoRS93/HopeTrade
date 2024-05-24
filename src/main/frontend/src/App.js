import React, {useState} from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import {themeV5} from "./utils/ThemeProvider";
import UserProvider from "./context/userContext";
import Header from "./components/Header";
import {colors} from "./utils/colors";
import Box from "@mui/material/Box";
import Item from "./utils/Item";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import {defaultDialogData} from "./utils/utilConstants";
import CustomDialog from "./components/CustomDialog";

const theme = createTheme({ ...themeV5 });

function App() {
    const [dialogData,setDialogData] = useState(defaultDialogData);
    return (
        <React.Fragment className="App">
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <Box
                        sx={{
                            backgroundColor: colors.background,
                            flexDirection: "column",
                            alignItems: "center",
                            display: "flex",
                            width: "100%",
                            height: "90%"
                        }}
                    >
                        <Item sx={{flexGrow: 2}}>
                            <Header/>
                            <hr/>
                        </Item>
                        <Item sx={{flexGrow: 1}}>
                            <Outlet />
                        </Item>
                        <Item>
                            <hr/>
                            <Footer/>
                        </Item>
                    </Box>
                    <CustomDialog data={dialogData} setData={setDialogData}/>
                </UserProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
