import React, {useEffect, useState} from "react";
import '../App.css';
import {colors} from "../utils/colors";
import {Link} from "react-router-dom";
import Post from "../utils/Post";
import PostService from "../services/PostService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Item from "../utils/Item";

function PostListPage() {
    const [tipoUser, setTipoUser] = useState(0);
    const [mostrar, setMostrar] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            setTipoUser(user.tipoUser);
        }
        PostService.getPostsFirstCall()
            .then((response) => {
                setList(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                alert("Ocurrió un error al obtener las publicaciones.");
                setMostrar(false);
            })
    })

    return (
        <React.Fragment>
            <Box sx={{
                backgroundColor: colors.background,
                display: "flex",
                flexWrap: "wrap"
            }}
            >
                { list.map((p) => {
                    <div key={p.id}>
                        <Item sx={{ width: "auto"}}>
                            <Link to="/ver-post">
                                <Post data={p}/>
                            </Link>
                        </Item>
                    </div>
                })
                }
                { list.length===0 ?
                    <Typography variant="h2">No se encontraron publicaciones.</Typography>
                    : null
                }
            </Box>
        </React.Fragment>
    )
}

export default PostListPage;