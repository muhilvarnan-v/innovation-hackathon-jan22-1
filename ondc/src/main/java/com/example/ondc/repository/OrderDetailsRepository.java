package com.example.ondc.repository;

import com.example.ondc.model.OrderDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

    List<OrderDetails> findAllByEan(String ean);

}
