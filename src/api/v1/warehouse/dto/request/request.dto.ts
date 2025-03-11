import { WarehouseDto } from 'src/api/v1/dto/warehouse.dto';

type WarehouseRequestType = Omit<WarehouseDto, 'id'>;

export class WarehouseRequestDto implements WarehouseRequestType {
  name: string;
  capasity: number;

  constructor(name: string, capasity: number) {
    this.name = name;
    this.capasity = capasity;
  }
}
