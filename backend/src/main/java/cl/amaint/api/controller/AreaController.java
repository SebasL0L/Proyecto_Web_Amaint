
package cl.amaint.api.controller;

import cl.amaint.api.entity.Area;
import cl.amaint.api.entity.Planta;
import cl.amaint.api.service.AreaService;
import cl.amaint.api.service.PlantaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = "http://localhost:5173")
public class AreaController {

    private final AreaService areaService;
    private final PlantaService plantaService;

    public AreaController(
            AreaService areaService,
            PlantaService plantaService) {
        this.areaService = areaService;
        this.plantaService = plantaService;
    }

    @GetMapping
    public ResponseEntity<List<Area>> listarTodas() {
        return ResponseEntity.ok(areaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Area> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(areaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Area> crear(
            @Valid @RequestBody Area area) {

        if (area.getPlanta() == null ||
                area.getPlanta().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una planta"
            );
        }

        Planta planta = plantaService.buscarPorId(
                area.getPlanta().getId()
        );

        area.setPlanta(planta);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(areaService.guardar(area));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Area> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Area datos) {

        Area area = areaService.buscarPorId(id);

        if (datos.getPlanta() == null ||
                datos.getPlanta().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una planta"
            );
        }

        Planta planta = plantaService.buscarPorId(
                datos.getPlanta().getId()
        );

        area.setNombre(datos.getNombre());
        area.setPlanta(planta);

        if (datos.getActivo() != null) {
            area.setActivo(datos.getActivo());
        }

        return ResponseEntity.ok(areaService.guardar(area));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Area> cambiarEstado(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> datos) {

        Boolean activo = datos.get("activo");

        if (activo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar el estado activo"
            );
        }

        Area area = areaService.buscarPorId(id);
        area.setActivo(activo);

        return ResponseEntity.ok(areaService.guardar(area));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        areaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
