export type WarehouseInput = {
  name: string;
  capasity: number;
};

export type WarehouseUpdateInput = Partial<WarehouseInput>;
