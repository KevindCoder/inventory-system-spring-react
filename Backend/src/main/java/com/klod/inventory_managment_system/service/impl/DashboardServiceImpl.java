package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.DashboardMapper;
import com.klod.inventory_managment_system.model.PercentageSoldPerCityDTO;
import com.klod.inventory_managment_system.model.dto.MostSoldProductsDTO;
import com.klod.inventory_managment_system.model.dto.StatusStatsDTO;
import com.klod.inventory_managment_system.model.dto.TotalAmountSoldCurrentAndPastDTO;
import com.klod.inventory_managment_system.model.dto.TotalAmountSoldPerDayDTO;
import com.klod.inventory_managment_system.model.enums.Period;
import com.klod.inventory_managment_system.model.projection.MostSoldProductsProjection;
import com.klod.inventory_managment_system.model.projection.OrderCountProjection;
import com.klod.inventory_managment_system.model.projection.PercentageSoldPerCityProjection;
import com.klod.inventory_managment_system.model.projection.TotalAmountSoldPerDayProjection;
import com.klod.inventory_managment_system.repository.OrderRepository;
import com.klod.inventory_managment_system.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final OrderRepository orderRepository;
    private final DashboardMapper dashboardMapper;

    @Override
    public List<StatusStatsDTO> getStatusStats() {
        log.info("Getting order status stats");
        List<OrderCountProjection> statusStats = orderRepository.findTotalOrdersPerStatus();
        return dashboardMapper.mapToListDTO(statusStats);
    }

    @Override
    public List<MostSoldProductsDTO> getMostSoldProducts() {
        log.info("Getting most sold products");
        List<MostSoldProductsProjection> mostSoldProducts = orderRepository.findMostSoldProducts();
        return dashboardMapper.mapToMostSoldListDTO(mostSoldProducts);
    }

    @Override
    public TotalAmountSoldCurrentAndPastDTO getTotalAmountSoldCurrentAndPast() {
        log.info("Getting total amount sold for current and past week");
        List<TotalAmountSoldPerDayProjection> totalAmountsSoldPerDay
                = orderRepository.findTotalAmountSoldPerPastDays(13);

        Map<String, List<TotalAmountSoldPerDayDTO>> map = dashboardMapper.mapToMap(totalAmountsSoldPerDay);

        TotalAmountSoldCurrentAndPastDTO response = new TotalAmountSoldCurrentAndPastDTO();
        response.setCurrentWeek(map.getOrDefault(Period.CURRENT.name(), List.of()));
        response.setPastWeek(map.getOrDefault(Period.PAST.name(), List.of()));
        return response;
    }

    @Override
    public List<PercentageSoldPerCityDTO> getPercentageSoldPerCity() {
        log.info("Getting percentage of products sold per city");
        List<PercentageSoldPerCityProjection> percentageSoldPerCity = orderRepository.findPercentageSoldPerCity();
        return dashboardMapper.mapToPercentagePerCityListDTO(percentageSoldPerCity);
    }
}
