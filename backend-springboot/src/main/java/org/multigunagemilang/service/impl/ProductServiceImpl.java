package org.multigunagemilang.service.impl;

import org.multigunagemilang.dto.CreateOrUpdateProductRequest;
import org.multigunagemilang.dto.ProductDto;
import org.multigunagemilang.entity.Product;
import org.multigunagemilang.service.mapper.ProductMapper;
import org.multigunagemilang.repository.ProductRepository;
import org.multigunagemilang.service.ProductService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;


    @Override
    public Page<ProductDto> getAllProducts(Pageable pageable, String searchTerm, String vendor, BigDecimal minPrice, BigDecimal maxPrice) {
        // Use Specification for dynamic query building
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(searchTerm)) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + searchTerm.toLowerCase() + "%"));
            }
            if (StringUtils.hasText(vendor)) {
                predicates.add(cb.equal(root.get("vendor"), vendor));
            }
            if (minPrice != null && maxPrice != null) {
                predicates.add(cb.between(root.get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec, pageable).map(productMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDto> getProductById(Long id) {
        return productRepository.findById(id).map(productMapper::toDto);
    }

    @Override
    public List<String> getDistinctVendors() {
        return productRepository.findDistinctVendors();
    }

    @Override
    @Transactional
    public ProductDto createProduct(CreateOrUpdateProductRequest request) {
        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    @Override
    @Transactional
    public Optional<ProductDto> updateProduct(Long id, CreateOrUpdateProductRequest request) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    productMapper.updateEntityFromDto(request, existingProduct);
                    Product updatedProduct = productRepository.save(existingProduct);
                    return productMapper.toDto(updatedProduct);
                });
    }

    @Override
    @Transactional
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
