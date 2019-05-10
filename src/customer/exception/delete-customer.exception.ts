import { BadRequestException } from '@nestjs/common';

export class DeleteCustomerException extends BadRequestException {
  constructor(error?: string) {
    super('There was an error deleting the customer.', error);
  }
}
