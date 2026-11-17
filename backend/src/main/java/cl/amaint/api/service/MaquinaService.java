
package cl.amaint.api.service;

import cl.amaint.api.entity.Maquina;
import cl.amaint.api.repository.MaquinaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MaquinaService {

    private final MaquinaRepository maquinaRepository;

    public MaquinaService(MaquinaRepository maquinaRepository) {
        this.maquinaRepository = maquinaRepository;
    }

    public List<Maquina> listarTodas() {
        return maquinaRepository.findAll();
    }

    public Maquina buscarPorId(Long id) {
        return maquinaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Máquina no encontrada"
                ));
    }

    public Maquina guardar(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

    public void eliminar(Long id) {
        Maquina maquina = buscarPorId(id);
        maquinaRepository.delete(maquina);
    }
}
