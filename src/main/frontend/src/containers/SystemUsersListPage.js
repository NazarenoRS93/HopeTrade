import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { colors } from "../utils/colors";
import UpdateProfileService from "../services/UpdateProfileService";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { format } from 'date-fns';
function SystemUsersListPage() {
 const [users, setUsers] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [filterStatus, setFilterStatus] = useState("Activos");
 const [open, setOpen] = useState(false);
 const [selectedUser, setSelectedUser] = useState(null);
 const [deleteReason, setDeleteReason] = useState("");
 const fetchUsers = async () => {
   try {
     const usersData = await UpdateProfileService.getAllUsers();
     setUsers(usersData);
   } catch (error) {
     console.error("Error fetching users data", error);
   }
 };
 useEffect(() => {
   fetchUsers();
 }, []);
 useEffect(() => {
   fetchUsers();
 }, [filterStatus]);
 const handleSearchChange = (event) => {
   setSearchTerm(event.target.value);
 };
 const handleFilterChange = (event) => {
   setFilterStatus(event.target.value);
 };
 const handleOpen = (user) => {
   setSelectedUser(user);
   setOpen(true);
 };
 const handleClose = () => {
   setOpen(false);
   setSelectedUser(null);
   setDeleteReason("");
 };
 const handleDelete = async () => {
   try {
     await UpdateProfileService.deleteUser(selectedUser.id, deleteReason);
     handleClose();
     fetchUsers(); // Refresh the user list after deletion
   } catch (error) {
     console.error("Error deleting user", error);
   }
 };
 const filteredUsers = users.filter(user => {
   const matchesSearch = user.nombre.toLowerCase().startsWith(searchTerm.toLowerCase()) || user.apellido.toLowerCase().startsWith(searchTerm.toLowerCase());
   if (filterStatus === "Activos") {
     return matchesSearch && user.activo;
   } else if (filterStatus === "Inactivos") {
     return matchesSearch && !user.activo;
   } else {
     return matchesSearch;
   }
 });
 let noUsersMessage = "";
 if (filteredUsers.length === 0) {
   if (filterStatus === "Todos") {
     noUsersMessage = "No se encuentran usuarios registrados en el sistema";
   } else {
     noUsersMessage = `No se encuentran usuarios ${filterStatus.toLowerCase()} en el sistema`;
   }
 }
 return (
   <React.Fragment>
     <Box
       sx={{
         backgroundColor: colors.background,
         flexDirection: "column",
         alignItems: "center",
         display: "flex",
         width: "100%",
         padding: 3
       }}
     >
       <Box sx={{ width: "100%", padding: 2 }}>
         <TextField
           value={searchTerm}
           onChange={handleSearchChange}
           type="text"
           variant="outlined"
           id="search"
           label="Buscar por Nombre"
           fullWidth
         />
       </Box>
       <Box sx={{ width: "100%", padding: 2 }}>
         <FormControl fullWidth>
           <InputLabel id="filter-status-label">Estado</InputLabel>
           <Select
             labelId="filter-status-label"
             id="filter-status"
             value={filterStatus}
             label="Estado"
             onChange={handleFilterChange}
           >
             <MenuItem value="Activos">Activos</MenuItem>
             <MenuItem value="Inactivos">Inactivos</MenuItem>
             <MenuItem value="Todos">Todos</MenuItem>
           </Select>
         </FormControl>
       </Box>
       {noUsersMessage && (
         <Typography
           variant="h6"
           color="text.secondary"
           sx={{
             marginTop: 2,
             fontSize: "1.2rem", // Increase font size
             fontWeight: "bold", // Make font bold
             color: "black" // Change color to red
           }}
         >
           {noUsersMessage}
         </Typography>
       )}
       <Grid container spacing={3}>
         {filteredUsers.map((user) => (
           <Grid item xs={12} sm={6} md={6} key={user.id}>
             <Card sx={{ minWidth: 275, backgroundColor: colors.cardBackground, borderRadius: 2, boxShadow: 3 }}>
               <CardContent>
                 <Typography variant="h6" gutterBottom>
                   {user.nombre} {user.apellido}
                 </Typography>
                 <Divider sx={{ marginBottom: 2 }} />
                 <Typography variant="body2" color="text.secondary">
                   <strong>DNI:</strong> {user.dni || "N/A"}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   <strong>Email:</strong> {user.email || "N/A"}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   <strong>Fecha Nacimiento:</strong> {user.fecha_nacimiento ? format(new Date(user.fecha_nacimiento), 'dd-MM-yyyy') : "N/A"}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   <strong>Estado:</strong> {user.activo ? "Activo" : "Inactivo"}
                 </Typography>
               </CardContent>
               <CardActions>
                 <Button
                   variant="contained"
                   color="secondary"
                   sx={{
                     backgroundColor: 'red',
                     marginLeft: 'auto',
                     ...(user.activo ? {} : { backgroundColor: 'grey', pointerEvents: 'none' })
                   }}
                   onClick={() => handleOpen(user)}
                   disabled={!user.activo}
                 >
                   Eliminar Cuenta
                 </Button>
               </CardActions>
             </Card>
           </Grid>
         ))}
       </Grid>
     </Box>
     <Modal
       open={open}
       onClose={handleClose}
     >
       <Box sx={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: 400,
         backgroundColor: 'background.paper',
         boxShadow: 24,
         padding: 4,
       }}>
         <Typography variant="h6" gutterBottom>
           Motivo de eliminación de cuenta
         </Typography>
         <TextField
           value={deleteReason}
           onChange={(e) => setDeleteReason(e.target.value)}
           type="text"
           variant="outlined"
           id="delete-reason"
           label="Motivo"
           fullWidth
         />
         <Box mt={2} display="flex" justifyContent="flex-end">
           <Button onClick={handleClose} color="primary">
             Cancelar
           </Button>
           <Button
             onClick={handleDelete}
             color="secondary"
             variant="contained"
             sx={{ ml: 2, backgroundColor: 'red' }}
             disabled={deleteReason.trim() === ""}
           >
             Eliminar
           </Button>
         </Box>
       </Box>
     </Modal>
   </React.Fragment>
 );
}
export default SystemUsersListPage;



