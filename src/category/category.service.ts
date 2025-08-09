import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description,
        },
      });

      return category;
    } catch (error) {
      throw new InternalServerErrorException('Error creating category', error);
    }
  }

  async getCategories() {
    return this.prismaService.category.findMany();
  }

  async seed() {
    const categories = [
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
      { name: 'Home & Kitchen' },
      { name: 'Sports & Outdoors' },
    ];

    await this.prismaService.category.createMany({ data: categories });

    return { message: 'Categories seeded successfully' };
  }
}
