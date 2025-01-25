package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityNotFoundException;
import com.klod.inventory_managment_system.mapper.ProviderMapper;
import com.klod.inventory_managment_system.model.dto.ProviderDTO;
import com.klod.inventory_managment_system.model.entity.ProviderEntity;
import com.klod.inventory_managment_system.repository.ProviderRepository;
import com.klod.inventory_managment_system.service.ProviderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProviderServiceImpl implements ProviderService {

    private final ProviderRepository providerRepository;
    private final ProviderMapper providerMapper;

    @Override
    public ProviderDTO getProviderById(Long id) {
        log.info("Attempting to retrieve provider by id: {}", id);
        ProviderEntity providerEntity = getProviderEntityById(id);
        return providerMapper.mapToDTO(providerEntity);
    }

    @Override
    public ProviderDTO saveProvider(ProviderDTO providerDTO) {
        log.info("Saving provider: {}", providerDTO);
        validateNameAvailable(providerDTO.getName());
        ProviderEntity providerEntity = providerMapper.mapToEntity(providerDTO);
        providerEntity = providerRepository.save(providerEntity);
        return providerMapper.mapToDTO(providerEntity);
    }

    @Override
    public ProviderDTO updateProvider(Long id, ProviderDTO providerDTO) {
        log.info("Updating provider with id: {}", id);
        ProviderEntity providerEntity = getProviderEntityById(id);
        if (!providerEntity.getName().equals(providerDTO.getName())) {
            validateNameAvailable(providerDTO.getName());
        }
        providerMapper.updateEntity(providerEntity, providerDTO);
        providerEntity = providerRepository.save(providerEntity);
        return providerMapper.mapToDTO(providerEntity);
    }

    @Override
    public List<ProviderDTO> getAllProviders() {
        log.info("Retrieving all providers");
        List<ProviderEntity> providerEntities = providerRepository.findAll();
        return providerMapper.mapToListDTO(providerEntities);
    }

    @Override
    public void deleteProviderById(Long id) {
        log.info("Deleting provider with id: {}", id);
        ProviderEntity providerEntity = getProviderEntityById(id);
        providerRepository.delete(providerEntity);
    }

    private ProviderEntity getProviderEntityById(Long id) {
        return providerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Provider not found with id: " + id));
    }

    private void validateNameAvailable(String name) {
        if (providerRepository.existsByName(name)) {
            throw new EntityNotFoundException("Provider with name: " + name + " already exists");
        }
    }
}