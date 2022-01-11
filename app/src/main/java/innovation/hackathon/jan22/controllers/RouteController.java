package innovation.hackathon.jan22.controllers;

import innovation.hackathon.jan22.api.request.MultiAgentRouteRequest;
import innovation.hackathon.jan22.api.request.MultiDeliveryRouteRequest;
import innovation.hackathon.jan22.model.Places;
import innovation.hackathon.jan22.services.RouteService;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {

    @GetMapping("/optimize/{profile}")
    @ApiOperation(value = "Basic Route Optimization API - For a delivery agent with single pickup point and multiple delivery points")
    public Places optimize(@PathVariable String profile, @RequestParam("locations") String locations) {
        RouteService routeService = new RouteService();
        return routeService.getOptimizedRoute(locations, profile);
    }

    @PostMapping("/optimize/multi-agent/{profile}")
    @ApiOperation(value = "Multi-Agent Route Optimization API - For many delivery agents with single pickup point and multiple delivery points")
    public List<Places> optimizeForMultiAgent(@PathVariable String profile,
                                              @RequestBody MultiAgentRouteRequest multiAgentRouteRequest) {
        RouteService routeService = new RouteService();
        return routeService.getOptimizedRouteForMultiAgentDelivery(multiAgentRouteRequest, profile);
    }

    @PostMapping("/optimize/multi-delivery/{profile}")
    @ApiOperation(value = "Multi-Point Delivery Route Optimization API - For a delivery agent with multiple pickup points and multiple delivery points")
    public Places optimizeForMultiDelivery(@PathVariable String profile,
                                           @RequestBody MultiDeliveryRouteRequest multiAgentRouteRequest) {
        RouteService routeService = new RouteService();
        return routeService.getOptimizedRouteForMultiPointDelivery(multiAgentRouteRequest, profile);
    }
}