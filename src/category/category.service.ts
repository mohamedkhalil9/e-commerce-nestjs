import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description,
        },
      });

      return category;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.prismaService.category.findMany();
      return categories;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getCategory(id: string): Promise<Category> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });

      if (!category)
        throw new NotFoundException(`Category with id ${id} not found`);

      return category;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });

      if (!category)
        throw new NotFoundException(`Category with id ${id} not found`);

      const updatedCategory = await this.prismaService.category.update({
        where: { id },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description,
        },
      });

      return updatedCategory;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteCategory(id: string): Promise<string> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });

      if (!category)
        throw new NotFoundException(`Category with id ${id} not found`);

      await this.prismaService.category.delete({ where: { id } });
      return `Category with id ${id} deleted successfully`;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
