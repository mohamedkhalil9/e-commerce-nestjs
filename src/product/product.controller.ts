import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param() param: { id: string }): Promise<Product> {
    return this.productService.getProduct(param.id);
  }

  @Patch(':id')
  updateProduct(
    @Param() params: { id: string },
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(params.id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param() params: { id: string }): Promise<string> {
    return this.productService.deleteProduct(params.id);
  }
}
