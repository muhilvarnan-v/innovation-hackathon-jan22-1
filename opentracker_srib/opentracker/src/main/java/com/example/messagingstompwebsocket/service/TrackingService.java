package com.example.messagingstompwebsocket.service;

import com.example.messagingstompwebsocket.entity.Location;
import com.example.messagingstompwebsocket.entity.TrackingInfo;


public interface TrackingService {

    public TrackingInfo getTrackingInfo(String trackId);
    public void updateDeliveryAgentLocation(String trackId, Location location);
    public String addOrderLocationInfo(TrackingInfo trackingInfo);
}
