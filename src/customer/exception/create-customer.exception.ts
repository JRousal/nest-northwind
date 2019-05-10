import { BadRequestException } from '@nestjs/common';

export class CreateCustomerException extends BadRequestException {
  constructor(error?: string) {
    super('There was an error creating the customer', error);
  }
}
