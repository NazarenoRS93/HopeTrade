import React, {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import PostItem from "../components/post/PostItem";
import {defaultFormAddPost} from "../utils/utilConstants";

function PostListPage() {
    // Render on start
    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let usuario = JSON.parse(cookie);
            setUser(usuario);
            fetchPublicaciones(usuario.idUser);
        }
    }, []);

    const reader = new FileReader();
    const [user, setUser] = useState({});
    const [publicaciones, setPublicaciones] = useState([]);
    const [form, setForm] = useState(defaultFormAddPost)

    const fetchPublicaciones = async (idUser) => {
        try {
            let path = "/all/activas";
            if(window.location.href.includes("my-posts")) {
                path = "/user/" + idUser + "/activas";
            }
            let url = "http://localhost:8080/publicacion"+path;
            const response = await axios.get(url);
            const data = response.data.map(publicacion => {
                return {
                    ...publicacion,
                    imagenUrl: `data:image/jpeg;base64,${publicacion.imagen}`
                };
            });
            setPublicaciones(data);
        } catch (error) {
            console.log("Error obteniendo publicaciones: " + error);
            // alert("Error obteniendo publicaciones: "+error);
        }
    }

    const onUpdate = () => {
        fetchPublicaciones(user.idUser);
    }

    // Funcion de prueba de pasaje a traves de props
    const testCallback = () => console.log("Callback called");
    
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
        formdata.append("titulo", form.titulo);
        formdata.append("descripcion", form.descripcion);
        formdata.append("userID", user.id);
        formdata.append("imagen", await fileToBase64(form.imagen));

        await axios.post('http://localhost:8080/publicacion/add', formdata, {
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
            <PostGrid>
            { publicaciones.map((publicacion) => (
                <PostItem id={publicacion.id} data={publicacion} user={user} update={onUpdate}/>
            ))}
            </PostGrid>
        </React.Fragment>
    )
}

export default PostListPage;