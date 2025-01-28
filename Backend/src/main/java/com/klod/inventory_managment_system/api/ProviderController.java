package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import com.klod.inventory_managment_system.service.ProviderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/providers")
@Validated
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
    public ResponseEntity<ProviderDTO> saveProvider(@Valid @RequestBody ProviderDTO providerDTO) {
        ProviderDTO response = providerService.saveProvider(providerDTO);
        return ResponseEntity.status(201).body(response); // 201 Created
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProviderDTO> updateProvider(@PathVariable Long id, @Valid @RequestBody ProviderDTO providerDTO) {
        ProviderDTO response = providerService.updateProvider(id, providerDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteProviderById(@PathVariable Long id) {
        providerService.deleteProviderById(id);
        return ResponseEntity.status(204).build(); // 204 No Content
    }
}