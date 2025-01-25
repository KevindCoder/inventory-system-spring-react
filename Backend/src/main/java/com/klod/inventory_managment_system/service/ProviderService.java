package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import java.util.List;

public interface ProviderService {
    ProviderDTO getProviderById(Long id);
    ProviderDTO saveProvider(ProviderDTO providerDTO);
    ProviderDTO updateProvider(Long id, ProviderDTO providerDTO);
    List<ProviderDTO> getAllProviders();
    void deleteProviderById(Long id);
}