package com.example.messagingstompwebsocket.service;

import com.example.messagingstompwebsocket.entity.Location;
import com.example.messagingstompwebsocket.entity.TrackingInfo;
import com.example.messagingstompwebsocket.repository.TrackingLocationRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackingServiceImpl implements TrackingService {

    @Autowired
    TrackingLocationRepositoryImpl trackingLocationRepositoryImpl;

    @Override
    public TrackingInfo getTrackingInfo(String trackId) {
        return trackingLocationRepositoryImpl.getLocationFromTrackingId(trackId);
    }

    @Override
    public void updateDeliveryAgentLocation(String trackId, Location location) {
        trackingLocationRepositoryImpl.updateDeliveryAgentLocation(trackId,location);
    }

    @Override
    public String addOrderLocationInfo(TrackingInfo trackingInfo) {
        return trackingLocationRepositoryImpl.addOrderLocationInfo(trackingInfo);
    }
}
