import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;
}
