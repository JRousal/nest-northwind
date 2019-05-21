import { NumberDtoProperty } from 'src/decorators/number-dto-property.decorator';
import { StringDtoProperty } from 'src/decorators/string-dto-property.decorator';
import { ObjectType } from 'type-graphql';
import { Category } from '../category.entity';

@ObjectType()
export class CategoryDto {
  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
  }

  @NumberDtoProperty()
  id: number;

  @StringDtoProperty()
  name: string;

  @StringDtoProperty()
  description: string;
}
