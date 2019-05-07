import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCategoryDto {
  @Field() name?: string;
  @Field() description?: string;
}
