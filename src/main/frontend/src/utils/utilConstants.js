export const defaultGateway = "http://localhost:8080";
export const defaultFormLogin = {
    dni: '',
    pass: ''
};
export const defaultFormLoginAdmin = {
    email: '',
    pass: ''
};
export const defaultFormRegister = {
    id: null,
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    email: '',
    pass: ''
};
export const defaultFormAddPost = {
    id: null,
    titulo: '',
    descripcion: '',
    userID: 0,
    imagen: '',
    catID: 0,
    catName: '',
    active: '',
    fechaHoraCreacion: '',
    ultimaModificacion: ''
};
export const defaultDialogData = {
    open: false,
    msg: '',
    path: ''
};
export const defaultBaseName = "localhost:3000/app";

export const defaultHeaders = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS"
}

export const baseUser = {
    appVersion: "1.0.0",
    isLogged: false,
    idUser: 0,
    nombre: "",
    tipoUser: "",
    filial: ""
}
