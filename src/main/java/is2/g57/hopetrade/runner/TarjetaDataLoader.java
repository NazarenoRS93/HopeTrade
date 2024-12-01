package is2.g57.hopetrade.runner;

import java.util.Arrays;
import java.util.List;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import is2.g57.hopetrade.entity.Tarjeta;
import is2.g57.hopetrade.repository.TarjetaRepository;

@Component
@Order(8)
public class TarjetaDataLoader implements ApplicationRunner {
    @Autowired 
    private TarjetaRepository tarjetaRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<String[]> tarjetas = Arrays.asList(
            new String[]{"1111111111111111", "Lautaro Jaime", "2025-08-01", "44785886", "111", "10000", "1"},
            new String[]{"1111111111111110", "Facundo Rojas", "2027-04-01", "35797596", "112", "50000", "1"},
            new String[]{"1111111111111112", "Medina Cristian", "2027-10-01", "36302331", "444", "100000", "0"},
            new String[]{"1111111111111113", "Brey Leandro", "2024-05-01", "44788555", "555", "15000", "1"},
            new String[]{"1111111111111114", "Zeballos Exequiel", "2029-12-01", "44222331", "213", "200000", "1"},
            new String[]{"1111111111111115", "Donante Usuario", "2026-10-01", "38888654", "876", "10000", "1"},
            new String[]{"1111111111111116", "Aguirre Brian", "2026-09-01", "36777888", "765", "11000", "1"},
            new String[]{"1111111111111117", "Zenón Kevin", "2026-12-01", "35666777", "324", "12000", "1"}
        );

        System.out.println("---------     Intentando cargar tarjetas       --------");
        // 	public Tarjeta(String numero, String nombre_titular, Date fecha_vencimiento, String dni_titular, String codigo, Double saldo_disponible, Boolean activa)
        if  (tarjetaRepository.count() == 0) {
            for (String[] tarj: tarjetas) {
                String numero = tarj[0];
                String nombre_titular = tarj[1];
                Date fecha_vencimiento = Date.valueOf(tarj[2]);
                String dni_titular = tarj[3];
                String codigo = tarj[4];
                Double saldo_disponible = Double.parseDouble(tarj[5]);
                Boolean activa = (tarj[6] == "1");
                System.out.println("Cargando tarjeta: " + numero);
                tarjetaRepository.save(new Tarjeta(numero, nombre_titular, fecha_vencimiento, dni_titular, codigo, saldo_disponible, activa));
            }
        }
        else {
            System.out.println("Tarjetas ya existen. Para permitir la carga inicial, elimine todos los registros de la tabla en la BD.");
        }
    }
}
