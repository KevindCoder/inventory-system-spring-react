package com.klod.inventory_managment_system.mapper;

import com.klod.inventory_managment_system.config.MapperConfig;
import com.klod.inventory_managment_system.model.PercentageSoldPerCityDTO;
import com.klod.inventory_managment_system.model.dto.MostSoldProductsDTO;
import com.klod.inventory_managment_system.model.dto.StatusStatsDTO;
import com.klod.inventory_managment_system.model.dto.TotalAmountSoldPerDayDTO;
import com.klod.inventory_managment_system.model.projection.MostSoldProductsProjection;
import com.klod.inventory_managment_system.model.projection.OrderCountProjection;
import com.klod.inventory_managment_system.model.projection.PercentageSoldPerCityProjection;
import com.klod.inventory_managment_system.model.projection.TotalAmountSoldPerDayProjection;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(config = MapperConfig.class)
public interface DashboardMapper {
    StatusStatsDTO mapToDTO(OrderCountProjection projection);

    List<StatusStatsDTO> mapToListDTO(List<OrderCountProjection> projections);

    MostSoldProductsDTO mapToDTO(MostSoldProductsProjection projection);

    List<MostSoldProductsDTO> mapToMostSoldListDTO(List<MostSoldProductsProjection> projections);

    TotalAmountSoldPerDayDTO mapToDTO(TotalAmountSoldPerDayProjection projection);

    PercentageSoldPerCityDTO mapToDTO(PercentageSoldPerCityProjection projection);

    List<PercentageSoldPerCityDTO> mapToPercentagePerCityListDTO(List<PercentageSoldPerCityProjection> projections);

    default Map<String, List<TotalAmountSoldPerDayDTO>> mapToMap(List<TotalAmountSoldPerDayProjection> projections) {
        return projections.stream()
                .collect(Collectors.groupingBy(
                        projection -> projection.getPeriod().name(),
                        Collectors.mapping(this::mapToDTO, Collectors.toList())
                ));
    }
}
