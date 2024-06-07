import React, { useState, useEffect } from "react";
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
						console.log("Form for regular user:", { id: userData.id }); // Debug
					} else if (tipoUser === 1) {
						const userData = await UpdateProfileService.getAdministrativoById(userId);
						setForm(prevForm => ({
							...prevForm,
							id: userData.id
						}));
						console.log("Form for administrative user:", { id: userData.id }); // Debug
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
		console.log("Form State after change:", { ...form, [id]: value }); // Debug
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
						<Typography variant="subtitle1">Cambiar Contraseña</Typography>
						<FormControl>
							<TextField
								onChange={handleChange}
								value={form.antiguaContrasenia}
								placeholder="Antigua Contraseña"
								type="password"
								variant="outlined"
								id="antiguaContrasenia"
							/>
							<FormHelperText id="antiguaContrasenia-text">Ingrese su Antigua Contraseña</FormHelperText>
						</FormControl>

						<FormControl>
							<TextField
								onChange={handleChange}
								value={form.nuevaContrasenia}
								placeholder="Nueva Contraseña"
								type="password"
								variant="outlined"
								id="nuevaContrasenia"
							/>
							<FormHelperText id="nuevaContrasenia-text">Ingrese su nueva Contraseña</FormHelperText>
						</FormControl>

						<Button
							variant="contained"
							color="secondary"
							startIcon={<PersonAddAltRoundedIcon color="primary" />}
							onClick={updatePass}
						>
							<Typography variant="button">Guardar cambios</Typography>
						</Button>
						<Button variant="contained" color="primary" onClick={handleCancel}>
							Cancelar
						</Button>
					</Box>
				</Box>
				<Box sx={{ flexGrow: 1 }} />
			</Box>
		</React.Fragment>
	);
}

export default ChangePasswordPage;
