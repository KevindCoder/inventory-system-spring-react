package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.CustomerMapper;
import com.klod.inventory_managment_system.model.dto.CustomerDTO;
import com.klod.inventory_managment_system.model.entity.CustomerEntity;
import com.klod.inventory_managment_system.repository.CustomerRepository;
import com.klod.inventory_managment_system.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerDTO getCustomerById(Long id) {
        log.info("Attempting to retrieve customer by id: {}", id);
        CustomerEntity customerEntity = customerRepository.findById(id).orElseThrow();
        return customerMapper.customerToCustomerDto(customerEntity);
    }

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        log.info("Saving customer: {}", customerDTO);
        CustomerEntity customerEntity = customerMapper.customerDtoToCustomer(customerDTO);
        customerRepository.save(customerEntity);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        log.info("Retrieving all customers");
        List<CustomerEntity> customerEntities = customerRepository.findAll();
        return customerMapper.customerEntitiesToCustomerDTOs(customerEntities);
    }

    @Override
    public void deleteCustomerById(Long id) {
        customerRepository.deleteById(id);
    }
}