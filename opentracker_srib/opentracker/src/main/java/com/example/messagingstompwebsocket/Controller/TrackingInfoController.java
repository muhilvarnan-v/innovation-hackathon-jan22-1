package com.example.messagingstompwebsocket.Controller;

import com.example.messagingstompwebsocket.entity.AddOrderLocationResponse;
import com.example.messagingstompwebsocket.entity.TrackingInfo;
import com.example.messagingstompwebsocket.service.TrackingService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("track")
@CrossOrigin(origins = "*")
public class TrackingInfoController {
    @Autowired
    private TrackingService trackingService;
    private static final Logger LOGGER = LoggerFactory.getLogger(TrackingInfoController.class);
    @GetMapping(value="/trackInfo-by-id", produces= MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code=200, message="Successfully retrieved list of available skus requested.")
    })
    public ResponseEntity<TrackingInfo>getTrackingInfo(@RequestParam(value = "trackingId", required=true) @ApiParam(name="trackId", value="Specifies the trackId for the api request") String trackingId)
    {
        LOGGER.info("TrackInfoById called");
        TrackingInfo trackingInfo =trackingService.getTrackingInfo(trackingId);
        if(trackingInfo != null)
            return ResponseEntity.status(HttpStatus.OK).body(trackingInfo);
        else
            return ResponseEntity.status(HttpStatus.GONE).body(null);
    }

    @ApiResponses(value = {
            @ApiResponse(code=200, message="Successfully updated the locationInfo"),
            @ApiResponse(code=400, message="Bad request.")
    })

    @PostMapping(value="/addOrderLocationInfo", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AddOrderLocationResponse> addOrderLocationInfo(@RequestBody @ApiParam(required=true, name="", value="Add orderLocationInfo") TrackingInfo trackingInfo){
        AddOrderLocationResponse addOrderLocationResponse=new AddOrderLocationResponse();
        String trackingId=trackingService.addOrderLocationInfo(trackingInfo);
        if(trackingId==null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        addOrderLocationResponse.setTrackingId(trackingService.addOrderLocationInfo(trackingInfo));
        return ResponseEntity.status(HttpStatus.OK).body(addOrderLocationResponse);
    }

}
