package com.example.ondc.service;

import com.example.ondc.model.Weightages;
import com.example.ondc.repository.WeightageRepository;
import com.example.ondc.utils.Constants;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WeightageService {

    @Autowired
    WeightageRepository weightageRepository;

    public void insertWeightage(Weightages weightages) {
        weightageRepository.save(weightages);
    }

    public List<Weightages> findAllWeightages() {
        return weightageRepository.findAll();
    }

    public void updateWeightage(Constants.Identifier identifier, double weightage) {
        Weightages oldWeightages = weightageRepository.findOneByIdentifier(identifier);
        if (oldWeightages != null) {
            oldWeightages.setWeightage(weightage);
            weightageRepository.save(oldWeightages);
        } else throw new RuntimeException("No Data Present for given identifier");
    }
}
