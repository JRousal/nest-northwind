import { BadRequestException } from '@nestjs/common';

export class DeleteCategoryException extends BadRequestException {
  constructor(id: number, error?: string) {
    super(`There was an error deleting category ${id}.`, error);
  }
}
