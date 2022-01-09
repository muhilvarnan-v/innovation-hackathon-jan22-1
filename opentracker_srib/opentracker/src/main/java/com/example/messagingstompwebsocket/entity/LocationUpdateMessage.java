package com.example.messagingstompwebsocket.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationUpdateMessage {
    public LocationUpdateMessage(){

    }
    Location location;
    String trackingId;

}
