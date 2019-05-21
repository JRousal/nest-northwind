import { InputType } from 'type-graphql';
import { StringDtoProperty } from 'src/decorators/string-dto-property.decorator';

@InputType()
export default class CreateCategoryDto {
  @StringDtoProperty({ maxLength: 100, required: true })
  name: string;

  @StringDtoProperty({ minLength: 1, required: true })
  description: string;
}
