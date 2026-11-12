
package cl.amaint.api.repository;

import cl.amaint.api.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresaRepository
        extends JpaRepository<Empresa, Long> {

    boolean existsByRut(String rut);

    boolean existsByRutAndIdNot(String rut, Long id);

    Optional<Empresa> findByRut(String rut);
}
