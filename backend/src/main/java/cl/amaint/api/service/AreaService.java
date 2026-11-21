
package cl.amaint.api.service;

import cl.amaint.api.entity.Area;
import cl.amaint.api.repository.AreaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AreaService {

    private final AreaRepository areaRepository;

    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    public List<Area> listarTodas() {
        return areaRepository.findAll();
    }

    public Area buscarPorId(Long id) {
        return areaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Área no encontrada"
                ));
    }

    public Area guardar(Area area) {
        return areaRepository.save(area);
    }

    public void eliminar(Long id) {
        Area area = buscarPorId(id);
        areaRepository.delete(area);
    }
}
