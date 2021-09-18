package com.imara.ticketsystem.api;
import com.imara.ticketsystem.model.Ticket;
import com.imara.ticketsystem.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class TicketController {

    private final String url = "http://192.168.176.135:3000";

    @Autowired
    private TicketService service;

    @CrossOrigin(origins = url)
    @PostMapping(path = "/ticket/add")
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return service.saveTicket(ticket);
    }

    @CrossOrigin(origins = url)
    @PostMapping(path = "/ticket/addAll")
    public List<Ticket> addTickets(@RequestBody List<Ticket> tickets) {
        return service.saveTickets(tickets);
    }

    @CrossOrigin(origins = url)
    @GetMapping("/tickets")
    public List<Ticket> findAllTickets() {
        return service.getTickets();
    }

    @CrossOrigin(origins = url)
    @GetMapping("/ticket/{id}")
    public Ticket findTicketById(@PathVariable("id") int id) {
        return service.getTicketById(id);
    }

    @CrossOrigin(origins = url)
    @PutMapping(path = "/ticket/update")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return service.updateTicket(ticket);
    }

    @CrossOrigin(origins = url)
    @DeleteMapping(path = "/ticket/delete/{id}")
    public String deleteTicket(@PathVariable("id") int id) {
        return service.deleteTicket(id);
    }
}
