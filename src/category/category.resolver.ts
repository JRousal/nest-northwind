import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';

interface IPubSubTriggers {
  readonly created: string;
  readonly updated: string;
  readonly deleted: string;
}

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

  @Query(() => [Category])
  async categories() {
    return await this.categoryService.find();
  }

  @Query(() => Category)
  async category(@Args('id') id: number) {
    return await this.categoryService.findOneById(id);
  }

  @Mutation(() => Category)
  async createCategory(@Args('params') dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: number,
    @Args('params') dto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, dto);
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number) {
    return await this.categoryService.delete(id);
  }

  @Subscription(() => Category)
  categoryCreated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.created);
  }

  @Subscription(() => Category)
  categoryUpdated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.updated);
  }

  @Subscription(() => Category)
  categoryDeleted() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.deleted);
  }
}
