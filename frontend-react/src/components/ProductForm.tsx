import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type Product,
  type ProductFormData,
} from "../lib/schemas";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ProductFormProps {
  isOpen: boolean;
  product: Product | null;
  onSave: (data: ProductFormData, id?: number) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  product,
  onSave,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      title: "",
      handle: "",
      vendor: "",
      price: 0,
      imageSrc: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    onSave(data, product?.id);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Create New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to {product ? "update the" : "add a new"}{" "}
            product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Input placeholder="Product Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="Handle" {...register("handle")} />
            {errors.handle && (
              <p className="text-red-500 text-xs mt-1">
                {errors.handle.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="Vendor" {...register("vendor")} />
            {errors.vendor && (
              <p className="text-red-500 text-xs mt-1">
                {errors.vendor.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="Image URL" {...register("imageSrc")} />
            {errors.imageSrc && (
              <p className="text-red-500 text-xs mt-1">
                {errors.imageSrc.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose onClick={onCancel}>Cancel</DialogClose>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
