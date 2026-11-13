
package cl.amaint.api.controller;

import cl.amaint.api.entity.Empresa;
import cl.amaint.api.service.EmpresaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    public ResponseEntity<List<Empresa>> listarTodas() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                empresaService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<Empresa> crear(
            @Valid @RequestBody Empresa empresa) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(empresaService.crear(empresa));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Empresa empresa) {

        return ResponseEntity.ok(
                empresaService.actualizar(id, empresa)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Empresa> cambiarEstado(
            @PathVariable Long id,
            @RequestBody EstadoRequest request) {

        return ResponseEntity.ok(
                empresaService.cambiarEstado(
                        id, request.activo()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        empresaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    public record EstadoRequest(Boolean activo) {
    }
}
