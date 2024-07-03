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

function MostrarDonacionesPage() {
    const [donacionesEnFilial, setDonacionesEnFilial] = useState([]);
    const [donacionesTarjeta, setDonacionesTarjeta] = useState([]);

    useEffect(() => {
        fetchDonaciones();
    }, []);

    const fetchDonaciones = async () => {
        try {
            const enFilial = await DonacionesService.getDonacionesEnFilial();
            const tarjeta = await DonacionesService.getDonacionesTarjeta();
            setDonacionesEnFilial(enFilial);
            setDonacionesTarjeta(tarjeta);
        } catch (error) {
            alert("Error fetching donations: " + error);
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
                                            <TableCell>{donacion.id_ayudante}</TableCell>
                                            <TableCell>{donacion.id_categoria}</TableCell>
                                            <TableCell>{donacion.cantidad}</TableCell>
                                            <TableCell>{donacion.fecha_hora}</TableCell>
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
                                            <TableCell>{donacion.fecha_hora}</TableCell>
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
