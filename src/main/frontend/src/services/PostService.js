import axios from "axios";

const POST_BASE_REST_API_URL = "http://localhost:8080/publicacion";

 class PostService{
     getPostsFirstCall(){
         const cookie = window.localStorage.getItem("user");
         let user = JSON.parse(cookie);
         let url = "";
         if(window.location.href.includes("mypublis")) {
             url = POST_BASE_REST_API_URL+"/user/"+user.idUser;
         } else if(window.location.href.includes("posts")) {
             url = POST_BASE_REST_API_URL+"/all/activas";
         }
         return axios.get(url);
     }
 }
 
 export default new PostService();