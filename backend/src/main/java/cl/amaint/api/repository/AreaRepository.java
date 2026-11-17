package cl.amaint.api.repository;

import cl.amaint.api.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepository extends JpaRepository<Area, Long> {
}