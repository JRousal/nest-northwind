import { BadRequestException } from '@nestjs/common';

export class CreateCategoryException extends BadRequestException {
  constructor(error?: string) {
    super('There was an error creating the category.', error);
  }
}
