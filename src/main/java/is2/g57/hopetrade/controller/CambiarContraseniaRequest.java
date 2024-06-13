package is2.g57.hopetrade.controller;

public class CambiarContraseniaRequest {
    private Long id;
    private String antiguaContrasenia;
    private String nuevaContrasenia;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

