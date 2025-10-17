package org.multigunagemilang.repository;

import org.multigunagemilang.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 * JpaSpecificationExecutor is added to support dynamic queries with criteria.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query("SELECT DISTINCT p.vendor FROM Product p WHERE p.vendor IS NOT NULL AND p.vendor != '' ORDER BY p.vendor")
    List<String> findDistinctVendors();
}

