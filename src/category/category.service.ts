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
    const categories = await this.prismaService.category.findMany();
    return categories;
  }

  async getCategory(id: string) {
    const category = await this.prismaService.category.findUniqueOrThrow({
      where: { id },
    });
    return category;
  }
}
