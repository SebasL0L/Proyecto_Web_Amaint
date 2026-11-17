
package cl.amaint.api.service;

import cl.amaint.api.entity.Componente;
import cl.amaint.api.repository.ComponenteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ComponenteService {

    private final ComponenteRepository componenteRepository;

    public ComponenteService(ComponenteRepository componenteRepository) {
        this.componenteRepository = componenteRepository;
    }

    public List<Componente> listarTodas() {
        return componenteRepository.findAll();
    }

    public Componente buscarPorId(Long id) {
        return componenteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Componente no encontrado"
                ));
    }

    public Componente guardar(Componente componente) {
        return componenteRepository.save(componente);
    }

    public void eliminar(Long id) {
        Componente componente = buscarPorId(id);
        componenteRepository.delete(componente);
    }
}
