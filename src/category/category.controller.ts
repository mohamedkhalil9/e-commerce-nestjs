import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategory(@Param() params: { id: string }): Promise<Category> {
    return this.categoryService.getCategory(params.id);
  }

  @Patch(':id')
  updateCategory(
    @Param() params: { id: string },
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(params.id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param() params: { id: string }): Promise<string> {
    return this.categoryService.deleteCategory(params.id);
  }
}
