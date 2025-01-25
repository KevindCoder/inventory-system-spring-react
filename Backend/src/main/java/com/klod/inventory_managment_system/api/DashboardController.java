package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.PercentageSoldPerCityDTO;
import com.klod.inventory_managment_system.model.dto.MostSoldProductsDTO;
import com.klod.inventory_managment_system.model.dto.StatusStatsDTO;
import com.klod.inventory_managment_system.model.dto.TotalAmountSoldCurrentAndPastDTO;
import com.klod.inventory_managment_system.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/status-stats")
    public ResponseEntity<List<StatusStatsDTO>> getStatusStats() {
        return ResponseEntity.ok(dashboardService.getStatusStats());
    }

    @GetMapping("/most-sold-products")
    public ResponseEntity<List<MostSoldProductsDTO>> getMostSoldProducts() {
        return ResponseEntity.ok(dashboardService.getMostSoldProducts());
    }

    @GetMapping("/amount-sold-stats")
    public ResponseEntity<TotalAmountSoldCurrentAndPastDTO> getAmountSoldPerDay() {
        return ResponseEntity.ok(dashboardService.getTotalAmountSoldCurrentAndPast());
    }

    @GetMapping("/percentage-sold-per-city")
    public ResponseEntity<List<PercentageSoldPerCityDTO>> getPercentageSoldPerCity() {
        return ResponseEntity.ok(dashboardService.getPercentageSoldPerCity());
    }
}
