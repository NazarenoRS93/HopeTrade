import React, {useContext, useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import PostGrid from "../components/post/PostGrid";
import PostItem from "../components/post/PostItem";
import {defaultFormAddPost} from "../utils/utilConstants";
import Typography from "@mui/material/Typography";
import SessionContext from "../context/context";
import AddOfferModal from "../components/offer/AddOfferModal";

function PostListPage() {
    const {user} = useContext(SessionContext);
    // Render on start
    useEffect(() => {
        fetchPublicaciones(user.idUser);
    }, []);

    const reader = new FileReader();
    const [publicaciones, setPublicaciones] = useState([]);
    const [form, setForm] = useState(defaultFormAddPost);
    const [open,setOpen] = useState(false);
    const change = () => {
        setOpen(!open);
    }
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
                fetchPublicaciones(user.idUser);
            })
            .catch(function (error) {
                alert("Error: "+error.response.data);
            });
    }

    return (
        <React.Fragment>
            <AddOfferModal open={open} change={change}/>
            <PostGrid>
            { publicaciones.map((publicacion) => (
                <PostItem id={publicacion.id} data={publicacion} change={change}
                          update={fetchPublicaciones} open={open}/>
            ))}
            </PostGrid>
            {
                publicaciones.length === 0 ?
                    <Typography variant="h1">No hay publicaciones</Typography>
                    : null
            }
        </React.Fragment>
    )
}

export default PostListPage;