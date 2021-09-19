package com.imara.ticketsystem.service;

import com.imara.ticketsystem.repo.TicketRepo;
import com.imara.ticketsystem.model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepo ticketRepo;


    public Ticket saveTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    public List<Ticket> saveTickets(List<Ticket> tickets) {
        return ticketRepo.saveAll(tickets);
    }

    public List<Ticket> getTickets() {
        return ticketRepo.findAll();
    }

    public Ticket getTicketById(int id) {
        return ticketRepo.findById(id).orElse(null);
    }

    public String deleteTicket(int id) {
        ticketRepo.deleteById(id);
        return "deleted " + id;
    }

    public Ticket updateTicket(Ticket ticket) {
        /*
        Ticket existingTicket = ticketRepo.findById(ticket.getId()).orElse(null);
        existingTicket.setThema(ticket.getThema());
        */

        return ticketRepo.save(ticket);
    }
}
