import * as z from "zod";

export type ProductFormData = z.infer<typeof productSchema>;
export type Product = ProductFormData & {
  id: number;
};
export const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  handle: z
    .string()
    .min(3, { message: "Handle must be at least 3 characters." }),
  vendor: z
    .string()
    .min(2, { message: "Vendor must be at least 2 characters." }),
  price: z.coerce
    .number<number>("Price must be a number!")
    .positive("Price must be positive!"),
  imageSrc: z.url({ message: "Please enter a valid URL." }),
});
