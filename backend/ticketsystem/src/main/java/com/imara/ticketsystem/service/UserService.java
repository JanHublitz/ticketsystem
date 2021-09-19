package com.imara.ticketsystem.service;
import com.imara.ticketsystem.model.User;
import com.imara.ticketsystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public List<User> saveUsers(List<User> users) {
        return userRepo.saveAll(users);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User getUserById(int id) {
        return userRepo.findById(id).orElse(null);
    }

    public String deleteUser(int id) {
        userRepo.deleteById(id);
        return "deleted " + id;
    }

    /*
    public User updateTicket(User ticket) {
        User existingTicket = userRepo.findById(ticket.getId()).orElse(null);
        existingTicket.setThema(ticket.getThema());
        return ticketRepo.save(existingTicket);
    }
    */
}
