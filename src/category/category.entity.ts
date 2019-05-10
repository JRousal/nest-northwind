import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({length: 50})
  @Field()
  name: string;

  @Column({length: 255})
  @Field()
  description: string;
}
