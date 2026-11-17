
package cl.amaint.api.service;

import cl.amaint.api.entity.Planta;
import cl.amaint.api.repository.PlantaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PlantaService {

    private final PlantaRepository plantaRepository;

    public PlantaService(PlantaRepository plantaRepository) {
        this.plantaRepository = plantaRepository;
    }

    public List<Planta> listarTodas() {
        return plantaRepository.findAll();
    }

    public Planta buscarPorId(Long id) {
        return plantaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Planta no encontrada"
                ));
    }

    public Planta guardar(Planta planta) {
        return plantaRepository.save(planta);
    }

    public void eliminar(Long id) {
        Planta planta = buscarPorId(id);
        plantaRepository.delete(planta);
    }
}
