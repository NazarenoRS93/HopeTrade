import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import UpdateProfileService from "../services/UpdateProfileService";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
          <Grid container spacing={2} className="FullWidthPage">
              <Grid item xs={12}>
                  <Typography variant="subtitle1">Editar Perfil</Typography>
              </Grid>
              <Grid item xs={3}>
                  <Stack spacing={2} direction="column">
                      <FormControl>
                          <TextField onChange={(event)=> {handleChange(event)}} value={form.nombre}
                                     type="text" variant="outlined" id="nombre"
                          />
                          <FormHelperText id="nombre-text">Ingrese su nombre</FormHelperText>
                      </FormControl>
                      <FormControl>
                          <TextField onChange={(event)=> {handleChange(event)}} value={form.apellido}
                                     type="text" variant="outlined" id="apellido"
                          />
                          <FormHelperText id="apellido-text">Ingrese su apellido</FormHelperText>
                      </FormControl>
                      <Button variant="contained" color="success" onClick={updateProfile} disabled={!hasChanges()} // Deshabilita el botón si no hay cambios
                              startIcon={<PersonAddAltRoundedIcon color="primary" />}
                      >
                          <Typography variant="button">Guardar cambios</Typography>
                      </Button>
                      <Button variant="contained" color="error" onClick={handleCancel}>
                          <Typography variant="button2">Cancelar</Typography>
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleChangePassword}>
                          <Typography variant="button">Cambiar Contraseña</Typography>
                      </Button>
                  </Stack>
              </Grid>
          </Grid>
      </React.Fragment>
  );
}

export default EditProfilePageAyudante;
