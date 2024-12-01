import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { colors } from "../utils/colors";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ChangePasswordService from "../services/ChangePasswordService";
import UpdateProfileService from "../services/UpdateProfileService";

function ChangePasswordPage() {
  const [form, setForm] = useState({
    id: "",
    antiguaContrasenia: "",
    nuevaContrasenia: ""
  });

  const [userId, setUserId] = useState(null);
  const [tipoUser, setTipoUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const cookie = window.localStorage.getItem("user");
      if (cookie) {
        try {
          const user = JSON.parse(cookie);
          const userId = user.idUser;
          const tipoUser = user.tipoUser;
          setUserId(userId);
          setTipoUser(tipoUser);

          if (tipoUser === 0) {
            const userData = await UpdateProfileService.getUserById(userId);
            setForm(prevForm => ({
              ...prevForm,
              id: userData.id
            }));
          } else if (tipoUser === 1) {
            const userData = await UpdateProfileService.getAdministrativoById(userId);
            setForm(prevForm => ({
              ...prevForm,
              id: userData.id
            }));
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        alert("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value
    }));
  };

  const updatePass = async () => {
    if (userId) {
      try {
        if (tipoUser === 0) {
          await ChangePasswordService.updateUserPassword({
            id: userId,
            antiguaContrasenia: form.antiguaContrasenia,
            nuevaContrasenia: form.nuevaContrasenia
          });
          alert("¡Contraseña Actualizada!");
        } else if (tipoUser === 1) {
          await ChangePasswordService.updateAdminstrativoPassword({
            id: userId,
            antiguaContrasenia: form.antiguaContrasenia,
            nuevaContrasenia: form.nuevaContrasenia
          });
          alert("¡Contraseña Actualizada!");
        }
      } catch (error) {
        alert(error.response.data || "Error updating password");
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: 2
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '1.5rem', marginBottom: 2 }}>Cambiar Contraseña</Typography>
        <FormControl sx={{ marginBottom: 2, width: '30%' }}>
          <TextField
            onChange={handleChange}
            value={form.antiguaContrasenia}
            InputLabelProps={{ shrink: true }}
           
            type="password"
            variant="outlined"
            id="antiguaContrasenia"
            fullWidth
          />
          <FormHelperText>Ingrese su Antigua Contraseña</FormHelperText>
        </FormControl>

        <FormControl sx={{ marginBottom: 2, width: '30%' }}>
          <TextField
            onChange={handleChange}
            value={form.nuevaContrasenia}
            InputLabelProps={{ shrink: true }}
            
            type="password"
            variant="outlined"
            id="nuevaContrasenia"
            fullWidth
          />
          <FormHelperText>Ingrese su nueva Contraseña</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAltRoundedIcon color="primary" />}
          onClick={updatePass}
          sx={{ marginBottom: 2 }}
        >
          Guardar cambios
        </Button>
        <Button variant="contained" color="primary" onClick={handleCancel}>
          Cancelar
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default ChangePasswordPage;
