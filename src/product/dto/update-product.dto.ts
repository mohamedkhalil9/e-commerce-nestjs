import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  stock?: number;
}
