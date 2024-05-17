export const defaultGateway = "http://localhost:8080";
export const defaultFormLogin = {
    dni: '',
    pass: ''
};
export const defaultFormLoginAdmin = {
    email: '',
    pass: ''
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