import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;
  @Column()
  @Field()
  companyName: string;
  @Column()
  @Field()
  contactName: string;
  @Column()
  @Field()
  contactTitle: string;
  @Column()
  @Field()
  address: string;
  @Column()
  @Field()
  city: string;
  @Column()
  @Field()
  region: string;
  @Column()
  postalCode: string;
  @Column()
  @Field()
  country: string;
  @Column()
  @Field()
  phone: string;
  @Column()
  @Field()
  fax: string;
}
