import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateCategoryDto {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  description?: string;
}
