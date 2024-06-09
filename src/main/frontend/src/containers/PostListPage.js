import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import PostItem from "../components/post/PostItem";
import {defaultFormAddPost} from "../utils/utilConstants";
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

function PostListPage() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPublicaciones(usuario.idUser, 0);
        }
        fetchCategorias();
    }, []);

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [publicaciones, setPublicaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState([]);
    const [states, setStates] = useState([]);
    const [form, setForm] = useState(defaultFormAddPost)

    const fetchPublicaciones = async (idUser, cat) => {
        try {
            let path = "/all/activas";
            if(window.location.href.includes("my-posts")) {
                path = "/user/" + idUser + "/activas";
            }
            let url = "http://localhost:8080/publicacion"+path;
            const response = await axios.get(url);
            let data = response.data.map(publicacion => {
                return {
                    ...publicacion,
                    imagenUrl: `data:image/jpeg;base64,${publicacion.imagen}`
                };

            });
            if(cat != 0) {
                console.log("CATEGORIA:"+ cat);
                data = data.filter(function (publicacion) {
                    return publicacion.categoria_ID == cat;
                });
            }
            setPublicaciones(data);
        } catch (error) {
            console.log("Error obteniendo publicaciones: " + error);
            // alert("Error obteniendo publicaciones: "+error);
        }
    }

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria/all');
            setCategorias(response.data);
        } catch (error) {
            alert("Error obteniendo categorías: "+error);
        }
    }
    const onUpdate = () => {
        fetchPublicaciones(user.idUser, selectedCategoria);
    }

    const handleChange = (event) => {
        setSelectedCategoria(event.target.value);
        fetchPublicaciones(user.idUser, event.target.value);
    }

    return (
        
        <React.Fragment>
			<Select
				value={selectedCategoria}
				onChange={handleChange}
				defaultValue="0"
				sx={{ minWidth: 200, marginBottom: 2 }}
			>   
				<MenuItem value="0">
					Todos
				</MenuItem>
				{categorias.map((categoria) => (
					<MenuItem key={categoria.id} value={categoria.id}>
						{categoria.nombre}
					</MenuItem>
				))}
			</Select>
            <PostGrid>
            { publicaciones.map((publicacion) => (
                <PostItem id={publicacion.id} data={publicacion} user={user} update={onUpdate}/>
            ))}
            </PostGrid>
        </React.Fragment>
    )
}

export default PostListPage;