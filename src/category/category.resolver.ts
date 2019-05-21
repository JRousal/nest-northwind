import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { IPubSubTriggers } from 'src/interfaces/pub-sub-triggers.interface';
import { CategoryDto } from './dto/category.dto';

@Injectable()
@Resolver(() => Category)
export class CategoryResolver {
  private readonly pubSub: PubSub;
  private readonly pubSubTriggers: IPubSubTriggers = {
    created: 'category-created',
    updated: 'category-updated',
    deleted: 'category-deleted',
  };

  constructor(private readonly categoryService: CategoryService) {
    this.pubSub = new PubSub();
    this.categoryService.categoryCreated.subscribe(category =>
      this.pubSub.publish(this.pubSubTriggers.created, {
        categoryCreated: category,
      }),
    );
    this.categoryService.categoryUpdated.subscribe(category =>
      this.pubSub.publish(this.pubSubTriggers.updated, {
        categoryUpdated: category,
      }),
    );
    this.categoryService.categoryDeleted.subscribe(category =>
      this.pubSub.publish(this.pubSubTriggers.deleted, {
        categoryDeleted: category,
      }),
    );
  }

  @Query(() => [CategoryDto])
  async categories() {
    return await this.categoryService.find();
  }

  @Query(() => CategoryDto)
  async category(@Args('id') id: number) {
    return await this.categoryService.findOneById(id);
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('params') dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(
    @Args('id') id: number,
    @Args('params') dto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, dto);
  }

  @Mutation(() => CategoryDto)
  async deleteCategory(@Args('id') id: number) {
    return await this.categoryService.delete(id);
  }

  @Subscription(() => CategoryDto)
  categoryCreated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.created);
  }

  @Subscription(() => CategoryDto)
  categoryUpdated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.updated);
  }

  @Subscription(() => CategoryDto)
  categoryDeleted() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.deleted);
  }
}
