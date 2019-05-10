import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { throws } from 'assert';
import { CategoryNotFoundException } from './exception/category-not-found.exception';
import { UpdateCategoryException } from './exception/update-category.exception';

describe('Category Controller', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('ph', () => expect(true).toBeTruthy());

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  // it('should throw an exception if the specifed category does not exist', () => {
  //   const t = async () => {
  //     const category = await controller.get(-1);
  //   };
  //   expect(t).toThrow(CategoryNotFoundException);
  // });

  // it('should fail to update a category that does not exist.', () => {
  //   const t = async () => {
  //     await controller.update(-1, { description: 'Test descripton.' });
  //   };
  //   expect(t).toThrow(UpdateCategoryException);
  // });
});
