package com.klod.inventory_managment_system.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TotalAmountSoldCurrentAndPastDTO {
    private List<TotalAmountSoldPerDayDTO> currentWeek;
    private List<TotalAmountSoldPerDayDTO> pastWeek;
}
