package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.UserDTO;
import com.klod.inventory_managment_system.model.dto.request.UserRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserDTO getUserById(Long id);

    UserDTO saveUser(UserRequestDTO userDTO);

    UserDTO updateUser(Long userId, UserRequestDTO userDTO);

    List<UserDTO> getAllUsers();

    void deleteUserById(Long id);

    UserDTO getUserByUsername(String username);
}
