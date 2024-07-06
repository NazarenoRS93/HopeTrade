import React, { useState, useEffect } from "react";
import '../App.css';
import DonacionesService from "../services/DonacionesService";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from 'date-fns';

function MostrarDonacionesPage() {
    const [donacionesEnFilial, setDonacionesEnFilial] = useState([]);
    const [donacionesTarjeta, setDonacionesTarjeta] = useState([]);
    const [ayudantes, setAyudantes] = useState({});
    const [categorias, setCategorias] = useState({});
    const [userNames, setUserNames] = useState({});
    const [filiales, setFiliales] = useState({}); // Nuevo estado para almacenar las filiales
	
    useEffect(() => {
        fetchDonaciones();
    }, []);

    const fetchDonaciones = async () => {
        try {
            const enFilial = await DonacionesService.getDonacionesEnFilial();
			const enFilialOrdenadas = enFilial.sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)); // Ordenar por fecha más reciente
            const tarjeta = await DonacionesService.getDonacionesTarjeta();
			const tarjetaOrdenadas = tarjeta.sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)); // Ordenar por fecha más reciente
			console.log("Donaciones en Filial:", enFilial);
            setDonacionesEnFilial(enFilialOrdenadas);
            setDonacionesTarjeta(tarjetaOrdenadas);
            fetchAyudantes(enFilial);
            fetchCategorias(enFilial);
            fetchUserNames(tarjeta);
            fetchFiliales(enFilial); // Llamar a la función para obtener nombres de filiales
        } catch (error) {
            alert("Error fetching donations: " + error);
        }
    };

    const fetchAyudantes = async (donaciones) => {
        try {
            const ayudantesMap = {};
            for (const donacion of donaciones) {
                if (donacion.id_ayudante && !ayudantesMap[donacion.id_ayudante]) {
                    const ayudante = await DonacionesService.getAdministrativoById(donacion.id_ayudante);
                    ayudantesMap[donacion.id_ayudante] = `${ayudante.nombre} ${ayudante.apellido}`;
                }
            }
            setAyudantes(ayudantesMap);
        } catch (error) {
            alert("Error fetching helpers: " + error);
        }
    };

    const fetchCategorias = async (donaciones) => {
        try {
            const categoriasMap = {};
            for (const donacion of donaciones) {
                if (donacion.id_categoria && donacion.id_categoria !== 16 && !categoriasMap[donacion.id_categoria]) {
                    const categoria = await DonacionesService.getCategoriaById(donacion.id_categoria);
                    categoriasMap[donacion.id_categoria] = categoria.nombre;
                }
            }
            setCategorias(categoriasMap);
        } catch (error) {
            alert("Error fetching categories: " + error);
        }
    };

    const fetchUserNames = async (donaciones) => {
        try {
            const userIds = donaciones.map(donacion => donacion.id_usuario);
            const uniqueUserIds = [...new Set(userIds)];

            const userNameMap = {};
            for (const userId of uniqueUserIds) {
                const user = await DonacionesService.getUserById(userId);
                userNameMap[userId] = `${user.nombre} ${user.apellido}`;
            }
            setUserNames(userNameMap);
        } catch (error) {
            alert("Error fetching user names: " + error);
        }
    };

	const fetchFiliales = async (donaciones) => {
	    try {
	        const filialesMap = {};
	        for (const donacion of donaciones) {
	            if (donacion.id_filial && !filialesMap[donacion.id_filial]) {
	                const filial = await DonacionesService.getFilialById(donacion.id_filial); // Pass the ID directly
	                console.log("Filial", filial);
	                filialesMap[donacion.id_filial] = filial;
	            }
	        }
	        setFiliales(filialesMap);
	    } catch (error) {
	        alert("Error fetching filiales: " + error);
	    }
	};

    const titleCellStyle = {
        backgroundColor: 'grey',
        color: 'white',
        fontWeight: 'bold',
    };

    const titleContainerStyle = {
        marginBottom: '20px',
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <div style={titleContainerStyle}>
                        <Typography variant="h4">Donaciones en Filial</Typography>
                    </div>
                    {donacionesEnFilial.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={titleCellStyle}>Nombre del Donante</TableCell>
                                        <TableCell style={titleCellStyle}>Nombre del Ayudante</TableCell>
                                        <TableCell style={titleCellStyle}>Categoría</TableCell>
										<TableCell style={titleCellStyle}>Descripción</TableCell>
                                        <TableCell style={titleCellStyle}>Cantidad</TableCell>
                                        <TableCell style={titleCellStyle}>Fecha y Hora</TableCell>
                                        <TableCell style={titleCellStyle}>DNI del Donante</TableCell>
                                        <TableCell style={titleCellStyle}>Filial</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donacionesEnFilial.map((donacion) => (
                                        <TableRow key={donacion.id}>
                                            <TableCell>{donacion.nombre_apellido}</TableCell>
                                            <TableCell>{ayudantes[donacion.id_ayudante] || "Cargando..."}</TableCell>
                                            <TableCell>{donacion.id_categoria === 16 ? "Dinero" : (categorias[donacion.id_categoria] || "Cargando...")}</TableCell>
											<TableCell>{donacion.descripcion}</TableCell>
											<TableCell>{donacion.cantidad}</TableCell>
                                            <TableCell>{format(new Date(donacion.fecha_hora), 'dd/MM/yyyy HH:mm')}</TableCell>
                                            <TableCell>{donacion.dni}</TableCell>
                                            <TableCell>{filiales[donacion.id_filial]?.nombre || "Cargando..."}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1">No hay donaciones en filial.</Typography>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <div style={titleContainerStyle}>
                        <Typography variant="h4">Donaciones con Tarjeta</Typography>
                    </div>
                    {donacionesTarjeta.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={titleCellStyle}>Nombre del Donante</TableCell>
                                        <TableCell style={titleCellStyle}>Fecha y Hora</TableCell>
                                        <TableCell style={titleCellStyle}>Monto</TableCell>
                                        <TableCell style={titleCellStyle}>Número de Tarjeta</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donacionesTarjeta.map((donacion) => (
                                        <TableRow key={donacion.id}>
                                            <TableCell>{userNames[donacion.id_usuario] || "Cargando..."}</TableCell>
                                            <TableCell>{format(new Date(donacion.fecha_hora), 'dd/MM/yyyy HH:mm')}</TableCell>
                                            <TableCell>{donacion.monto}</TableCell>
                                            <TableCell>  {donacion.numero_tarjeta.slice(0, -4).replace(/./g, '*') + donacion.numero_tarjeta.slice(-4)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1">No hay donaciones por tarjeta.</Typography>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default MostrarDonacionesPage;
