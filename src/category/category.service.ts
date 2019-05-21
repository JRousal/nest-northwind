import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import CreateCategoryDto from './dto/create-category.dto';
import { ReplaySubject, Subject } from 'rxjs';
import { CategoryNotFoundException } from './exception/category-not-found.exception';
import { CreateCategoryException } from './exception/create-category.exception';
import { UpdateCategoryException } from './exception/update-category.exception';
import { DeleteCategoryException } from './exception/delete-category.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  public readonly categoryCreated: Subject<CategoryDto>;
  public readonly categoryUpdated: Subject<CategoryDto>;
  public readonly categoryDeleted: Subject<CategoryDto>;

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {
    this.categoryCreated = new ReplaySubject();
    this.categoryUpdated = new ReplaySubject();
    this.categoryDeleted = new ReplaySubject();
  }

  async find(): Promise<CategoryDto[]> {
    const categories = await this.repository.find();
    const items = categories.map(category => new CategoryDto(category));
    return items;
  }

  async findOneById(id: number): Promise<CategoryDto> {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return new CategoryDto(category);
  }

  async create(dto: CreateCategoryDto): Promise<CategoryDto> {
    try {
      const category = this.repository.create({ ...dto });
      await this.repository.insert(category);
      const categoryDto = new CategoryDto(category);
      this.categoryCreated.next(categoryDto);
      return categoryDto;
    } catch (error) {
      throw new CreateCategoryException(error);
    }
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<CategoryDto> {
    try {
      await this.repository.update(id, { ...dto });
      const category = await this.findOneById(id);
      const categoryDto = new CategoryDto(category);
      this.categoryUpdated.next(categoryDto);
      return categoryDto;
    } catch (error) {
      throw new UpdateCategoryException(id, error);
    }
  }

  async delete(id: number): Promise<CategoryDto> {
    try {
      const category = await this.findOneById(id);
      await this.repository.delete(id);
      this.categoryDeleted.next(category);
      return category;
    } catch (error) {
      throw new DeleteCategoryException(id);
    }
  }
}
