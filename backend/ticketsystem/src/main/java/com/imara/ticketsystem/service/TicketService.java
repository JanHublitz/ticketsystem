package com.imara.ticketsystem.service;

import com.imara.ticketsystem.dao.TicketDao;
import com.imara.ticketsystem.model.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketDao ticketDao;

    @Autowired
    public TicketService(@Qualifier("Dao") TicketDao ticketDao) {
        this.ticketDao = ticketDao;
    }

    public int addTicket(Ticket ticket) {
        return ticketDao.insertTicket(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketDao.selectAllTickets();
    }
}
