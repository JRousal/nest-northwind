import { BadRequestException } from '@nestjs/common';

export class UpdateCustomerException extends BadRequestException {
  constructor(error?: string) {
    super('There was an error updating the customer.', error);
  }
}
