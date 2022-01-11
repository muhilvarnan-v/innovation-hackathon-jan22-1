package com.example.ondc.controller;

import com.example.ondc.model.EanData;
import com.example.ondc.model.Weightages;
import com.example.ondc.service.WeightageService;
import com.example.ondc.utils.Constants;
import java.util.List;
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
public class WeightageController {

    @Autowired
    WeightageService weightageService;

    @PostMapping(value = "/weightage", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insertWeightage(@RequestBody Weightages weightages) {
        weightageService.insertWeightage(weightages);
        return ResponseEntity.ok("Successfully inserted data");
    }


    @GetMapping(value = "/weightage", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Weightages>> getAllWeightages() {
        List<Weightages> weightageResponse = weightageService.findAllWeightages();
        return new ResponseEntity<>(weightageResponse, HttpStatus.OK);
    }

    @PutMapping(value = "/weightage/{identifier}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateWeightages(@PathVariable Constants.Identifier identifier, @RequestParam double weightage) {
        weightageService.updateWeightage(identifier, weightage);
        return ResponseEntity.ok("Successfully inserted data");
    }
}
