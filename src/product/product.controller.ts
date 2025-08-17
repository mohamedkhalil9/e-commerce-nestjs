import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Version,
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
  async getProducts(): Promise<{
    status: string;
    message?: string;
    data: Product[];
  }> {
    const products = await this.productService.getProducts();
    return { status: 'success', data: products };
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }
}
