import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
  controllers: [CategoryController]
})
export class CategoryModule {}
