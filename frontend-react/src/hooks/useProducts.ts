import { useState, useEffect, useCallback, useDeferredValue } from "react";
import { z } from "zod";
import {
  productSchema,
  type Product,
  type ProductFormData,
} from "@/lib/schemas";
import axiosClient from "@/lib/axios";
import {
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";

// Define the API response structure for paginated data
const apiResponseSchema = z.object({
  content: z.array(productSchema.and(z.object({ id: z.number() }))),
  totalPages: z.number(),
  totalElements: z.number(),
  number: z.number(), // Current page number
});

type DialogState = {
  isOpen: boolean;
  title: string;
  type: "delete" | "bulkDelete" | null;
  description: string;
  onConfirm: () => void;
};

export type ProductFilters = {
  vendor?: string;
  minPrice?: number;
  maxPrice?: number;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [vendors, setVendors] = useState<string[]>([]);

  // Table state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: true },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deferredSearchTerm] = useDeferredValue(searchTerm);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [filters, setFilters] = useState<ProductFilters>({});

  // Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Dialog state
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const fetchProducts = useCallback(
    async (
      currentPage: number,
      search: string,
      sort: SortingState,
      currentFilters: ProductFilters
    ) => {
      setLoading(true);
      setError(null);
      setRowSelection({}); // <-- Reset selection on every refetch
      try {
        const sortParam =
          sort.length > 0
            ? `${sort[0].id},${sort[0].desc ? "desc" : "asc"}`
            : "id,desc";

        const params = {
          page: currentPage,
          size: 10,
          sort: sortParam,
          search: search || undefined,
          vendor:
            currentFilters.vendor == "All"
              ? undefined
              : currentFilters.vendor || undefined,
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
        };
        const response = await axiosClient.get("/products", { params });
        const parsedData = apiResponseSchema.parse(response.data);
        setProducts(parsedData.content);
        setTotalPages(parsedData.totalPages);
        setTotalElements(parsedData.totalElements);
        setPage(parsedData.number);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts(page, deferredSearchTerm, sorting, filters);
  }, [page, deferredSearchTerm, sorting, filters, fetchProducts]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosClient.get<string[]>("/products/vendors");
        setVendors(response.data);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      }
    };
    fetchVendors();
  }, []);

  const handleOpenForm = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        await axiosClient.put(`/products/${editingProduct.id}`, data);
      } else {
        await axiosClient.post("/products", data);
      }
      fetchProducts(page, deferredSearchTerm, sorting, filters);
      handleCloseForm();
    } catch (err) {
      console.error("Failed to save product:", err);
      setError("Failed to save product.");
    }
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  const handleDeleteProduct = (id: number) => {
    setDialogState({
      isOpen: true,
      type: "delete",
      title: "Are you sure?",
      description:
        "This action cannot be undone. This will permanently delete the product.",
      onConfirm: async () => {
        try {
          await axiosClient.delete(`/products/${id}`);
          fetchProducts(page, deferredSearchTerm, sorting, filters);
        } catch (err) {
          console.error("Failed to delete product:", err);
          setError("Failed to delete product.");
        }
        closeDialog();
      },
    });
  };

  const handleBulkDelete = (ids: number[]) => {
    setDialogState({
      isOpen: true,
      type: "bulkDelete",
      title: `Delete ${ids.length} products?`,
      description:
        "This action cannot be undone. This will permanently delete the selected products.",
      onConfirm: async () => {
        try {
          if (ids.length > 0) {
            // Spring Boot doesn't typically support bulk delete via a single endpoint with IDs in the body
            // Send multiple requests. This can be optimized on the backend if needed.
            await Promise.all(
              ids.map((id) => axiosClient.delete(`/products/${id}`))
            );
            fetchProducts(0, deferredSearchTerm, sorting, filters);
          }
        } catch (err) {
          console.error("Failed to delete products:", err);
          setError("Failed to delete selected products.");
        }
        closeDialog();
      },
    });
  };

  return {
    products,
    page,
    setPage,
    totalPages,
    totalElements,
    loading,
    error,
    isFormOpen,
    editingProduct,
    dialogState,
    searchTerm,
    setSearchTerm,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    vendors,
    setVendors,
    filters,
    setFilters,
    closeDialog,
    handleOpenForm,
    handleCloseForm,
    handleSaveProduct,
    handleBulkDelete,
    handleDeleteProduct,
  };
}
