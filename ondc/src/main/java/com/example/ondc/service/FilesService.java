package com.example.ondc.service;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.kie.internal.io.ResourceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by GAGAN.HV on 9/1/22
 */
@Component
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilesService {

    @Autowired
    ResourceLoader resourceLoader;

    public void uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith(".xlsx"))
            throw new RuntimeException("Error in file type uploaded. Please upload only xlsx file format only");

        try {
            //uploading csv file
//            storeFile(file,"classpath:/rules/DpCalculate.xlsx");
            storeFile(file, "src/main/resources/rules/DpCalculate.xlsx");

        } catch (Exception e) {
            log.error("File upload Failed due to" + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private String storeFile(MultipartFile file,String location) {
        try {
            InputStream in = file.getInputStream();
            File file1 = new File(location);
            FileOutputStream f = new FileOutputStream(file1);
            int ch = 0;
            while ((ch = in.read()) != -1) {
                f.write(ch);
            }
            f.flush();
            f.close();
        } catch (IOException e) {
            throw new RuntimeException("Error while uploading rules " + e.getMessage());
        }
        return "Upload Succesfully";
    }

    public void downloadRulesFile(HttpServletRequest request,
                                  HttpServletResponse response,
                                  String fileName) throws IOException {

        log.info("Inside the download controller resource fileName =" + fileName);
        Resource resource = resourceLoader.getResource("classpath:/rules/" + fileName + ".xlsx");
        if (resource.exists()) {
            log.info("Resource exists!");
            response.setContentType("text/xlsx");
            response.setHeader("Content-Disposition",
                    String.format("attachment; filename=" +
                            resource.getFilename()));
            response.setContentLength((int) resource.contentLength());
            InputStream inputStream = resource.getInputStream();
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        }
    }
}
