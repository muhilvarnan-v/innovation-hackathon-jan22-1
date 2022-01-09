package com.example.messagingstompwebsocket.repository;

import com.example.messagingstompwebsocket.entity.Location;
import com.example.messagingstompwebsocket.entity.TrackingInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Repository
public class TrackingLocationRepositoryImpl implements TrackingLocationRepository{

    Map<String,TrackingInfo> trackingInfoMap;

    @PostConstruct
    public void init() {
         trackingInfoMap=new HashMap<>();
         populateWithData();
    }

    private void populateWithData() {
        Location buyerLocation=new Location(12.947094,77.607972);
        Location sellerLocation=new Location(12.991344, 77.690163);
        Location deliveryAgent=new Location(sellerLocation);
        TrackingInfo trackingInfo=new TrackingInfo(buyerLocation,sellerLocation,deliveryAgent);
        trackingInfoMap.put("453",trackingInfo);
        populateMapWith100Data();


    }

    /**
     * Adding test data for demonstration purpose only
     */
    private void populateMapWith100Data()
    {
        Double startingLat=12.947094;
        Double startingLong=77.607972;
        Double endingLat=12.991344;
        Double endingLongitude=77.690163;
        Double offset=0.01;
        for(int i=1;i<105;i++)
        {
            if(i==50)
            {
                startingLat=27.877994;
                startingLong=76.007811;
                endingLat=12.99193;
                endingLongitude=77.68853;
                offset=0.03;

            }
            startingLat=startingLat+offset;
            startingLong=startingLong+offset;
            endingLat=endingLat+offset;
            endingLongitude=endingLongitude+offset;
            Location buyerLocation=new Location(startingLat,startingLong);
            Location sellerLocation=new Location(endingLat, endingLongitude);
            Location deliveryAgent=new Location(sellerLocation);
            TrackingInfo trackingInfo=new TrackingInfo(buyerLocation,sellerLocation,deliveryAgent);
            trackingInfoMap.put(Integer.toString(i),trackingInfo);
        }

    }
    @Override
    public TrackingInfo getLocationFromTrackingId(String trackingId) {
        if(trackingInfoMap.containsKey(trackingId))
            return trackingInfoMap.get(trackingId);
        return null;
    }

    @Override
    public void updateDeliveryAgentLocation(String trackingId, Location location) {
        if(trackingInfoMap.containsKey(trackingId))
        {
            TrackingInfo trackingInfo=trackingInfoMap.get(trackingId);
            trackingInfo.setDeliverAgent(location);
            trackingInfoMap.put(trackingId,trackingInfo);
        }
    }

    @Override
    public String addOrderLocationInfo(TrackingInfo trackingInfo) {
        if(trackingInfo!=null)
        {
            String uuid= UUID.randomUUID().toString();
            trackingInfoMap.put(uuid,trackingInfo);
            return uuid;
        }
        return null;
    }

}
