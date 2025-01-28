package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.dto.OutOfStockDTO;
import com.klod.inventory_managment_system.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<OutOfStockDTO>> getOutOfStockProducts() {
        return ResponseEntity.ok(notificationService.getOutOfStockProducts());
    }
}
