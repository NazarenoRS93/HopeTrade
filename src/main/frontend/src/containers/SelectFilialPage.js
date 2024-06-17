import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FilialService from "../services/FilialService";
import {defaultGateway} from '../utils/utilConstants';
import Grid from "@mui/material/Grid";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

function SelectFilialPage() {
	const [filiales, setFiliales] = useState([]);
	const [selectedFilial, setSelectedFilial] = useState(0);
	const [userId, setUserId] = useState(null);
	const [btnDisabled, setBtnDisabled] = useState(true);

	useEffect(() => {
		fetchFiliales();
		const user = JSON.parse(window.localStorage.getItem("user"));
		setUserId(user?.idUser);
	}, []);

	const fetchFiliales = async () => {
		try {
			const response = await axios.get(defaultGateway + '/filial/all');
			setFiliales(response.data);
			console.log(response.data);
		} catch (error) {
			alert("Error obteniendo filiales: " + error);
		}
	};

	const handleChange = (event) => {
		setSelectedFilial(event.target.value);
		setBtnDisabled(event.target.value === 0)
	};

	const handleSelect = async () => {
		if (userId && selectedFilial) {
			try {
				const response = await FilialService.selectFilial(userId, selectedFilial);
				const cookie = window.localStorage.getItem("user");
				if(cookie) {
					let user = JSON.parse(cookie);
					//Se obtiene el objeto de la filial seleccionada
					let laFilial = filiales.find((element) => element.id === selectedFilial);
					user = {...user, filial: selectedFilial, desc_filial: laFilial.nombre + " (" + laFilial.direccion + ")"};
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
		<Grid container spacing={2} className="FullWidthPage">
			<Grid item xs={12}>
				<Typography variant="subtitle1">Seleccionar Filial</Typography>
			</Grid>
			<Grid item xs={3}>
				<Stack spacing={2} direction="column">
					<Select
						value={selectedFilial}
						onChange={handleChange}
					>
						<MenuItem value={0} disabled>
							Seleccione una filial
						</MenuItem>
						{filiales.map((filial) => (
							<MenuItem key={filial.id} value={filial.id}>
								{filial.nombre} ({filial.direccion})
							</MenuItem>
						))}
					</Select>
					<Button variant="contained" color="success" onClick={handleSelect}
							disabled={btnDisabled} startIcon={<TaskAltRoundedIcon color="primary"/>}>
						<Typography variant="button">Seleccionar</Typography>
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}

export default SelectFilialPage;
