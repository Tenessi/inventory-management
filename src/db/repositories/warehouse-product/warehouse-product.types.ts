export type WarehouseProductInput = {
  quantity: number;
  productId: string;
  warehouseId: string;
};

export type WarehouseProductUpdateInput = Partial<WarehouseProductInput>;
