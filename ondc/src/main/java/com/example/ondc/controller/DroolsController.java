package com.example.ondc.controller;

import com.example.ondc.component.KieComponent;
import com.example.ondc.model.DroolEngineDto;
import com.example.ondc.service.DynamicPricingService;
import com.example.ondc.service.FilesService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by GAGAN.HV on 08/01/22
 */

@RestController
@RequestMapping("/dp")
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DroolsController {

    @Autowired
    DynamicPricingService dynamicPricingService;

    @Autowired
    FilesService filesService;

    @Autowired
    KieComponent kieComponent;

    @PostMapping(value = "/calculation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> dynamicPricingCalculation(@RequestBody DroolEngineDto dpdto) {
        return ResponseEntity.ok(dynamicPricingService.calculateAndSetPrice(dpdto));
    }


    @PostMapping(value = "/uploadRules")
    public ResponseEntity<?> uploadClusterInfoCsv(@RequestParam("file") MultipartFile file) {

        filesService.uploadFile(file);
//        kieComponent.reloadContainer();
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/file/{fileName}")
    public void downloadSampleCSV(HttpServletRequest request,
                                  HttpServletResponse response,
                                  @PathVariable("fileName") String fileName) throws IOException {
        filesService.downloadRulesFile(request, response, fileName);
    }
}

