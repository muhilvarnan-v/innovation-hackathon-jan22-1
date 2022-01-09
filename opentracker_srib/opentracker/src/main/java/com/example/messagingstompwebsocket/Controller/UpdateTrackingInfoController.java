package com.example.messagingstompwebsocket.Controller;

import com.example.messagingstompwebsocket.entity.LocationUpdateMessage;
import com.example.messagingstompwebsocket.service.TrackingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class UpdateTrackingInfoController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UpdateTrackingInfoController.class);
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private TrackingService trackingService;

    @MessageMapping("/updateLocation")
    public void updateLocation(LocationUpdateMessage message) throws Exception {
        LOGGER.info("updateLocationCalled");
        trackingService.updateDeliveryAgentLocation(message.getTrackingId(),message.getLocation());
        simpMessagingTemplate.convertAndSend("/topic/updateLocation/"+message.getTrackingId(), trackingService.getTrackingInfo(message.getTrackingId()));
    }
}
