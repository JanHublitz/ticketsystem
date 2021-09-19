package com.imara.ticketsystem.api;

import com.imara.ticketsystem.model.User;
import com.imara.ticketsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class UserController {

    private final String url = "http://192.168.176.135:3000";

    @Autowired
    private UserService service;

    @CrossOrigin(origins = url)
    @PostMapping(path = "/user/add")
    public User addTicket(@RequestBody User user) {
        return service.saveUser(user);
    }

    @CrossOrigin(origins = url)
    @PostMapping(path = "/user/addAll")
    public List<User> addTickets(@RequestBody List<User> users) {
        return service.saveUsers(users);
    }

    @CrossOrigin(origins = url)
    @GetMapping("/users")
    public List<User> findAllUsers() {
        return service.getUsers();
    }

    @CrossOrigin(origins = url)
    @GetMapping("/user/{id}")
    public User findTicketById(@PathVariable("id") int id) {
        return service.getUserById(id);
    }

    /*
    @CrossOrigin(origins = url)
    @PutMapping(path = "/user/update")
    public User updateTicket(@RequestBody User user) {
        return service.updateUser(user);
    }

     */

    @CrossOrigin(origins = url)
    @DeleteMapping(path = "/user/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return service.deleteUser(id);
    }
}
