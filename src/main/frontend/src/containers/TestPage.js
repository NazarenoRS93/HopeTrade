import React, {useContext, useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/userContext";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Item from "../utils/Item";
import {colors} from "../utils/colors";
import axios from "axios";
import {Link} from "react-router-dom";
import Post from "../components/post/Post";

function TestPage() {
    // Render on start
    useEffect(() => {
        fetchPublicaciones();
    }, []);

    const reader = new FileReader();
    const [publicaciones, setPublicaciones] = useState([]);
    const [titulo, setTitulo] = useState([]);
    const [descripcion, setDesc] = useState([]);
    const [userID, setUserID] = useState([]);
    const [imagen, setImagen] = useState([]);

    const fetchPublicaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8080/publicacion/all/activas');
            const data = response.data.map(publicacion => {
                return {
                    ...publicacion,
                    imagenUrl: `data:image/jpeg;base64,${publicacion.imagen}`
                };
            });
            setPublicaciones(data);
        } catch (error) {
            alert("Error obteniendo publicaciones: "+error);
        }
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          reader.readAsDataURL(file);
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        var formdata = new FormData();
        formdata.append("titulo", titulo);
        formdata.append("descripcion", descripcion);
        formdata.append("userID", userID);
        formdata.append("imagen", await fileToBase64(imagen));

        console.log('PUBLICACION: ', {titulo, descripcion, userID, imagen});

        axios.post('http://localhost:8080/publicacion/add', formdata, {
            headers: {
                'Content-Type': 'application/json'
            }}
      )
          .then(function (response) {
            fetchPublicaciones();
          })
          .catch(function (error) {
            alert("Error: "+error.response.data);
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
                    <ul>
                        {publicaciones.map((publicacion) => (
                            <div key={publicacion.id}>
                                <Item sx={{ width: "auto"}}>
                                    <Link to="/ver-post">
                                        <Post data={publicacion} />
                                    </Link>
                                </Item>
                            </div>
                        ))}
                    </ul>
                </Item>
            </Box>


    <div> AGREGAR PARA TESTEO </div>
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
      <input type="submit" value="Submit"/>
    </form>
        </React.Fragment>
    )
}

export default TestPage;