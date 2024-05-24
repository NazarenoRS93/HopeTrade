import React, {useEffect, useState} from 'react'
import AyudanteService from '../services/AyudanteService';

export const ListAyudantesComponent = () => {
  const [ayudantes, setAyudantes] = useState([]);
  
  useEffect(() =>{
	AyudanteService.getAllAyudantes().then(response =>{
		setAyudantes(response.data);
		console.log(response.data);
	}).catch(error => {
		console.log(error);
	})
  },[])
  
  return (
    <div>
      <h2 className='text-center'>Lista de ayudantes</h2>
      <table className='table table-bordered table-striped'>
        <thead>
           <th>ID</th>
           <th>DNI</th>
           <th>Nombre</th>
           <th>Apellido</th>
           <th>email</th>
        </thead>
        <tbody>
           {
			 ayudantes.map(
				ayudante =>
			    <tr key={ ayudante.id}>
			        <td>{ ayudante.dni}</td>
			        <td>{ ayudante.nombre}</td>
			        <td>{ ayudante.apellido}</td>
			        <td>{ ayudante.email}</td>
			    </tr>
			 )
		   }
        </tbody>
      </table>
    </div>
  )
}

export default ListAyudantesComponent;