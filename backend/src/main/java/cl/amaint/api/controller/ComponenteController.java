
package cl.amaint.api.controller;

import cl.amaint.api.entity.Componente;
import cl.amaint.api.entity.Maquina;
import cl.amaint.api.service.ComponenteService;
import cl.amaint.api.service.MaquinaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "http://localhost:5173")
public class ComponenteController {

    private final ComponenteService componenteService;
    private final MaquinaService maquinaService;

    public ComponenteController(
            ComponenteService componenteService,
            MaquinaService maquinaService) {
        this.componenteService = componenteService;
        this.maquinaService = maquinaService;
    }

    @GetMapping
    public ResponseEntity<List<Componente>> listarTodas() {
        return ResponseEntity.ok(componenteService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Componente> buscarPorId(
            @PathVariable Long id) {
        return ResponseEntity.ok(componenteService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Componente> crear(
            @Valid @RequestBody Componente componente) {

        if (componente.getMaquina() == null ||
                componente.getMaquina().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una máquina"
            );
        }

        Maquina maquina = maquinaService.buscarPorId(
                componente.getMaquina().getId()
        );

        componente.setMaquina(maquina);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(componenteService.guardar(componente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Componente> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Componente datos) {

        Componente componente = componenteService.buscarPorId(id);

        if (datos.getMaquina() == null ||
                datos.getMaquina().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar una máquina"
            );
        }

        Maquina maquina = maquinaService.buscarPorId(
                datos.getMaquina().getId()
        );

        componente.setNombre(datos.getNombre());
        componente.setMaquina(maquina);

        if (datos.getActivo() != null) {
            componente.setActivo(datos.getActivo());
        }

        return ResponseEntity.ok(
                componenteService.guardar(componente)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Componente> cambiarEstado(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> datos) {

        Boolean activo = datos.get("activo");

        if (activo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe indicar el estado activo"
            );
        }

        Componente componente = componenteService.buscarPorId(id);
        componente.setActivo(activo);

        return ResponseEntity.ok(
                componenteService.guardar(componente)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        componenteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
