package com.example.ondc.repository;

import com.example.ondc.model.EanData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EanDataRepository extends JpaRepository<EanData, Long> {

    EanData findOneByEan(String ean);
}