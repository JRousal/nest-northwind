import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAll() {
    return await this.categoryService.find();
  }
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.categoryService.findOneById(id);
  }
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }
  @Patch(':id')
  async update(@Param('id') id: number, dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param(':id') id: number) {
    return await this.categoryService.delete(id);
  }
}
