package is2.g57.hopetrade.services;

import is2.g57.hopetrade.entity.Ayudante;
import is2.g57.hopetrade.entity.Intercambio;
import is2.g57.hopetrade.entity.Oferta;

import is2.g57.hopetrade.entity.RespuestaComentario;

import is2.g57.hopetrade.entity.Publicacion;

import is2.g57.hopetrade.entity.User;
import is2.g57.hopetrade.repository.PublicacionRepository;
import is2.g57.hopetrade.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Async
public class MailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PublicacionRepository publicacionRepository;

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
		Optional<User> userOp = this.userRepository.findById(oferta.getPublicacion().getUser().getId());
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

	@Async
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

	@Async
	public void sendEmailOfertaAceptada(Oferta oferta) {
		String subject = "Oferta aceptada";
		String text = "Hola " + oferta.getUser().getNombre() + ",\n\n"
				+ "Te informamos que tu oferta fue aceptada, a continacion esta el detalle del intercambio" + "\n"
				+ "Horario: " + oferta.getFechaIntercambio() + "\n" + "Filial: " + oferta.getFilial().getNombre() + "\n"
				+ "Direccion: " + oferta.getFilial().getDireccion() + "\n\n" + "Saludos";

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(oferta.getUser().getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
		this.sendEmailOfertaAceptada2(oferta);
	}

	@Async
	private void sendEmailOfertaAceptada2(Oferta oferta) {
		Optional<User> userOp = userRepository.findById(oferta.getPublicacion().getUser().getId());
		if (userOp.isPresent()) {
			User user = userOp.get();
			String subject = "Intercambio programado";
			String text = "Hola " + user.getNombre() + ",\n\n" + "Te informamos que los detalles del intercambio:"
					+ "\n" + "Horario: " + oferta.getFechaIntercambio() + "\n" + "Filial: "
					+ oferta.getFilial().getNombre() + "\n" + "Direccion: " + oferta.getFilial().getDireccion() + "\n\n"
					+ "Saludos";

			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(user.getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);

		}
	}

	@Async
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

	@Async
	public void sendEmailIntercambioCancelado(Intercambio intercambio, String motivo) {
		String subject = "Intercambio cancelado";
		User user1 = intercambio.getOferta().getUser();
		User user2 = intercambio.getPublicacion().getUser();
		String text = "Hola " + user1.getNombre() + ",\n\n"
				+ "Te informamos que tu intercambio con el usuario: " + user2.getFullName() 
				+ ", programado para el dia " + intercambio.getOferta().getFechaIntercambio().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
				+ " en la filial " + intercambio.getOferta().getFilial().getNombre()
				+ ", fue cancelado."
				+ "\n" + "Motivo: " + motivo
				+ "\n\n" + "Saludos.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user1.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);

		message.setTo(user2.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);

	}
	
	@Async
	public void sendEmailAyudanteBaja (Ayudante ayudante) {
		String subject = "Cuenta dada de baja";
		String text = "Hola " + ayudante.getNombre() + ",\n\n"
				+ "Te informamos que tu cuenta de ayudante fue dada de baja" + ",\n"
				+ "gracias por colaborar con el equipo de hopetrade" + ",\n\n"
				+ "Saludos.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(ayudante.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	@Async
	public void sendEmailUsuarioBaja(User user,String motivo) {
		String subject = "Cuenta suspendida";
		String text = "Hola " + user.getNombre() + ",\n\n"
				+ "Te informamos que tu cuenta fue suspendida" + ",\n"
				+ "Motivo: " + motivo + ".\n\n"
				+ "Saludos.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	@Async
	public void SentEmailRespuestaRecibida(RespuestaComentario nuevaRespuesta) {
		String subject = "Respuesta recibida";
		Optional<User> userOp = this.userRepository.findById(nuevaRespuesta.getComentario().getUserId());
		Optional<Publicacion> publicacionOp = this.publicacionRepository.findById(nuevaRespuesta.getComentario().getPublicacion().getId());
		if (userOp.isPresent() && publicacionOp.isPresent()) {
			Publicacion publicacion = publicacionOp.get();
			User comentarioOriginalUser = userOp.get();
			String text = "Hola " + comentarioOriginalUser.getNombre() + ",\n\n"
					+ "Te informamos que tu comentario en la publicacion " + publicacion.getTitulo() + ",\n\n"
					+ "Recibio una respuesta del propietario";
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(comentarioOriginalUser.getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);
		}
	}
		
		
	
	@Async
	public void sendEmailComentarioRecibido(User user, Publicacion publicacion) {
		String subject = "Comentario recibido";
		Optional<User> userOp = this.userRepository.findById(publicacion.getUser().getId());
		if (userOp.isPresent()) {
			User publicacionUser = userOp.get();
		String text = "Hola " + publicacionUser.getNombre()  + ",\n\n"
				+ "Te informamos que recibiste un comentario de " + user.getFullName()  + ",\n"
				+ "Para tu publicacion " + publicacion.getTitulo();
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(publicacionUser.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
		}
	}

	@Async
	public void sendEmailAlta(Ayudante ayudante) {
		String subject = "Cuenta dada de alta";
		String text = "Hola " + ayudante.getNombre() + ",\n\n"
				+ "Te informamos que tu cuenta de ayudante fue dada de alta" + ",\n"
				+ "Bienvenido nuevamente al equipo de hopetrade" + ",\n\n"
				+ "Saludos.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(ayudante.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
		
	}

	@Async
	public void sendEmailPublicacionEliminada(Publicacion publicacion, String motivo) {
		String subject = "Publicacion eliminada";
		String text = "Hola " + publicacion.getUser().getNombre() + ",\n\n"
				+ "Te informamos que tu publicacion fue eliminada" + ",\n"
				+ "Motivo: " + motivo + ".\n\n"
				+ "Saludos.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(publicacion.getUser().getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
	}

	@Async
	public void sendEmailPublicacionEliminada2(List<Oferta> ofertas) {
		String subject = "Oferta rechazada";
		for (Oferta of : ofertas) {
			String text = "Hola " + of.getUser().getNombre() + ",\n\n"
					+ "Te informamos que tu oferta fue rechazada automaticamente, debido a que la publicacion: "
					+ of.getPublicacion().getTitulo() + " fue eliminada." + "\n\n" + "Saludos";
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(of.getUser().getEmail());
			message.setSubject(subject);
			message.setText(text);
			mailSender.send(message);
		}
	}

    public void sendEmailIntercambioRealizado(Intercambio intercambio) {
        User user1 = intercambio.getOferta().getUser();
		User user2 = intercambio.getPublicacion().getUser();

		String subject = "Intercambio realizado";
		String text = "Hola " + user1.getNombre() + ",\n\n"
				+ "Te informamos que el intercambio de '" + intercambio.getPublicacion().getTitulo() + "' por '" + intercambio.getOferta().getTitulo() 
				+ "' que realizaste fue confirmado por nuestro equipo." + ",\n"
				+ "A partir de ahora vas a poder puntuar al propietario de la publicacion en nuestro sitio." + "\n\n"
				+ "Saludos, el equipo de Hopetrade.";
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user1.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);

		subject = "Intercambio realizado";
		text = "Hola " + user2.getNombre() + ",\n\n"
				+ "Te informamos que el intercambio de '" + intercambio.getPublicacion().getTitulo() + "' por '" + intercambio.getOferta().getTitulo() 
				+ "' que realizaste fue confirmado por nuestro equipo." + ",\n"
				+ "A partir de ahora vas a poder puntuar al usuario que hizo la oferta en nuestro sitio." + "\n\n"
				+ "Saludos, el equipo de Hopetrade.";
		message = new SimpleMailMessage();
		message.setTo(user2.getEmail());
		message.setSubject(subject);
		message.setText(text);
		mailSender.send(message);
    }
	
}
