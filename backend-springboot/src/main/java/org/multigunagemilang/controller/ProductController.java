package org.multigunagemilang.controller;

import org.multigunagemilang.dto.CreateOrUpdateProductRequest;
import org.multigunagemilang.dto.ProductDto;
import org.multigunagemilang.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "APIs for product CRUD operations")
public class ProductController {

    private final ProductService productService;

    @Operation(
            summary = "List all products",
            description = "List all products with support for pagination, sorting, and searching."
    )
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    @GetMapping
    public Page<ProductDto> getAllProducts(
            @PageableDefault(size = 10, sort = "id") @Parameter(hidden = true) Pageable pageable,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String vendor,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return productService.getAllProducts(pageable, search, vendor, minPrice, maxPrice);
    }

    @Operation(summary = "Get all unique vendors")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved vendor list")
    @GetMapping("/vendors")
    public List<String> getVendors() {
        return productService.getDistinctVendors();
    }

    @Operation(summary = "Get one product")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved product")
    @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new product")
    @ApiResponse(responseCode = "201", description = "Product created successfully")
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody CreateOrUpdateProductRequest request) {
        ProductDto createdProduct = productService.createProduct(request);
        return ResponseEntity.created(URI.create("/api/products/" + createdProduct.getId())).body(createdProduct);
    }

    @Operation(summary = "Update a product")
    @ApiResponse(responseCode = "200", description = "Product updated successfully")
    @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody CreateOrUpdateProductRequest request) {
        return productService.updateProduct(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a product")
    @ApiResponse(responseCode = "204", description = "Product deleted successfully")
    @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}