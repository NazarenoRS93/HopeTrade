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

    useEffect(() => {
        fetchDonaciones();
    }, []);

    const fetchDonaciones = async () => {
        try {
            const enFilial = await DonacionesService.getDonacionesEnFilial();
            const tarjeta = await DonacionesService.getDonacionesTarjeta();
            setDonacionesEnFilial(enFilial);
            setDonacionesTarjeta(tarjeta);
            fetchAyudantes(enFilial);
            fetchCategorias(enFilial);
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

    return (
        <React.Fragment>
            <Grid container spacing={2} className="FullWidthPage">
                <Grid item xs={12}>
                    <Typography variant="h4">Donaciones en Filial</Typography>
                    {donacionesEnFilial.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre del Donante</TableCell>
                                        <TableCell>Nombre del Ayudante</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Fecha y Hora</TableCell>
                                        <TableCell>DNI del Donante</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donacionesEnFilial.map((donacion) => (
                                        <TableRow key={donacion.id}>
                                            <TableCell>{donacion.nombre_apellido}</TableCell>
                                            <TableCell>{ayudantes[donacion.id_ayudante] || "Cargando..."}</TableCell>
                                            <TableCell>{donacion.id_categoria === 16 ? "Dinero" : (categorias[donacion.id_categoria] || "Cargando...")}</TableCell>
                                            <TableCell>{donacion.cantidad}</TableCell>
                                            <TableCell>{format(new Date(donacion.fecha_hora), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                            <TableCell>{donacion.dni}</TableCell>
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
                    <Typography variant="h4">Donaciones por Tarjeta</Typography>
                    {donacionesTarjeta.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre del Donante</TableCell>
                                        <TableCell>Fecha y Hora</TableCell>
                                        <TableCell>Monto</TableCell>
                                        <TableCell>Número de Tarjeta</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donacionesTarjeta.map((donacion) => (
                                        <TableRow key={donacion.id}>
                                            <TableCell>{donacion.id_usuario}</TableCell>
                                            <TableCell>{format(new Date(donacion.fecha_hora), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                            <TableCell>{donacion.monto}</TableCell>
                                            <TableCell>{donacion.numero_tarjeta}</TableCell>
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
