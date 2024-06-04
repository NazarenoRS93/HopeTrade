import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { colors } from "../utils/colors";
import FilialService from "../services/FilialService";

function SelectFilialPage() {
	const [filiales, setFiliales] = useState([]);
	const [selectedFilial, setSelectedFilial] = useState('');
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		fetchFiliales();
		const user = JSON.parse(window.localStorage.getItem("user"));
		setUserId(user?.idUser);
	}, []);

	const fetchFiliales = async () => {
		try {
			const response = await axios.get('http://localhost:8080/filial/all');
			setFiliales(response.data);
			console.log(response.data);
		} catch (error) {
			alert("Error obteniendo filiales: " + error);
		}
	};

	const handleChange = (event) => {
		setSelectedFilial(event.target.value);
	};

	const handleSelect = async () => {
		if (userId && selectedFilial) {
			try {
				const response = await FilialService.selectFilial(userId, selectedFilial);
				const cookie = window.localStorage.getItem("user");
				if(cookie) {
					let user = JSON.parse(cookie);
					user = {...user, filial: selectedFilial};
					window.localStorage.setItem("user",JSON.stringify(user));
				};
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
		<Box
			sx={{
				backgroundColor: colors.background,
				flexDirection: "row",
				alignItems: "center",
				display: "flex",
				width: "100%"
			}}
		>
			<Typography variant="h4" gutterBottom>
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
			<Button variant="contained" color="success" onClick={handleSelect}>
				<Typography variant="button">Seleccionar</Typography>
			</Button>
		</Box>
	);
}

export default SelectFilialPage;
