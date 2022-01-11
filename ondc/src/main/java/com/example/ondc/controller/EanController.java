package com.example.ondc.controller;

import com.example.ondc.service.CalculateDynamicPriceService;
import com.example.ondc.model.EanData;
import com.example.ondc.model.EanDataResponse;
import com.example.ondc.service.EanDataService;
import java.util.List;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EanController {

    @Autowired
    EanDataService eanDataService;

    @Autowired
    CalculateDynamicPriceService calculateDynamicPriceService;


    @PostMapping(value = "/ean", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insertEanData(@RequestBody EanData eandata) {
        eanDataService.insertEanData(eandata);
        return ResponseEntity.ok("Successfully inserted data");
    }

    @PutMapping(value = "/ean/{eanId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateEanData(@PathVariable String eanId, @RequestBody EanData eandata) {
        eanDataService.updateEanData(eanId, eandata);
        return ResponseEntity.ok("Successfully inserted data");
    }

    @GetMapping(value = "/ean/{eanId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EanDataResponse> getEanData(@PathVariable String eanId) {
        EanDataResponse eanDataResponse = eanDataService.getEanData(eanId);
        return new ResponseEntity<>(eanDataResponse, HttpStatus.OK);
    }

    @GetMapping(value = "/ean", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EanDataResponse>> getAllEanData() {
        List<EanDataResponse> eanDataResponseList = eanDataService.getAllEanData();
        return new ResponseEntity<>(eanDataResponseList, HttpStatus.OK);
    }

    @GetMapping(value = "/ean/{eanId}/dynamic-price/{pincode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EanDataResponse> getEanDataWithDynamicPrice(@PathVariable String eanId,
                                                                      @PathVariable String pincode,
                                                                      @RequestParam String season) {
        EanDataResponse eanDataResponse = calculateDynamicPriceService.calculateDynamicPrice(eanId, pincode,season);
        return new ResponseEntity<>(eanDataResponse, HttpStatus.OK);
    }
}
