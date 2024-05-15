package is2.g57.hopetrade.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import is2.g57.hopetrade.entity.Filial;
import is2.g57.hopetrade.service.FilialService;




@RequestMapping("/filial")
public class FilialController {

	@Autowired
	private FilialService filialService;

	@GetMapping("/{id}")
	public ResponseEntity<Filial> ObtenerFilialPorId(@PathVariable Long id){
		Optional<Filial> filialOp = this.filialService.findById(id);
		if (filialOp.isPresent()) {
			return new ResponseEntity<>(filialOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	
}
	
	@GetMapping("/{direccion}")
	public ResponseEntity<Filial> ObtenerFilialPorDireccion(@PathVariable String direccion) {
		Optional<Filial> filialOp = this.filialService.findByDireccion(direccion);
		if (filialOp.isPresent()) {
			return new ResponseEntity<>(filialOp.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/{filial}")
	public ResponseEntity<?> GuardarFilial(String nombre, String direccion, String email) {
		try {
			Filial filial = new Filial(nombre,direccion,email);
			this.filialService.save(filial);
			return new ResponseEntity<>("Filial registrada", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("La direccion ya pertenece a otra filial", HttpStatus.BAD_REQUEST);
		}
		
		
	}
	
}			