import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { WarehouseDto } from 'src/api/v1/dto/warehouse.dto';

type WarehouseRequestType = Omit<WarehouseDto, 'id'>;

export class WarehouseRequestDto implements WarehouseRequestType {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  capacity: number;

  constructor(name: string, capasity: number) {
    this.name = name;
    this.capacity = capasity;
  }
}
