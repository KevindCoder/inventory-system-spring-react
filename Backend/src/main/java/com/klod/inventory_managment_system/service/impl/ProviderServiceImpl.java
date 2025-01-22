package com.klod.inventory_managment_system.service.impl;

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
        ProviderEntity providerEntity = providerRepository.findById(id).orElseThrow();
        return providerMapper.providerToProviderDto(providerEntity);
    }

    @Override
    public void saveProvider(ProviderDTO providerDTO) {
        log.info("Saving provider: {}", providerDTO);
        ProviderEntity providerEntity = providerMapper.providerDtoToProvider(providerDTO);
        providerRepository.save(providerEntity);
    }

    @Override
    public List<ProviderDTO> getAllProviders() {
        log.info("Retrieving all providers");
        List<ProviderEntity> providerEntities = providerRepository.findAll();
        return providerMapper.providerEntitiesToProviderDTOs(providerEntities);
    }

    @Override
    public void deleteProviderById(Long id) {
        providerRepository.deleteById(id);
    }
}