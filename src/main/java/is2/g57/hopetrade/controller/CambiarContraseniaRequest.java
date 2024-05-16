package is2.g57.hopetrade.controller;

public class CambiarContraseniaRequest {
    private String dni;
    private String antiguaContrasenia;
    private String nuevaContrasenia;

    // Getters y setters

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getAntiguaContrasenia() {
        return antiguaContrasenia;
    }

    public void setAntiguaContrasenia(String antiguaContrasenia) {
        this.antiguaContrasenia = antiguaContrasenia;
    }

    public String getNuevaContrasenia() {
        return nuevaContrasenia;
    }

    public void setNuevaContrasenia(String nuevaContrasenia) {
        this.nuevaContrasenia = nuevaContrasenia;
    }
}

