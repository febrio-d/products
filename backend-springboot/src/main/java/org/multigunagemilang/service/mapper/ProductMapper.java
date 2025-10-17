package org.multigunagemilang.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.multigunagemilang.dto.CreateOrUpdateProductRequest;
import org.multigunagemilang.dto.ProductDto;
import org.multigunagemilang.entity.Product;

import java.util.List;

/**
 * Mapper for the entity {@link Product} and its DTOs.
 * Using MapStruct for boilerplate-free code generation.
 * componentModel = "spring" makes the generated mapper a Spring bean.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper {

    /**
     * Converts a Product entity to a ProductDto.
     */
    ProductDto toDto(Product product);

    /**
     * Converts a list of Product entities to a list of ProductDtos.
     */
    List<ProductDto> toDtoList(List<Product> products);

    /**
     * Converts a CreateOrUpdateProductRequest DTO to a Product entity.
     */
    Product toEntity(CreateOrUpdateProductRequest request);

    /**
     * Updates an existing Product entity from a CreateOrUpdateProductRequest DTO.
     * The @MappingTarget annotation tells MapStruct to update the existing entity
     * instead of creating a new one.
     */
    void updateEntityFromDto(CreateOrUpdateProductRequest dto, @MappingTarget Product entity);
}
