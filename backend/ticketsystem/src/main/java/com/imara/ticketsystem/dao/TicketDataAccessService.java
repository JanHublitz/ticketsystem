package com.imara.ticketsystem.dao;

import com.imara.ticketsystem.model.Ticket;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("Dao")
public class TicketDataAccessService implements TicketDao{

    private static List<Ticket> DB = new ArrayList<>();

    @Override
    public int insertTicket(int id, Ticket ticket) {
        DB.add(new Ticket(id, ticket.getThema()));
        return 1;
    }

    @Override
    public List<Ticket> selectAllTickets() {
        return DB;
    }
}
