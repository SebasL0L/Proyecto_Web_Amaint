
package cl.amaint.api.controller;

import cl.amaint.api.entity.Empresa;
import cl.amaint.api.entity.Planta;
import cl.amaint.api.service.EmpresaService;
import cl.amaint.api.service.PlantaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantas")
@CrossOrigin(origins = "http://localhost:5173")
public class PlantaController {

    private final PlantaService plantaService;
    private final EmpresaService empresaService;

    public PlantaController(
            PlantaService plantaService,
            EmpresaService empresaService) {
        this.plantaService = plantaService;
        this.empresaService = empresaService;
    }

    @GetMapping
    public ResponseEntity<List<Planta>> listarTodas() {
        return ResponseEntity.ok(plantaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planta> buscarPorId(
            @PathVariable Long id) {
        return ResponseEntity.ok(plantaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Planta> crear(
            @Valid @RequestBody Planta planta) {

        Empresa empresa = empresaService.buscarPorId(
                planta.getEmpresa().getId()
        );

        planta.setEmpresa(empresa);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(plantaService.guardar(planta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        plantaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
