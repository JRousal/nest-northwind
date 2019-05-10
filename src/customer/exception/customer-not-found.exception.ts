import { NotFoundException } from '@nestjs/common';

export class CustomerNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`No customer with id ${id} was found.`);
  }
}
