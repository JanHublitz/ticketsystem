package com.imara.ticketsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Ticket {
    private final int id;

    private final String thema;


    public Ticket(@JsonProperty("id") int id,
                  @JsonProperty("thema") String thema) {
        this.id = id;
        this.thema = thema;
    }

    public int getId() {
        return this.id;
    }

    public String getThema() {
        return this.thema;
    }
}
