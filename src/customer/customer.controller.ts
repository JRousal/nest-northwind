import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-custoner.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAll() {
    return await this.customerService.find();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.customerService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    return await this.customerService.create(dto);
  }

  @Patch()
  async update(@Param('id') id: number, @Body() dto: UpdateCustomerDto) {
    return await this.customerService.update(id, dto);
  }

  @Delete()
  async delete(@Param('id') id: number) {
    return await this.customerService.delete(id);
  }
}
