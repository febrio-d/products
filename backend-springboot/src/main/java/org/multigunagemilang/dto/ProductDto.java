package org.multigunagemilang.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String title;
    private String handle;
    private String vendor;
    private BigDecimal price;
    private String imageSrc;
}

