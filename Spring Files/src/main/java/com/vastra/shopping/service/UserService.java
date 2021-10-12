package com.vastra.shopping.service;

import com.vastra.shopping.exceptions.UserAlreadyExistsException;
import com.vastra.shopping.exceptions.UserNotFoundException;
import com.vastra.shopping.model.User;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();

    User addNewUser(User user) throws UserAlreadyExistsException;

    User updateUser(User user);

    void deleteUser(Long id);

    User findUserById(Long id) throws UserNotFoundException;


    List<User> getAllCustomers(String role) throws UserNotFoundException;

    User loginUser(String email,String password);
}
