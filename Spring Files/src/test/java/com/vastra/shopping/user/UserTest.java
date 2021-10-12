package com.vastra.shopping.user;

import com.vastra.shopping.model.User;
import com.vastra.shopping.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@DataJpaTest
class UserTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void addUser() {
        User user=new User();
        user.setId(2L);
        user.setEmail("temp@gmail.com");
        user.setPassword("789789789");
        assertNotNull(userRepository.save(user));
    }

    @Test
    public void findUser(){
        User user=new User();
        user.setId(2L);
        user.setEmail("temp@gmail.com");
        user.setPassword("789789789");
        assertNotNull(userRepository.save(user));
        User res=this.userRepository.findUserById(2L).orElse(null);
        assertNotNull(res);
    }

    @Test
    public void allUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User("abc@gmail.com","12345678"));
        users.add(new User("bcd@gmail.com","789789789"));
        users.add(new User("def@gmail.com","78745151"));
        users.add(new User("ghi@gmail.com","454515125"));
        users.add(new User("xyz@gmail.com","84542125154"));
        List<User> result = userRepository.saveAll(users);
        assertEquals(5, result.size());
    }


    @Test
    public void updateUser() {
        User user=new User();
        user.setEmail("temp@gmail.com");
        user.setPassword("789789789");
        user.setFirstName("Anil");
        user.setLastName("Kumar");
        user = userRepository.save(user);
        assertEquals("Anil", user.getFirstName());
        assertEquals("temp@gmail.com", user.getEmail());
    }

    @Test
    public void deleteUser() {
        User user=new User();
        user.setId(2L);
        user.setEmail("temp@gmail.com");
        user.setPassword("789789789");
        user = userRepository.save(user);
        userRepository.delete(user);
        System.out.println("User Deleted");
    }
}
