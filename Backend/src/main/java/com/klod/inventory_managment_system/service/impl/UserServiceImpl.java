package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityAlreadyExistsException;
import com.klod.inventory_managment_system.exception.EntityNotFoundException;
import com.klod.inventory_managment_system.mapper.UserMapper;
import com.klod.inventory_managment_system.model.dto.UserDTO;
import com.klod.inventory_managment_system.model.dto.UserRequestDTO;
import com.klod.inventory_managment_system.model.entity.UserEntity;
import com.klod.inventory_managment_system.repository.UserRepository;
import com.klod.inventory_managment_system.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO getUserById(Long id) {
        log.info("Attempting to retrieve user by id: {}", id);
        UserEntity userEntity = getUserEntityById(id);

        return userMapper.mapToDTO(userEntity);
    }

    @Override
    public UserDTO saveUser(UserRequestDTO userDTO) {
        log.info("Saving user: {}", userDTO);
        userRepository.findByUsernameOrEmail(userDTO.getUsername(), userDTO.getEmail())
                .ifPresent(user -> {
                    throw new EntityAlreadyExistsException("User already exists with email or username.");
                });
        UserEntity userEntity = userMapper.mapToEntity(userDTO);
        userEntity.setPasswordHash(encryptPassword(userDTO.getPassword()));
        userEntity = userRepository.save(userEntity);
        return userMapper.mapToDTO(userEntity);
    }

    @Override
    public UserDTO updateUser(Long id, UserRequestDTO userDTO) {
        log.info("Updating user with id: {}", id);
        UserEntity userEntity = getUserEntityById(id);
        userMapper.updateEntity(userEntity, userDTO);
        userEntity.setPasswordHash(encryptPassword(userDTO.getPassword()));
        userEntity = userRepository.save(userEntity);
        return userMapper.mapToDTO(userEntity);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        log.info("Retrieving all users");
        List<UserEntity> userEntities = userRepository.findAll();
        return userMapper.mapToListDTO(userEntities);
    }

    @Override
    public void deleteUserById(Long id) {
        log.info("Deleting user by id: {}", id);
        UserEntity userEntity = getUserEntityById(id);
        userRepository.delete(userEntity);
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        log.info("Retrieving user by username: {}", username);
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
        return userMapper.mapToDTO(userEntity);
    }

    private UserEntity getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
