import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateCategoryDto {
  @Field() name?: string;
  @Field() description?: string;
}
