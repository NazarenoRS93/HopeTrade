import React, { useEffect, useState } from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Item from "../utils/Item";
import Button from "@mui/material/Button";
import { colors } from "../utils/colors";
import UpdateProfileService from "../services/UpdateProfileService";

function SystemAdminsPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await UpdateProfileService.getAllAyudantes();
                const filteredUsers = usersData.filter(user => user.email !== "admin@caritas.com");
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users data", error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <Item sx={{ width: "100%", padding: 2 }}>
                    <TextField
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="text"
                        variant="outlined"
                        id="search"
                        label="Buscar por Nombre"
                        fullWidth
                    />
                </Item>
                <Item sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            backgroundColor: colors.background,
                            flexDirection: "column",
                            alignItems: "center",
                            display: "flex",
                            width: "100%"
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Lista de Usuarios</Typography>
                        {filteredUsers.map((user, index) => (
                            <Box
                                key={user.id}
                                sx={{
                                    backgroundColor: colors.background,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    display: "flex",
                                    width: "100%",
                                    padding: 2,
                                    borderBottom: "1px solid #ccc"
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1"><strong>DNI:</strong> {user.dni || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Nombre:</strong> {user.nombre || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Apellido:</strong> {user.apellido || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Email:</strong> {user.email || "N/A"}</Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ backgroundColor: 'red' }}
                                    onClick={() => { /* handle delete functionality */ }}
                                >
                                    Eliminar Cuenta
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Item>
            </Box>
        </React.Fragment>
    );
}

export default SystemAdminsPage;
