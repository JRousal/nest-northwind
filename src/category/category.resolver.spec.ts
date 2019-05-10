import { Test, TestingModule } from '@nestjs/testing';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';

describe(CategoryResolver, () => {
  let resolver: CategoryResolver;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([CategoryService]),
      ],
      providers: [CategoryService, CategoryResolver],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('ph', () => expect(true).toBeTruthy());

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [CategoryResolver],
  //   }).compile();

  //   resolver = module.get<CategoryResolver>(CategoryResolver);
  // });

  // it('should be defined', () => {
  //   expect(resolver).toBeDefined();
  // });
});
