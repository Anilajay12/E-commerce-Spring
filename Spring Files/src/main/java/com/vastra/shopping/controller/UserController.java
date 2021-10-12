package com.vastra.shopping.controller;

import com.vastra.shopping.exceptions.UserAlreadyExistsException;
import com.vastra.shopping.exceptions.UserNotFoundException;
import com.vastra.shopping.model.User;
import com.vastra.shopping.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
public class UserController {

    private static final Logger LOGGER=LoggerFactory.getLogger(UserController.class);
    private static final String PATTERN = "******************************************";


    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/allusers")
    public ResponseEntity<List<User>> allUsers(){
        LOGGER.info(PATTERN);
        LOGGER.info("Listing All the User Details");
        List<User> users= this.userService.getAllUsers();
        if(!users.isEmpty())
            LOGGER.info("User Details Fetched Successfully");
        else
            LOGGER.info("User Details Not Found");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/user/add")
    public ResponseEntity<User> addUser(@RequestBody User user) throws UserAlreadyExistsException {
        LOGGER.info(PATTERN);
        User addUser=this.userService.addNewUser(user);
        LOGGER.info("Trying to add new user");
        if(addUser != null) {
            LOGGER.info("User Created Successfully");
            return new ResponseEntity<>(addUser, HttpStatus.CREATED);
        }
        LOGGER.error("User Entered Email Already Exists");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        LOGGER.info(PATTERN);
        LOGGER.info("Updating User Details");
        User updateUser=this.userService.updateUser(user);
        LOGGER.info("User details updated successfully");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        LOGGER.info(PATTERN);
        LOGGER.warn("Deleting the User");
        this.userService.deleteUser(id);
        LOGGER.info("User Deleted Successfully");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/find/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) throws UserNotFoundException {
        LOGGER.info(PATTERN);
        LOGGER.info("Finding the user by id");
        User user = this.userService.findUserById(id);
        if(user==null){
            LOGGER.error("User not exists with the given id");
        }
        else{
            LOGGER.info("User details fetched Successfully");
        }
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/users/{role}")
    public ResponseEntity<List<User>> allCustomers(@PathVariable String role) throws UserNotFoundException {
        LOGGER.info(PATTERN);
        LOGGER.info("Fetching User Details By Role");
        List<User> users = this.userService.getAllCustomers(role);
        if(!users.isEmpty())
            LOGGER.info("User Details fetched successfully");
        else
            LOGGER.warn("No User found with the given role");
        LOGGER.info(PATTERN);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user){
        LOGGER.info(PATTERN);
        LOGGER.info("User Trying to Login in the Application");
        User loginUser=this.userService.loginUser(user.getEmail(),user.getPassword());
        if(loginUser!=null) {
            LOGGER.info("User Login Successful");
            LOGGER.info(PATTERN);
            return new ResponseEntity<>(loginUser, HttpStatus.OK);
        }
        else {
            LOGGER.warn("Invalid Credentials Entered");
            LOGGER.info(PATTERN);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
