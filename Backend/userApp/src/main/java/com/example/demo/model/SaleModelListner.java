package com.example.demo.model;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import com.example.demo.services.SequenceGeneratorService;

@Component
public class SaleModelListner extends AbstractMongoEventListener<User> {

    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public SaleModelListner(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<User> event) {
        if (event.getSource().getComplainId() == 0) {
            event.getSource().setComplainId(sequenceGenerator.generateSequence(User.SEQUENCE_NAME));
        }
    }
}
