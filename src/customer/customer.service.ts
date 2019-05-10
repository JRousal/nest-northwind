import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { Subject, ReplaySubject } from 'rxjs';
import { CustomerNotFoundException } from './exception/customer-not-found.exception';
import { CreateCustomerDto } from './dto/create-custoner.dto';
import { CreateCustomerException } from './exception/create-customer.exception';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateCustomerException } from './exception/update-customer.exception';
import { DeleteCustomerException } from './exception/delete-customer.exception';

@Injectable()
export class CustomerService {
  public readonly customerCreated: Subject<Customer>;
  public readonly customerUpdated: Subject<Customer>;
  public readonly customerDeleted: Subject<Customer>;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {
    this.customerCreated = new ReplaySubject();
    this.customerUpdated = new ReplaySubject();
    this.customerDeleted = new ReplaySubject();
  }

  async find() {
    return await this.customerRepository.find();
  }

  async findOneById(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new CustomerNotFoundException(id);
    }
    return customer;
  }

  async create(dto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create({ ...dto });
      await this.customerRepository.insert(customer);
      this.customerCreated.next(customer);
      return customer;
    } catch (error) {
      throw new CreateCustomerException(error);
    }
  }

  async update(id: number, dto: UpdateCustomerDto) {
    try {
      await this.customerRepository.update(id, { ...dto });
      const customer = await this.findOneById(id);
      this.customerUpdated.next(customer);
      return customer;
    } catch (error) {
      throw new UpdateCustomerException(error);
    }
  }

  async delete(id: number) {
    try {
      const customer = await this.findOneById(id);
      await this.customerRepository.delete(id);
      this.customerDeleted.next(customer);
      return customer;
    } catch (error) {
      throw new DeleteCustomerException(error);
    }
  }
}
