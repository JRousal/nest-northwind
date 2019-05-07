import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ReplaySubject, Subject } from 'rxjs';
import { CategoryRepository } from './category.repository';
import { CategoryNotFoundException } from './exception/category-not-found.exception';
import { CreateCategoryException } from './exception/create-category.exception';
import { UpdateCategoryException } from './exception/update-category.exception';
import { DeleteCategoryException } from './exception/delete-category.exception';

@Injectable()
export class CategoryService {
  public readonly categoryCreated: Subject<Category>;
  public readonly categoryUpdated: Subject<Category>;
  public readonly categoryDeleted: Subject<Category>;

  constructor(private readonly repository: CategoryRepository) {
    this.categoryCreated = new ReplaySubject();
    this.categoryUpdated = new ReplaySubject();
    this.categoryDeleted = new ReplaySubject();
  }

  async find(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<Category> {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.repository.create({ ...dto });
      await this.repository.insert(category);
      this.categoryCreated.next(category);
      return category;
    } catch (error) {
      throw new CreateCategoryException(error);
    }
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    try {
      await this.repository.update(id, { ...dto });
      const category = await this.findOneById(id);
      this.categoryUpdated.next(category);
      return category;
    } catch (error) {
      throw new UpdateCategoryException(id, error);
    }
  }

  async delete(id: number): Promise<Category> {
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
