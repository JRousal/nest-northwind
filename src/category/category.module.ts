import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoryService, CategoryResolver],
  controllers: [CategoryController],
})
export class CategoryModule {}
