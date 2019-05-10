import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, CustomerResolver],
  controllers: [CustomerController],
})
export class CustomerModule {}
