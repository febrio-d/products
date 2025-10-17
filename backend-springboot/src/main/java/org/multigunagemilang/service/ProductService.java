package org.multigunagemilang.service;

import org.multigunagemilang.dto.CreateOrUpdateProductRequest;
import org.multigunagemilang.dto.ProductDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    Page<ProductDto> getAllProducts(Pageable pageable, String searchTerm, String vendor, BigDecimal minPrice, BigDecimal maxPrice);
    Optional<ProductDto> getProductById(Long id);
    ProductDto createProduct(CreateOrUpdateProductRequest request);
    Optional<ProductDto> updateProduct(Long id, CreateOrUpdateProductRequest request);
    boolean deleteProduct(Long id);
    List<String> getDistinctVendors();
}

