# React Product Management Frontend

A modern, best-practice frontend application built with React, Vite, and shadcn/ui for managing the product catalog from the Spring Boot API.

## Table of Contents

- Features
- Tech Stack
- Getting Started
- Project Structure
- Data Models (Types)

## Features

- **Modern UI**: A clean, responsive interface built with Tailwind CSS and shadcn/ui.
- **Full CRUD Functionality**: A user-friendly interface for creating, reading, updating, and deleting products.
- **Advanced Data Table**:
  - **Pagination**: Efficiently browse large product lists.
  - **Sorting**: Sort products by title, vendor, or price.
  - **Multi-Select**: Select multiple rows for bulk operations.
  - **Bulk Delete**: Delete multiple selected products with a single action.
- **Powerful Filtering & Search**:
  - **Live Search**: Instantly search for products with debouncing to optimize performance.
  - **Advanced Filtering**: Filter products by vendor and price range through an intuitive popover dialog.
- **Robust Form Handling**: Client-side form validation using React Hook Form and Zod.
- **Type Safety**: Fully typed codebase with TypeScript for improved reliability and developer experience.
- **Centralized State Management**: Custom React hooks for managing state, logic, and API interactions.
- **Modern Confirmation Dialogs**: Replaces native browser alerts with sleek, custom alert dialogs for a better user experience.

## Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **Form Management**: React Hook Form
- **Schema Validation**: Zod
- **Table Management**: TanStack Table
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- A running instance of the Spring Boot Product Management API on `http://localhost:8080`.

### Installation

1. **Clone the repository and navigate to the frontend directory**:

   ```bash
   git clone <your-repository-url>
   cd frontend-react
   ```

2. **Install project dependencies**:

   ```bash
   npm install
   ```

3. **Ensure your API is running**, as the frontend will make requests to `http://localhost:8080`.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Project Structure

```
frontend-react/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives from shadcn/ui
│   │   │   ├── Button.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── ...and other shadcn components
│   │   ├── ProductDataTable.tsx
│   │   └── ProductForm.tsx
│   │
│   ├── hooks/
│   │   └── useProducts.ts      # Custom hook for all product logic
│   │
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── schemas.ts          # Zod validation schemas and TS types
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   └── ProductsPage.tsx    # Main page component
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Data Models (Types)

Types are derived directly from Zod schemas in `src/lib/schemas.ts` to ensure consistency between validation and the application's data structures.

### Product (Response)

This is the main product type used throughout the application.

```typescript
// Derived from productSchema
type Product = z.infer<typeof productSchema>;

// Example structure:
{
  id: number;
  title: string;
  handle: string;
  vendor: string;
  price: number;
  imageSrc: string;
}
```

### ProductFormData (Form Input)

This type is used for the create/edit product form.

```typescript
// Derived from productFormSchema
type ProductFormData = z.infer<typeof productFormSchema>;

// Example structure:
{
  title: string;
  handle: string;
  vendor: string;
  price: number;
  imageSrc: string;
}
```
