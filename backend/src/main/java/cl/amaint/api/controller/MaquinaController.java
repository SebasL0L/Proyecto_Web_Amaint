
package cl.amaint.api.controller;

import cl.amaint.api.entity.Linea;
import cl.amaint.api.entity.Maquina;
import cl.amaint.api.service.LineaService;
import cl.amaint.api.service.MaquinaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/maquinas")
@CrossOrigin(origins = "http://localhost:5173")
public class MaquinaController {

    private final MaquinaService maquinaService;
    private final LineaService lineaService;

    public MaquinaController(
            MaquinaService maquinaService,
            LineaService lineaService) {
        this.maquinaService = maquinaService;
        this.lineaService = lineaService;
    }

    @GetMapping
    public ResponseEntity<List<Maquina>> listarTodas() {
        return ResponseEntity.ok(maquinaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Maquina> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(maquinaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Maquina> crear(
            @Valid @RequestBody Maquina maquina) {

        if (maquina.getLinea() == null ||
                maquina.getLinea().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una línea"
            );
        }

        Linea linea = lineaService.buscarPorId(
                maquina.getLinea().getId()
        );

        maquina.setLinea(linea);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(maquinaService.guardar(maquina));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Maquina> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Maquina datos) {

        Maquina maquina = maquinaService.buscarPorId(id);

        if (datos.getLinea() == null ||
                datos.getLinea().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una línea"
            );
        }

        Linea linea = lineaService.buscarPorId(
                datos.getLinea().getId()
        );

        maquina.setNombre(datos.getNombre());
        maquina.setLinea(linea);

        if (datos.getActivo() != null) {
            maquina.setActivo(datos.getActivo());
        }

        return ResponseEntity.ok(maquinaService.guardar(maquina));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Maquina> cambiarEstado(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> datos) {

        Boolean activo = datos.get("activo");

        if (activo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar el estado activo"
            );
        }

        Maquina maquina = maquinaService.buscarPorId(id);
        maquina.setActivo(activo);

        return ResponseEntity.ok(maquinaService.guardar(maquina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        maquinaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
