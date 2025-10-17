import { ProductDataTable, columns } from "@/components/ProductDataTable";
import ProductForm from "@/components/ProductForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts, type ProductFilters } from "@/hooks/useProducts";
import { PlusCircle, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

const FilterPopoverContent = ({
  initialFilters,
  vendors,
  onApply,
  onReset,
}: {
  initialFilters: ProductFilters;
  vendors: string[];
  onApply: (filters: ProductFilters) => void;
  onReset: () => void;
}) => {
  const [vendor, setVendor] = useState(initialFilters.vendor || "All");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");

  const handleApply = () => {
    onApply({
      vendor: vendor || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  const handleReset = () => {
    setVendor("");
    setMinPrice("");
    setMaxPrice("");
    onReset();
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filters</h4>
        <p className="text-sm text-muted-foreground">
          Set filters for the product list.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="vendor">Vendor</Label>
          <Select value={vendor} onValueChange={setVendor}>
            <SelectTrigger className="col-span-2 h-8">
              <SelectValue placeholder="All Vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Vendors</SelectItem>
              {vendors.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="col-span-2 h-8"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
        <Button size="sm" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export function ProductsPage() {
  const {
    products,
    page,
    setPage,
    totalPages,
    totalElements,
    loading,
    error,
    vendors,
    isFormOpen,
    editingProduct,
    dialogState,
    searchTerm,
    setSearchTerm,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    filters,
    setFilters,
    closeDialog,
    handleOpenForm,
    handleCloseForm,
    handleSaveProduct,
    handleBulkDelete,
    handleDeleteProduct,
  } = useProducts();

  const selectedIds = Object.keys(rowSelection)
    .filter((key) => rowSelection[key])
    .map((key) => products[parseInt(key, 10)]?.id)
    .filter((id) => id !== undefined);

  const handleApplyFilters = (newFilters: ProductFilters) => {
    setPage(0);
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setPage(0);
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <FilterPopoverContent
                  initialFilters={filters}
                  vendors={vendors}
                  onApply={handleApplyFilters}
                  onReset={handleResetFilters}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={() => handleOpenForm()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Total {totalElements} products
          </div>
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => handleBulkDelete(selectedIds)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedIds.length})
            </Button>
          )}
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <ProductDataTable
          columns={columns}
          data={products}
          loading={loading}
          onEdit={handleOpenForm}
          onDelete={handleDeleteProduct}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>

      <ProductForm
        key={editingProduct?.id || "new-product"}
        isOpen={isFormOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={handleCloseForm}
      />

      <AlertDialog open={dialogState.isOpen} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogState.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={dialogState.onConfirm}
              className={
                dialogState.type === "delete" ||
                dialogState.type === "bulkDelete"
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
