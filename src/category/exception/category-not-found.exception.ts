import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`No category with id ${id} was found.`);
  }
}
