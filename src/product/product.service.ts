import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          stock: createProductDto.stock,
          categoryId: createProductDto.categoryId,
        },
      });
      return product;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.prismaService.product.findMany({
        include: { category: true },
      });
      return products;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      return product;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error fetching product');
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
      });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      const updatedProduct = await this.prismaService.product.update({
        where: { id },
        data: {
          ...updateProductDto,
        },
      });

      return updatedProduct;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error updating product');
    }
  }
  async deleteProduct(id: string): Promise<string> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
      });

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      await this.prismaService.product.delete({
        where: { id },
      });

      return `Product with id ${id} deleted successfully`;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error deleting product');
    }
  }
}
