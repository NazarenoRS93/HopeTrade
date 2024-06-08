import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import FilialService from "../services/FilialService";
import SessionContext from "../context/context";

function SelectFilialPage() {
	const {user,handleLogin} = useContext(SessionContext);

	const [filiales, setFiliales] = useState([]);
	const [selectedFilial, setSelectedFilial] = useState("");

	useEffect(() => {
		fetchFiliales();
	}, []);

	const fetchFiliales = async () => {
		try {
			const response = await axios.get('http://localhost:8080/filial/all');
			setFiliales(response.data);
		} catch (error) {
			alert("Error obteniendo filiales: " + error);
		}
	};

	const handleChange = (event) => {
		setSelectedFilial(event.target.value);
	};

	const handleSelect = async () => {
		if (user.isLogged && selectedFilial) {
			try {
				const response = await FilialService.selectFilial(user.idUser, selectedFilial);
				let tempUserData = {...user, filial: selectedFilial};
				handleLogin(tempUserData);
				window.localStorage.setItem("user",JSON.stringify(tempUserData));
				let href = window.location.href;
	            href = href.substring(0, href.lastIndexOf('/'));
	            window.location.replace(href+"/home");
			} catch (error) {
				alert("Error al seleccionar filial: " + error.response.data);
			}
		} else {
			alert("Seleccione una filial.");
		}
	};
	
	return (
		<Stack spacing={2} direction="column">
			<Typography variant="subtitle1">
				Seleccionar Filial
			</Typography>
			<Select
				value={selectedFilial}
				onChange={handleChange}
				displayEmpty
				sx={{ minWidth: 200, marginBottom: 2 }}
			>
				<MenuItem value="" disabled>
					Seleccione una filial
				</MenuItem>
				{filiales.map((filial) => (
					<MenuItem key={filial.id} value={filial.id}>
						{filial.nombre}
					</MenuItem>
				))}
			</Select>
			<Button variant="contained" color="success" startIcon={<TaskAltRoundedIcon color="primary" />}
					onClick={handleSelect} disabled={selectedFilial !== ""}>
				<Typography variant="button">Seleccionar</Typography>
			</Button>
		</Stack>
	);
}

export default SelectFilialPage;
