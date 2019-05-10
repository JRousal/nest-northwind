import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUseTags, ApiNotAcceptableResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiUseTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ isArray: true })
  async getAll() {
    return await this.categoryService.find();
  }

  @Get(':id')
  @ApiOkResponse({})
  @ApiNotFoundResponse({
    description: 'No category with the specified id exists.',
  })

  async get(@Param('id') id: number) {
    return await this.categoryService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({})
  @ApiBadRequestResponse({
    description: 'There was an error creating the category.',
  })
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({})
  @ApiBadRequestResponse({
    description: 'There was an error updating the category.',
  })
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({})
  @ApiNotFoundResponse({
    description: 'The specified category does not exist.',
  })
  @ApiBadRequestResponse({
    description: 'There was an error deleting the category.',
  })
  async delete(@Param(':id') id: number) {
    return await this.categoryService.delete(id);
  }
}
