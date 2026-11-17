
package cl.amaint.api.controller;

import cl.amaint.api.entity.Area;
import cl.amaint.api.entity.Linea;
import cl.amaint.api.service.AreaService;
import cl.amaint.api.service.LineaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lineas")
@CrossOrigin(origins = "http://localhost:5173")
public class LineaController {

    private final LineaService lineaService;
    private final AreaService areaService;

    public LineaController(
            LineaService lineaService,
            AreaService areaService) {
        this.lineaService = lineaService;
        this.areaService = areaService;
    }

    @GetMapping
    public ResponseEntity<List<Linea>> listarTodas() {
        return ResponseEntity.ok(lineaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Linea> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(lineaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Linea> crear(
            @Valid @RequestBody Linea linea) {

        if (linea.getArea() == null ||
                linea.getArea().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar un área"
            );
        }

        Area area = areaService.buscarPorId(
                linea.getArea().getId()
        );

        linea.setArea(area);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(lineaService.guardar(linea));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Linea> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Linea datos) {

        Linea linea = lineaService.buscarPorId(id);

        if (datos.getArea() == null ||
                datos.getArea().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar un área"
            );
        }

        Area area = areaService.buscarPorId(
                datos.getArea().getId()
        );

        linea.setNombre(datos.getNombre());
        linea.setArea(area);

        if (datos.getActivo() != null) {
            linea.setActivo(datos.getActivo());
        }

        return ResponseEntity.ok(lineaService.guardar(linea));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Linea> cambiarEstado(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> datos) {

        Boolean activo = datos.get("activo");

        if (activo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar el estado activo"
            );
        }

        Linea linea = lineaService.buscarPorId(id);
        linea.setActivo(activo);

        return ResponseEntity.ok(lineaService.guardar(linea));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        lineaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
