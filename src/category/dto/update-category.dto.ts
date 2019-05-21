import { InputType } from 'type-graphql';
import { StringDtoProperty } from 'src/decorators/string-dto-property.decorator';

@InputType()
export class UpdateCategoryDto {
  @StringDtoProperty({
    minLength: 1,
    maxLength: 100,
    description: 'Category name',
    required: false,
  })
  name?: string;

  @StringDtoProperty({
    minLength: 1,
    maxLength: 255,
    description: 'Category description',
    required: false,
  })
  description?: string;
}
