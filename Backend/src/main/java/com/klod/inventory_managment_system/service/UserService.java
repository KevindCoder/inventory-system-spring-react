package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserDTO getUserById(Integer id);

    void saveUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    void deleteUserById(Integer id);
}
