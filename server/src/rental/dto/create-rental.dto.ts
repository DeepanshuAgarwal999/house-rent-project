import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  houseId: number;

  @IsNotEmpty()
  @IsString()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
