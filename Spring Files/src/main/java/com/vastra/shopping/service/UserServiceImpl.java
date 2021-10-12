package com.vastra.shopping.service;

import com.vastra.shopping.exceptions.UserAlreadyExistsException;
import com.vastra.shopping.exceptions.UserNotFoundException;
import com.vastra.shopping.model.User;
import com.vastra.shopping.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User addNewUser(User user) {
        try {
            if(user.getFirstName() != null || user.getLastName() !=null) {
                user.setRole("Employee");
                user.setPassword("12345678");
            }
            if(user.getImageUrl() == null)
                user.setImageUrl("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");
            if(user.getRole() == null)
                user.setRole("User");
            return this.userRepository.save(user);
        }catch (Exception e){
            try {
                throw new UserAlreadyExistsException("User Email Already Exists");
            } catch (UserAlreadyExistsException userAlreadyExistsException) {
                userAlreadyExistsException.printStackTrace();
            }

        }
        return null;
    }

    public User findUserById(Long id) throws UserNotFoundException {
        return this.userRepository.findUserById(id).orElseThrow(() -> new UserNotFoundException("User By id "+id+" was not found"));
    }

    @Override
    public List<User> getAllCustomers(String role) throws UserNotFoundException {
        return this.userRepository.findUsersByRole(role).orElseThrow(()->new UserNotFoundException("Given User role "+role+" was notfound"));
    }

    @Override
    public User loginUser(String email,String password) {
        return this.userRepository.findByEmailAndPassword(email,password);
    }

    @Override
    public User updateUser(User user){
        return this.userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id){
        this.userRepository.deleteById(id);
    }


}
