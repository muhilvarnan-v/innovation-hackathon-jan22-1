package com.example.ondc.repository;

import com.example.ondc.model.Weightages;
import com.example.ondc.utils.Constants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeightageRepository extends JpaRepository<Weightages, Long> {

    Weightages findOneByIdentifier(Constants.Identifier identifier);
}
