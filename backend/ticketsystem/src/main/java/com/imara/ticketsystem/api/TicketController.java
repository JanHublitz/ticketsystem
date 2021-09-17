package com.imara.ticketsystem.api;
import com.imara.ticketsystem.model.Ticket;
import com.imara.ticketsystem.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class TicketController {

    @Autowired
    private TicketService service;

    @PostMapping(path = "/ticket/add")
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return service.saveTicket(ticket);
    }

    @PostMapping(path = "/ticket/addAll")
    public List<Ticket> addTickets(@RequestBody List<Ticket> tickets) {
        return service.saveTickets(tickets);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tickets")
    public List<Ticket> findAllTickets() {
        return service.getTickets();
    }

    @GetMapping("/ticket/{id}")
    public Ticket findTicketById(@PathVariable("id") int id) {
        return service.getTicketById(id);
    }

    @PutMapping(path = "/ticket/update")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return service.updateTicket(ticket);
    }

    @DeleteMapping(path = "/ticket/delete/{id}")
    public String deleteTicket(@PathVariable("id") int id) {
        return service.deleteTicket(id);
    }
}
