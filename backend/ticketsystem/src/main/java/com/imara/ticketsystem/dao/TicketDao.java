package com.imara.ticketsystem.dao;

import com.imara.ticketsystem.model.Ticket;

import java.util.List;

public interface TicketDao {

    int insertTicket(int id, Ticket ticket);

    default int insertTicket(Ticket ticket) {
        int id = (int)(Math.random() * 30);
        return insertTicket(id, ticket);
    }

    List<Ticket> selectAllTickets();
}
