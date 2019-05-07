import { BadRequestException } from '@nestjs/common';

export class UpdateCategoryException extends BadRequestException {
  constructor(id: number, error?: string) {
    super(`There was an error updating category ${id}.`, error);
  }
}
