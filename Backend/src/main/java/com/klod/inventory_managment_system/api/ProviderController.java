package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import com.klod.inventory_managment_system.service.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/providers")
public class ProviderController {

    private final ProviderService providerService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProviderDTO> getProviderById(@PathVariable Long id) {
        ProviderDTO providerDTO = providerService.getProviderById(id);
        return ResponseEntity.ok(providerDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProviderDTO>> getAllProviders() {
        List<ProviderDTO> providers = providerService.getAllProviders();
        return ResponseEntity.ok(providers);
    }

    @PostMapping
    public ResponseEntity<Void> saveProvider(@RequestBody ProviderDTO providerDTO) {
        providerService.saveProvider(providerDTO);
        return ResponseEntity.status(201).build(); // 201 Created
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteProviderById(@PathVariable Long id) {
        providerService.deleteProviderById(id);
        return ResponseEntity.status(204).build(); // 204 No Content
    }
}