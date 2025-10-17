package org.multigunagemilang.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Schema(description = "Request object for creating or updating a product")
public class CreateOrUpdateProductRequest {

    @Schema(description = "The title of the product.", example = "Vortex 2 Leggings", required = true)
    private String title;

    @Schema(description = "The URL-friendly handle for the product.", example = "vortex-2-leggings")
    private String handle;

    @Schema(description = "The vendor of the product.", example = "FAMME")
    private String vendor;

    @Schema(description = "The price of the product.", example = "249.00")
    private BigDecimal price;

    @Schema(description = "The URL of the product's primary image.", example = "https://cdn.shopify.com/s/files/1/0076/6033/9297/files/vortex-2-leggings-black.jpg")
    private String imageSrc;
}
