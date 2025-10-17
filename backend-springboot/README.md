# Spring Boot Product Management API

A modern, best-practice REST API built with Java and Spring Boot for managing a product catalog. The project features a clean, layered architecture, full CRUD functionality, advanced filtering, and interactive API documentation.

## Table of Contents

- Features
- Tech Stack
- Getting Started
- API Endpoints
- Project Structure
- Data Models (DTOs)

## Features

- **RESTful API**: Provides a complete set of endpoints for product management.
- **Full CRUD Functionality**: Create, Read, Update, and Delete operations for products.
- **Advanced Querying**:
    - **Pagination**: Efficiently browse large datasets with pagination support.
    - **Sorting**: Sort results by any product attribute (e.g., title, price).
    - **Full-Text Search**: Search across multiple fields with a single query parameter.
    - **Filtering**: Dynamically filter products by vendor, minPrice, and maxPrice.
- **Interactive API Documentation**: Automatically generated, interactive documentation via Swagger UI.
- **Clean Architecture**: Follows a layered architecture (Controller, Service, Repository) for separation of concerns.
- **Efficient Data Mapping**: Uses MapStruct for boilerplate-free, high-performance DTO-to-entity mapping.
- **Dynamic Query Building**: Uses JPA Specifications to safely and cleanly build complex queries.
- **Centralized CORS Configuration**: Securely handles cross-origin requests from the frontend.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2**
    - **Spring Web**: For creating RESTful APIs.
    - **Spring Data JPA**: For database interaction with Hibernate.
- **MySQL**: As the relational database.
- **Maven**: For dependency management.
- **SpringDoc OpenAPI**: For Swagger UI documentation.
- **MapStruct**: For DTO mapping.
- **Lombok**: To reduce boilerplate code.

## Getting Started

### Prerequisites

- JDK 17 or later
- Maven 3.6 or later
- A running MySQL or MariaDB Server instance
- IntelliJ IDEA (Community or Ultimate edition)

### Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd backend-springboot
   ```

2. **Create a MySQL database**:
   ```sql
   CREATE DATABASE products;
   ```

3. **Configure the database connection** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/products
   spring.datasource.username=your_db_user
   spring.datasource.password=your_db_password
   ```

### Running with IntelliJ IDEA (Recommended)

1. Open the project's root `pom.xml` file with IntelliJ IDEA. Select "Open as Project".
2. Wait for the IDE to index the files and automatically download all the Maven dependencies.
3. Navigate to the main application class: `src/main/java/com/example/bestpracticeapp/BestPracticeAppApplication.java`.
4. Click the green "play" icon next to the main method to build and run the application.

### Running with Maven

Build and run the application using the Maven command line:

```bash
mvn clean spring-boot:run
```

The application will start on `http://localhost:8080`. You can access the Swagger UI at `http://localhost:8080/swagger-ui.html`.

## API Endpoints

### Products

- **GET /api/products** — List all products with pagination, sorting, searching, and filtering.

  **Query Parameters**:
    - `page` (optional): The page number to retrieve (0-indexed). Default: 0.
    - `size` (optional): The number of items per page. Default: 10.
    - `sort` (optional): A property to sort by, followed by direction (e.g., `title,asc` or `price,desc`). Default: `title,asc`.
    - `search` (optional): A search term to filter results by title or handle.
    - `vendor` (optional): Filter by a specific vendor name.
    - `minPrice` (optional): Filter for products with a price greater than or equal to this value.
    - `maxPrice` (optional): Filter for products with a price less than or equal to this value.

- **GET /api/products/vendors** — Get a list of all unique vendor names.

- **GET /api/products/{id}** — Get one product by its ID.

- **POST /api/products** — Create a new product.

- **PUT /api/products/{id}** — Update an existing product.

- **DELETE /api/products/{id}** — Delete a product.

## Project Structure

```
src/
└── main/
    ├── java/
    │   └── com/example/bestpracticeapp/
    │       ├── config/           # Global configuration (CORS, OpenAPI)
    │       ├── controller/       # API Layer (HTTP request handling)
    │       ├── dto/              # Data Transfer Objects
    │       ├── entity/           # JPA Entities (Database models)
    │       ├── repository/       # Data Access Layer
    │       └── service/          # Business Logic Layer
    │           ├── impl/         # Service implementations
    │           └── mapper/       # MapStruct mappers
    └── resources/
        └── application.properties
```

## Data Models (DTOs)

### ProductDto (Response)

This is the object returned when you fetch product(s).

```java
public class ProductDto {
    private Long id;
    private String title;
    private String handle;
    private String vendor;
    private BigDecimal price;
    private String imageSrc;
}
```

### CreateOrUpdateProductRequest (Request Body)

This is the object you send when creating or updating a product.

```java
public class CreateOrUpdateProductRequest {
    private String title;
    private String handle;
    private String vendor;
    private BigDecimal price;
    private String imageSrc;
}
```