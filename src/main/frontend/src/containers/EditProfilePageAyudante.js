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

function EditProfilePageAyudante() {
  const initialFormState = {
    id: "",
    nombre: "",
    apellido: "",
    pass: ""
  };

  const [form, setForm] = useState(initialFormState);
  const [originalForm, setOriginalForm] = useState(initialFormState);
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

          const userData = await UpdateProfileService.getAdministrativoById(userId);
          console.log("User Data:", userData); // Debug
          setForm({
            id: userData.id,
            nombre: userData.nombre,
            apellido: userData.apellido,
            pass: ""
          });
          setOriginalForm({
            id: userData.id,
            nombre: userData.nombre,
            apellido: userData.apellido,
            pass: ""
          });
          console.log("Form State after fetching user data:", form); // Debug (este log no mostrará el estado actualizado inmediatamente)
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      } else {
        alert("Error fetching user data");
      }
    };

    fetchUserData();
  }, []); // El segundo argumento del useEffect es un array vacío para ejecutar solo una vez al montar el componente

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const updateProfile = async () => {
    if (userId) {
      try {
        const updatedUser = {
          id: userId,
          nombre: form.nombre,
          apellido: form.apellido,
        };

        await UpdateProfileService.updateAdministrativoProfile({
          id_ayudante: userId,
          nombre: form.nombre,
          apellido: form.apellido,
        });
        console.log("Profile updated:", updatedUser); // Debug (mostrar el objeto actualizado)

        // Actualiza el localStorage con los nuevos datos del usuario
        const currentUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({ ...currentUser, ...updatedUser }));

        // Emitir un evento de actualización
        const event = new Event('userUpdated');
        window.dispatchEvent(event);
        alert("¡Perfil editado exitosamente!");
		window.location.replace("/app/verperfil");
        // Limpiar el formulario después de guardar cambios
        setForm(initialFormState);
        setOriginalForm(initialFormState);
      } catch (error) {
        alert(error.response.data);
      }
    } else {
      alert("Error: User ID not found.");
    }
  };

  const handleCancel = () => {
    window.location.replace("/app/verperfiladministrativo");
  };

  const handleChangePassword = () => {
    window.location.replace("/app/cambiarContrasenia");
  };

  const hasChanges = () => {
    return (
      form.nombre !== originalForm.nombre ||
      form.apellido !== originalForm.apellido
    );
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
              <TextField
                onChange={handleChange}
                value={form.nombre}
                placeholder="Nombre"
                type="text"
                variant="outlined"
                id="nombre"
              />
              <FormHelperText id="nombre-text">Ingrese su nombre</FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                onChange={handleChange}
                value={form.apellido}
                placeholder="Apellido"
                type="text"
                variant="outlined"
                id="apellido"
              />
              <FormHelperText id="apellido-text">Ingrese su apellido</FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonAddAltRoundedIcon color="primary" />}
              onClick={updateProfile}
              disabled={!hasChanges()} // Deshabilita el botón si no hay cambios
            >
              <Typography variant="button">Guardar cambios</Typography>
            </Button>
            <Button variant="contained" color="primary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleChangePassword}>
              Cambiar Contraseña
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </React.Fragment>
  );
}

export default EditProfilePageAyudante;
