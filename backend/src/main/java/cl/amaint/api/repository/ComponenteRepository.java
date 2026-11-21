package cl.amaint.api.repository;

import cl.amaint.api.entity.Componente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComponenteRepository extends JpaRepository<Componente, Long> {
}