
package cl.amaint.api.service;

import cl.amaint.api.entity.Linea;
import cl.amaint.api.repository.LineaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LineaService {

    private final LineaRepository lineaRepository;

    public LineaService(LineaRepository lineaRepository) {
        this.lineaRepository = lineaRepository;
    }

    public List<Linea> listarTodas() {
        return lineaRepository.findAll();
    }

    public Linea buscarPorId(Long id) {
        return lineaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Línea no encontrada"
                ));
    }

    public Linea guardar(Linea linea) {
        return lineaRepository.save(linea);
    }

    public void eliminar(Long id) {
        Linea linea = buscarPorId(id);
        lineaRepository.delete(linea);
    }
}
