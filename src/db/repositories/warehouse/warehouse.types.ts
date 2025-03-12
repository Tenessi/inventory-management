export type WarehouseInput = {
  name: string;
  capacity: number;
};

export type WarehouseUpdateInput = Partial<WarehouseInput>;
