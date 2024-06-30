import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const ComentariosYRespuestasService = {
  fetchComentarios: async (postId) => {
    try {
      const url = `${BASE_URL}/comentario/publicacion/${postId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Error obteniendo comentarios: " + error.message);
    }
  },
  
  fetchRespuestas: async (comentarioId) => {
      try {
          const url = `${BASE_URL}/respuesta-comentario/${comentarioId}`;
          const response = await axios.get(url);
		  console.log("RESPUESTA SERVICE!!!", response);
          return response.data;
      } catch (error) {
          if (error.response && error.response.status === 404) {
              return null; // Maneja el 404 devolviendo null
          } else {
              throw new Error("Error obteniendo respuestas: " + error.message);
          }
      }
  },
  
  guardarComentario: async (comentarioData) => {
    try {
      const url = `${BASE_URL}/comentario/guardar`;
      const response = await axios.post(url, comentarioData);
      return response.data;
    } catch (error) {
      throw new Error("Error al guardar comentario: " + error.message);
    }
  },
  
  guardarRespuesta: async (respuestaData) => {
    try {
      const url = `${BASE_URL}/respuesta-comentario/guardar`;
      const response = await axios.post(url, respuestaData);
      return response.data;
    } catch (error) {
      throw new Error("Error al guardar respuesta: " + error.message);
    }
  },
  
  eliminarComentario: async (comentarioId) => {
    try {
      const url = `${BASE_URL}/comentario/eliminar/${comentarioId}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error("Error al eliminar comentario: " + error.message);
    }
  }
};

export default ComentariosYRespuestasService;
