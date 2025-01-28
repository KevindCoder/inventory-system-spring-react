package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.PercentageSoldPerCityDTO;
import com.klod.inventory_managment_system.model.dto.MostSoldProductsDTO;
import com.klod.inventory_managment_system.model.dto.StatusStatsDTO;
import com.klod.inventory_managment_system.model.dto.TotalAmountSoldCurrentAndPastDTO;

import java.util.List;

public interface DashboardService {
    List<StatusStatsDTO> getStatusStats();

    List<MostSoldProductsDTO> getMostSoldProducts();

    TotalAmountSoldCurrentAndPastDTO getTotalAmountSoldCurrentAndPast();

    List<PercentageSoldPerCityDTO> getPercentageSoldPerCity();
}
