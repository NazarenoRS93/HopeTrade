package is2.g57.hopetrade.services;

import is2.g57.hopetrade.entity.Ayudante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(Ayudante ayudante) {
        String subject = "Registro Exitoso";
        String text = "Hola " + ayudante.getNombre() + ",\n\n" +
                "Te damos la bienvenida como ayudante de Caritas La Plata.\n" +
                "Tu usuario es: " + ayudante.getEmail() + "\n" +
                "Tu contraseña: " + ayudante.getPass() + "\n\n" +
                "Saludos,\n" +
                "Y bienvenido al equipo de HopeTrade";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(ayudante.getEmail());
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
