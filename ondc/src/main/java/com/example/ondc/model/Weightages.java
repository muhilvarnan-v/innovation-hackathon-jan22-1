package com.example.ondc.model;

import com.example.ondc.utils.Constants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "Weightages")
public class Weightages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    Long id;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    Constants.Identifier identifier;

    double weightage;
}
