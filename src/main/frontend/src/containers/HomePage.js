import React, {useEffect, useState} from "react";
import '../App.css';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import HomeGrid from "../components/home/HomeGrid";
import HomeItem from "../components/home/HomeItem";
import {addPostInfo, editProfileInfo, listUsersInfo, myPostsInfo, viewPostsInfo, listExchangesInfo} from "../utils/utilData";

function HomePage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const cookie = window.localStorage.getItem("user");
        if(cookie) {
            let user = JSON.parse(cookie);
            console.log("Tipo User:", user.tipoUser);
            setUser(user);
        };
    }, [])

    return (
        <React.Fragment>
            <HomeGrid>
                <HomeItem link="/posts" data={viewPostsInfo} icon={<FindInPageRoundedIcon color="primary"/>}/>
                {user?.tipoUser===0 ?
                    <HomeItem link="/my-posts" data={myPostsInfo} icon={<DescriptionRoundedIcon color="primary"/>}/>
                    :
                    <HomeItem link="/users" data={listUsersInfo} icon={<PeopleRoundedIcon color="primary"/>}/>
                }
                {user?.tipoUser===0 ?
                    <HomeItem link="/add-post" data={addPostInfo} icon={<NoteAddRoundedIcon color="primary"/>}/>
                    : null
                }
                {user?.tipoUser===0 ?
                    <HomeItem link="/profile" data={editProfileInfo} icon={<PersonRoundedIcon color="primary"/>}/>
                    : null
                }
                {user?.tipoUser===1 ?
                    <HomeItem link="/exchanges" data={listExchangesInfo} icon={<PersonRoundedIcon color="primary"/>}/>
                    : null
                }                
                {user?.tipoUser===1 ?
                    <HomeItem link="/administrador-profile" data={editProfileInfo} icon={<PersonRoundedIcon color="primary"/>}/>
                    : null
                }
            </HomeGrid>
        </React.Fragment>
    )
}

export default HomePage;