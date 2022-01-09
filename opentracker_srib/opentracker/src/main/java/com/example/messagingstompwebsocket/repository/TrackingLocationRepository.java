package com.example.messagingstompwebsocket.repository;

import com.example.messagingstompwebsocket.entity.Location;
import com.example.messagingstompwebsocket.entity.TrackingInfo;


public interface TrackingLocationRepository {

    public TrackingInfo getLocationFromTrackingId(String trackingId);
    public void updateDeliveryAgentLocation(String trackingId,Location location);
    public String addOrderLocationInfo(TrackingInfo trackingInfo);

}
