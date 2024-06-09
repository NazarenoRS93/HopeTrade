package is2.g57.hopetrade.services;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.Oferta;
import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UserRepository userRepository;

	@Async
	public void sendEmail(Ayudante ayudante) {
		String subject = "Registro Exitoso";
		String text = "Hola " + ayudante.getNombre() + ",\n\n"
				+ "Te damos la bienvenida como ayudante de Caritas La Plata.\n" + "Tu usuario es: "
				+ ayudante.getEmail() + "\n" + "Tu contraseña: " + ayudante.getPass() + "\n\n" + "Saludos,\n"
				+ "Y bienvenido al equipo de HopeTrade";

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(ayudante.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	@Async
	public void sendEmailOfertaRecibida(Oferta oferta) {
		Optional<User> userOp = this.userRepository.findById(oferta.getPublicacion().getUserID());
		if (userOp.isPresent()) {
			User user = userOp.get();
			String subject = "Oferta recibida";
			String text = "Hola " + user.getNombre() + ",\n\n" + "Te informamos que recibiste una oferta de: "
					+ oferta.getUser().getNombre() + "\n" + "Para tu publicacion: "
					+ oferta.getPublicacion().getTitulo() + "\n\n" + "Saludos";

			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(user.getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);
		}
	}

	public void sendEmailOfertaRechazada(Oferta oferta) {

		String subject = "Oferta rechazada";
		String text = "Hola " + oferta.getUser().getNombre() + ",\n\n" + "Te informamos que tu oferta para la publicacion: " + oferta.getPublicacion().getTitulo() +" fue rechazada"
				+ "\n" + "Motivo: " + oferta.getRespuesta() + "\n\n" + "Saludos";

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(oferta.getUser().getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	public void sendEmailOfertaAceptada(Oferta oferta) {
		String subject = "Oferta aceptada";
		String text = "Hola " + oferta.getUser().getNombre() + ",\n\n"
				+ "Te informamos que tu oferta fue aceptada, a continacion esta el detalle del intercambio" + "\n"
				+ "Horario: " + oferta.getFechaIntercambio() + "\n" + "Filial: " + oferta.getFilial().getNombre() + "\n"
				+ "Direccion" + oferta.getFilial().getDireccion() + "\n\n" + "Saludos";

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(oferta.getUser().getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
		this.sendEmailOfertaAceptada2(oferta);
	}

	private void sendEmailOfertaAceptada2(Oferta oferta) {
		Optional<User> userOp = userRepository.findById(oferta.getPublicacion().getUserID());
		if (userOp.isPresent()) {
			User user = userOp.get();
			String subject = "Intercambio programado";
			String text = "Hola " + user.getNombre() + ",\n\n" + "Te informamos que los detalles del intercambio:"
					+ "\n" + "Horario: " + oferta.getFechaIntercambio() + "\n" + "Filial: "
					+ oferta.getFilial().getNombre() + "\n" + "Direccion" + oferta.getFilial().getDireccion() + "\n\n"
					+ "Saludos";

			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(user.getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);

		}
	}

	public void sendEmailIntercambioRealizado(List<Oferta> ofertas) {
		String subject = "Oferta rechazada";
		for (Oferta of : ofertas) {
			String text = "Hola " + of.getUser().getNombre() + ",\n\n"
					+ "Te informamos que tu oferta fue rechazada automaticamente, debido a que la publicacion: "
					+ of.getPublicacion().getTitulo() + " ya fue intercambiada" + "\n\n" + "Saludos";
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(of.getUser().getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);
		}

	}
}
