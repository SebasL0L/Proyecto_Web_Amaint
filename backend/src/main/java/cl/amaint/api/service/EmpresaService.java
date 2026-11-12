
package cl.amaint.api.service;

import cl.amaint.api.entity.Empresa;
import cl.amaint.api.repository.EmpresaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public EmpresaService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @Transactional(readOnly = true)
    public List<Empresa> listarTodas() {
        return empresaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Empresa buscarPorId(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Empresa no encontrada"
                ));
    }

    public Empresa crear(Empresa empresa) {

        if (empresaRepository.existsByRut(empresa.getRut())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ya existe una empresa con ese RUT"
            );
        }

        empresa.setActivo(true);

        return empresaRepository.save(empresa);
    }

    public Empresa actualizar(Long id, Empresa datos) {

        Empresa empresa = buscarPorId(id);

        if (empresaRepository.existsByRutAndIdNot(
                datos.getRut(), id)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El RUT pertenece a otra empresa"
            );
        }

        empresa.setRazonSocial(datos.getRazonSocial());
        empresa.setNombreComercial(datos.getNombreComercial());
        empresa.setRut(datos.getRut());

        return empresaRepository.save(empresa);
    }

    public void eliminar(Long id) {
        Empresa empresa = buscarPorId(id);
        empresaRepository.delete(empresa);
    }

    public Empresa cambiarEstado(Long id, Boolean activo) {
        Empresa empresa = buscarPorId(id);
        empresa.setActivo(activo);
        return empresaRepository.save(empresa);
    }
}
