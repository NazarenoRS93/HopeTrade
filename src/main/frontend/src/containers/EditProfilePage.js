import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { colors } from "../utils/colors";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import UpdateProfileService from "../services/UpdateProfileService";

function EditProfilePage() {
    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        pass: ""
    });

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const cookie = window.localStorage.getItem("user");
            if (cookie) {
                try {
                    const user = JSON.parse(cookie);
                    const userId = user.idUser;  // Cambiado de user.id a user.idUser
                    console.log("User ID:", userId); // Debug
                    setUserId(userId);

                    const userData = await UpdateProfileService.getUserById(userId);
                    console.log("User Data:", userData); // Debug
                    setForm({
                        id: userData.id,
                        nombre: userData.nombre,
                        apellido: userData.apellido,
                        email: userData.email,
                        pass: ""
                    });
                    console.log("Form State after fetching user data:", form); // Debug
                } catch (error) {
                    console.error("Error parsing user data", error);
                }
            } else {
                alert("Error fetching user data");
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        let tempForm = { ...form };
        switch (e.target.id) {
            case "nombre": tempForm = { ...tempForm, nombre: e.target.value }; break;
            case "apellido": tempForm = { ...tempForm, apellido: e.target.value }; break;
            case "email": tempForm = { ...tempForm, email: e.target.value }; break;
            default: break;
        }
        setForm(tempForm);
        console.log("Form State after change:", tempForm); // Debug
    };

    const updateProfile = async () => {
        if (userId) {
            try {
                await UpdateProfileService.updateUserProfile({
                    id: userId,
                    nombre: form.nombre,
                    apellido: form.apellido,
                    email: form.email
                });
                console.log("Profile updated:", {
                    id: userId,
                    nombre: form.nombre,
                    apellido: form.apellido,
                    email: form.email
                }); // Debug
                alert("¡Perfil actualizado con éxito!");
            } catch (error) {
                alert(error.response.data);
            }
        } else {
            alert("Error: User ID not found.");
        }
    };

    const handleCancel = () => {
        window.location.replace("/app/home");
    };

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
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <Box
                        sx={{
                            backgroundColor: colors.background,
                            flexDirection: "column",
                            alignItems: "center",
                            display: "flex"
                        }}
                    >
                        <Typography variant="subtitle1">Editar Perfil</Typography>
                        <FormControl>
                            <TextField onChange={(event) => { handleChange(event) }} value={form.nombre}
                                placeholder="Nombre" type="text" variant="outlined" id="nombre"
                            />
                            <FormHelperText id="nombre-text">Ingrese su nombre</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event) => { handleChange(event) }} value={form.apellido}
                                placeholder="Apellido" type="text" variant="outlined" id="apellido"
                            />
                            <FormHelperText id="apellido-text">Ingrese su apellido</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField onChange={(event) => { handleChange(event) }} value={form.email}
                                placeholder="Email" type="email" variant="outlined" id="email"
                            />
                            <FormHelperText id="email-text">Ingrese su e-mail</FormHelperText>
                        </FormControl>
                        <Button variant="contained" color="secondary" startIcon={<PersonAddAltRoundedIcon color="primary" />}
                            onClick={updateProfile}>
                            <Typography variant="button">Guardar cambios</Typography>
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary">
                            Cambiar Contraseña
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
            </Box>
        </React.Fragment>
    );
}

export default EditProfilePage;
