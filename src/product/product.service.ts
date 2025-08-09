import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  async createProduct(createProductDto: CreateProductDto) {
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
    } catch (error) {
      throw new InternalServerErrorException('Error creating product', error);
    }
  }

  async getProducts() {
    const products = this.prismaService.product.findMany({
      include: { category: true },
    });
    return products;
  }

  async getProduct(id: string) {
    const product = this.prismaService.product.findUniqueOrThrow({
      where: { id },
      include: {
        category: true,
      },
    });

    return product;
  }

  async updateProduct() { }
  async deleteProduct() { }
}
