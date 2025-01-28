package com.klod.inventory_managment_system.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PercentageSoldPerCityDTO {
    private String city;
    private Double percentageSold;
}
