import React, {useContext, useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/userContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Item from "../utils/Item";
import FormControl from "@mui/material/FormControl";
import {colors} from "../utils/colors";
import axios from "axios";

function TestPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {userData, setUserData} = useContext(UserContext);


    // Render on start
    useEffect(() => {
        fetchPublicaciones();
    }, []);


    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [publicaciones, setPublicaciones] = useState([]);

    const [titulo, setTitulo] = useState([]);
    const [descripcion, setDesc] = useState([]);
    const [userID, setUserID] = useState([]);
    const [imagen, setImagen] = useState([]);

    const fetchPublicaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8080/publicacion/all');
            setPublicaciones(response.data);
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Publicacion:', {titulo, descripcion, userID, imagen});

        var formdata = new FormData();
        //add three variable to form
        formdata.append("titulo", titulo);
        formdata.append("descripcion", descripcion);
        formdata.append("userID", userID);
        formdata.append("image", imagen);

        axios.post('http://localhost:8080/publicacion/add', formdata, 
        { headers : {'Content-Type': 'multipart/form-data'} }
      )
          .then(function (response) {
            console.log(response.data);

            // Re-render al cambiar
            fetchPublicaciones();
          })
          .catch(function (error) {
            console.log('Error:', error.response.data);
          });
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    width: "100%"
                }}
            >
                <Item sx={{ flexGrow: 1 }} />
                <Item>
                    <Box
                        sx={{
                            backgroundColor: colors.background,
                            flexDirection: "column",
                            alignItems: "center",
                            display: "flex"
                        }}
                    >
                    </Box>
                </Item>
                <Item>
                            <Button variant="contained" color="success"
                                    onClick={fetchPublicaciones}>
                                <Typography variant="button">Fetch Publicaciones</Typography>
                            </Button>
                </Item>
                <Item sx={{ flexGrow: 1 }}/>
            </Box>

            <Item>
                <ul>
                    {publicaciones.map((publicacion) => (
                        <div key={publicacion.id}> {publicacion.id} {publicacion.titulo} {publicacion.descripcion} User: {publicacion.userID} {publicacion.imagenUrl}</div>
                    ))}
                </ul>
            </Item> 
    <form onSubmit={handleSubmit}>
      <label>Titulo publicacion:
        <input 
          type="text" 
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>
      <label>Descripcion publicacion:
        <input 
          type="text" 
          value={descripcion}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>
      <label>UserID:
        <input min="0"
          type="number" id="quantity"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
      </label>
      <label>Imagen:
        <input
        type="file"
        id="imagen"
        name="imagen"
        onChange={(e) => setImagen(e.target.files[0])}
        accept=".jpg, .jpeg, .png" />
        </label>
      <input type="submit" />
    </form>
        </React.Fragment>
    )
}

export default TestPage;