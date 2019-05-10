import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCustomerDto {
  @Field()
  companyName: string;
  @Field()
  contactName: string;
  @Field()
  contactTitle: string;
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  region: string;
  @Field()
  postalCode: string;
  @Field()
  country: string;
  @Field()
  phone: string;
  @Field()
  fax: string;
}
