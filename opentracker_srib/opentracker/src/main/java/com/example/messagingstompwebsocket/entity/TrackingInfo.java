package com.example.messagingstompwebsocket.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TrackingInfo {
    Location buyer;
    Location seller;
    Location deliverAgent;
}
