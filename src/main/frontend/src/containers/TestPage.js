import React, {useContext, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/userContext";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Item from "../utils/Item";
import {colors} from "../utils/colors";
import axios from "axios";
import PostService from "../services/PostService";
import {Link} from "react-router-dom";
import Post from "../utils/Post";

function TestPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {userData, setUserData} = useContext(UserContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [publicaciones, setPublicaciones] = useState([]);

    const [titulo, setTitulo] = useState([]);
    const [descripcion, setDesc] = useState([]);
    const [userID, setUserID] = useState([]);

    const fetchPublicaciones = async () => {
        try {

            const response = await PostService.getPostsFirstCall();
            setPublicaciones(response.data);
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Publicacion:', {titulo, descripcion, userID});

        var formdata = new FormData();
        //add three variable to form
        formdata.append("titulo", titulo);
        formdata.append("descripcion", descripcion);
        formdata.append("userID", userID);

        axios.post('http://localhost:8080/publicacion/add', formdata, { headers : {'Content-Type': 'application/json'}})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error, error.response);
          });
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "column",
                    alignItems: "center",
                    display: "flex",
                    width: "100%"
                }}
            >
                <Item>
                    <Button variant="contained" color="success" startIcon={<SearchIcon color="primary"/>}
                            onClick={fetchPublicaciones}>
                        <Typography variant="button">Buscar publicaciones</Typography>
                    </Button>
                </Item>
                <Item>
                    <ul>
                        {publicaciones.map((publicacion) => (
                            <div key={publicacion.id}>
                                <Item sx={{ width: "auto"}}>
                                    <Link to="/ver-post">
                                        <Post data={publicacion}/>
                                    </Link>
                                </Item>
                            </div>
                        ))}
                    </ul>
                </Item>
            </Box>
{/*
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
        <input 
          type="number" 
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
*/}
        </React.Fragment>
    )
}

export default TestPage;