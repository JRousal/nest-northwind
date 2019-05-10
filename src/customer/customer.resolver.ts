import { Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-custoner.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';
import { PubSub } from 'graphql-subscriptions';
import { IPubSubTriggers } from 'src/interfaces/pub-sub-triggers.interface';
import { Query } from '@nestjs/graphql';
import { Arg } from 'type-graphql';

@Resolver(() => Customer)
export class CustomerResolver {
  private readonly pubSub: PubSub;
  private readonly pubSubTriggers: IPubSubTriggers = {
    created: 'customer-created',
    updated: 'customer-updated',
    deleted: 'customer-deleted',
  };

  constructor(private readonly customerService: CustomerService) {
    this.pubSub = new PubSub();
    this.customerService.customerCreated.subscribe(customer =>
      this.pubSub.publish(this.pubSubTriggers.created, {
        customerCreated: customer,
      }),
    );
    this.customerService.customerUpdated.subscribe(customer =>
      this.pubSub.publish(this.pubSubTriggers.updated, {
        customerUpdated: customer,
      }),
    );
    this.customerService.customerDeleted.subscribe(customer =>
      this.pubSub.publish(this.pubSubTriggers.deleted, {
        customerDeleted: customer,
      }),
    );
  }

  @Query(() => [Customer])
  async customers() {
    return await this.customerService.find();
  }

  @Query(() => Customer)
  async customer(@Arg('id') id: number) {
    return await this.customerService.findOneById(id);
  }

  @Mutation(() => Customer)
  async createCustomer(@Arg('dto') dto: CreateCustomerDto) {
    return await this.customerService.create(dto);
  }

//   @Mutation(() => Customer)
//   async updateCustomer(@Arg('id') id: number, @Arg('dto') dto: UpdateCustomerDto) {
//     return await this.customerService.update(id, dto);
//   }

  @Mutation(() => Customer)
  async deleteCustomer(@Arg('id') id: number) {
    return await this.customerService.delete(id);
  }

  @Subscription(() => Customer)
  customerCreated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.created);
  }

  @Subscription(() => Customer)
  customerUpdated() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.updated);
  }

  @Subscription(() => Customer)
  customerDeleted() {
    return this.pubSub.asyncIterator(this.pubSubTriggers.deleted);
  }
}
