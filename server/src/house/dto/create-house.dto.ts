import {
  IsCurrency,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateHouseDto {
  @IsString()
  @IsNotEmpty()
  address: string; // Address of the house

  @IsString()
  @IsOptional()
  img_url: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsPositive()
  size: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfRooms?: number;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber() // Ensure price has up to 2 decimal places
  price?: number; // Price of the house (optional)
}
