import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Item from "../utils/Item";
import Button from "@mui/material/Button";
import {colors} from "../utils/colors";
import UpdateProfileService from "../services/UpdateProfileService";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function SystemAdminsPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Activos");

    const fetchUsers = async () => {
        try {
            const usersData = await UpdateProfileService.getAllAyudantes();
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users data", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [filterStatus]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const isNotAdmin = user.email !== "admin@caritas.com";

        if (filterStatus === "Activos") {
            return matchesSearch && isNotAdmin && user.activo;
        } else if (filterStatus === "Inactivos") {
            return matchesSearch && isNotAdmin && !user.activo;
        } else {
            return matchesSearch && isNotAdmin;
        }
    });

    const handleDelete = async (id) => {
        try {
            await UpdateProfileService.deleteAyudante(id);
            fetchUsers();
            alert("Ayudante dado de baja satisfactoriamente");
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: colors.background,
                    flexDirection: "column",
                    alignItems: "center",
                    display: "flex",
                    width: "100%",
                    padding: 3
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
                <Item sx={{ width: "100%", padding: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="filter-status-label">Estado</InputLabel>
                        <Select
                            labelId="filter-status-label"
                            id="filter-status"
                            value={filterStatus}
                            label="Estado"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="Activos">Activos</MenuItem>
                            <MenuItem value="Inactivos">Inactivos</MenuItem>
                            <MenuItem value="Todos">Todos</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
                <Grid container spacing={3}>
                    {filteredUsers.map((user, index) => (
                        <Grid item xs={12} sm={6} md={6} key={user.id}>
                            <Card sx={{ minWidth: 275, backgroundColor: colors.cardBackground, borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {user.nombre} {user.apellido}
                                    </Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>DNI:</strong> {user.dni || "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Email:</strong> {user.email || "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Estado:</strong> {user.activo ? "Activo" : "Inactivo"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            backgroundColor: 'red',
                                            marginLeft: 'auto',
                                            ...(user.activo ? {} : { backgroundColor: 'grey', pointerEvents: 'none' })
                                        }}
                                        onClick={() => handleDelete(user.id)}
                                        disabled={!user.activo}
                                    >
                                        Eliminar Cuenta
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default SystemAdminsPage;
