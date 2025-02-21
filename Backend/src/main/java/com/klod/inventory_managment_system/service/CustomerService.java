package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    CustomerDTO getCustomerById(Long id);

    CustomerDTO saveCustomer(CustomerDTO customerDTO);

    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    void deleteCustomerById(Long id);
}