import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver('Category')
export class CategoryResolver {
  private readonly pubSub: PubSub;
  constructor(private readonly categoryService: CategoryService) {
    this.pubSub = new PubSub();
    this.categoryService.categoryCreated.subscribe(category =>
      this.pubSub.publish('category-created', category),
    );
    this.categoryService.categoryUpdated.subscribe(category =>
      this.pubSub.publish('category-updated', category),
    );
    this.categoryService.categoryDeleted.subscribe(category =>
      this.pubSub.publish('category-deleted', category),
    );
  }

  @Query()
  async categories() {
    return await this.categoryService.find();
  }

  @Query()
  async category(@Args('id') id: number) {
    return await this.categoryService.findOneById(id);
  }

  @Mutation()
  async createCategory(@Args() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Mutation()
  async updateCategory(@Args() id: number, @Args() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @Mutation()
  async deleteCategory(@Args() id: number) {
    return await this.categoryService.delete(id);
  }

  @Subscription()
  categoryCreated() {
    return this.pubSub.asyncIterator('category-created');
  }

  @Subscription()
  categoryUpdated() {
    return this.pubSub.asyncIterator('category-updated');
  }

  @Subscription()
  categoryDeleted() {
    return this.pubSub.asyncIterator('category-deleted');
  }
}
