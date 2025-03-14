export type ProductInput = {
  name: string;
  description: string;
  price: number;
};

export type ProductUpdateInput = Partial<ProductInput>;
