package com.example.ondc.controller;

import com.example.ondc.model.EanData;
import com.example.ondc.model.OrderDetails;
import com.example.ondc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping(value = "/order", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insertEanData(@RequestBody OrderDetails orderDetails) {
        orderService.insertOrderDetails(orderDetails);
        return ResponseEntity.ok("Successfully inserted data");
    }
}
