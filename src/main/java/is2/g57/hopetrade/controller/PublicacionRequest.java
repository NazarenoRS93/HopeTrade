package is2.g57.hopetrade.controller;

public class PublicacionRequest {
    private String titulo;
    private String descripcion;
    private long userID;

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {  
        this.titulo = titulo;
    }

    public String getDescripcion() {    
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public long getUserID() {
        return userID;
    }
    public void setUserID(long userID) {
        this.userID = userID;
    }  
}
