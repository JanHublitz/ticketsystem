package com.imara.ticketsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    private String thema;
    @NotNull
    private int prioritaet;
    private String beschreibung;
    @NotNull
    private int status;
    private String verantwortlich;
    @NotBlank
    private String erstellt;
    private String bearbeitet;
    @NotBlank
    private String erstellt_von;
    private String bearbeitet_von;


}
