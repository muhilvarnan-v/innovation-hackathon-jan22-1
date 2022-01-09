package com.example.ondc.component;

import com.example.ondc.utils.KieUtils;
import lombok.extern.slf4j.Slf4j;
import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.Message;
import org.kie.api.builder.Results;
import org.kie.internal.io.ResourceFactory;
import org.springframework.stereotype.Component;

/**
 * Created by GAGAN.HV on 9/1/22
 */
@Component
@Slf4j
public class KieComponent {

    public void reloadContainer() {
        try {
            KieServices kieServices = KieServices.Factory.get();
            KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
            kieFileSystem.delete("src/main/resources/rules/DpCalculate.xlsx");
            kieFileSystem.write(ResourceFactory.newClassPathResource("rules/DpCalculate.xlsx"));
            KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
            Results results = kieBuilder.getResults();
            if (results.hasMessages(Message.Level.ERROR)) {
                throw new IllegalStateException("Kie Reload Failed " + results);
            }
            kieBuilder.buildAll();
            KieModule kieModule = kieBuilder.getKieModule();

            KieUtils.setKieContainer(kieServices.newKieContainer(kieModule.getReleaseId()));
        } catch (Exception e) {
            String err = String.format("Error while reloading kie container %s", e.getMessage());
            log.error(err);
            throw new RuntimeException(err);
        }
    }
}
