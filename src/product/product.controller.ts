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
import { CreateProductDto } from './dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param() param: { id: string }) {
    return this.productService.getProduct(param.id);
  }

  @Patch(':id')
  updateProduct() { }

  @Delete(':id')
  deleteProduct() { }

  @Get('seed')
  seed() {
    return this.productService.seed();
  }
}
