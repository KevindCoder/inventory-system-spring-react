package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityAlreadyExistsException;
import com.klod.inventory_managment_system.exception.EntityNotFoundException;
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
        CustomerEntity customerEntity = getCustomerEntityById(id);
        return customerMapper.mapToDTO(customerEntity);
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        log.info("Saving customer: {}", customerDTO);
        validateEmailAvailable(customerDTO.getEmail());

        CustomerEntity customerEntity = customerMapper.mapToEntity(customerDTO);
        customerEntity = customerRepository.save(customerEntity);
        return customerMapper.mapToDTO(customerEntity);
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        log.info("Updating customer with id: {}", id);
        CustomerEntity customerEntity = getCustomerEntityById(id);
        if (!customerEntity.getEmail().equals(customerDTO.getEmail())) {
            validateEmailAvailable(customerDTO.getEmail());
        }
        customerMapper.updateEntity(customerEntity, customerDTO);
        customerEntity = customerRepository.save(customerEntity);
        return customerMapper.mapToDTO(customerEntity);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        log.info("Retrieving all customers");
        List<CustomerEntity> customerEntities = customerRepository.findAll();
        return customerMapper.mapToListDTO(customerEntities);
    }

    @Override
    public void deleteCustomerById(Long id) {
        log.info("Deleting customer by id: {}", id);
        CustomerEntity customerEntity = getCustomerEntityById(id);
        customerRepository.delete(customerEntity);
    }

    private CustomerEntity getCustomerEntityById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + id));
    }

    private void validateEmailAvailable(String email) {
        if (!customerRepository.existsByEmail(email)) {
            throw new EntityAlreadyExistsException("Customer with email: " + email + " already exists");
        }
    }
}