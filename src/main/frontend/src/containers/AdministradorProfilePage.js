import React, {useEffect, useState} from "react";
import '../App.css';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Item from "../utils/Item";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button"; // Import Button component
import {colors} from "../utils/colors";
import UpdateProfileService from "../services/UpdateProfileService";
import {FormLabel} from "@mui/material"; // Ensure you have this service

function AdministradorProfilePage() {
	const initialFormState = {
		id: "",
		dni: "",
		nombre: "",
		apellido: "",
		email: "",
	};

	const [form, setForm] = useState(initialFormState);
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
						dni: userData.dni,
						nombre: userData.nombre,
						apellido: userData.apellido,
						email: userData.email,
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

	const handleEditProfile = async () => {
		window.location.replace("/app/administrador-profile");
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
				<Item sx={{ flexGrow: 1 }} />
				<Item>
					<Box
						sx={{
							backgroundColor: colors.background,
							flexDirection: "column",
							alignItems: "center",
							display: "flex"
						}}
					>
						<Item>
							<Typography variant="subtitle1">Perfil del Ayudante</Typography>
						</Item>
						<Item>
							<Box
								sx={{
									backgroundColor: colors.background,
									flexDirection: "row",
									alignItems: "center",
									display: "flex"
								}}
							>
								<Item>
									<FormControl>
										<FormLabel>Nombre</FormLabel>
										<TextField value={form.nombre} type="text" variant="outlined"
												   id="nombre" InputProps={{ readOnly: true }}
										/>
										<FormHelperText id="nombre-text">Nombre</FormHelperText>
									</FormControl>
								</Item>
								<Item>
									<FormControl>
										<FormLabel>Apellido</FormLabel>
										<TextField value={form.apellido} type="text" variant="outlined"
												   id="apellido" InputProps={{ readOnly: true }}
										/>
										<FormHelperText id="apellido-text">Apellido</FormHelperText>
									</FormControl>
								</Item>
								<Item>
									<FormControl>
										<FormLabel>DNI</FormLabel>
										<TextField value={form.dni} type="number" variant="outlined"
												   id="dni" InputProps={{ readOnly: true }}
										/>
										<FormHelperText id="dni-text">DNI</FormHelperText>
									</FormControl>
								</Item>
								<Item>
									<FormControl>
										<FormLabel>E-mail</FormLabel>
										<TextField value={form.email} type="email" variant="outlined"
												   id="email" InputProps={{ readOnly: true }}
										/>
										<FormHelperText id="email-text">E-mail</FormHelperText>
									</FormControl>
								</Item>
							</Box>
						</Item>
						<Item>
							<Button
								variant="contained"
								color="primary"
								onClick={handleEditProfile}
							>
								Editar Perfil
							</Button>
						</Item>
					</Box>
				</Item>
				<Item sx={{ flexGrow: 1 }} />
			</Box>
		</React.Fragment>
	);
}

export default AdministradorProfilePage;
