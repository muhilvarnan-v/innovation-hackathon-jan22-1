package com.example.messagingstompwebsocket.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {

    Double latitude;
    Double longitude;

    public Location(Location location)
    {
        this.latitude =location.latitude;
        this.longitude=location.longitude;
    }
}
