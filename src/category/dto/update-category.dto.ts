import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { isNullOrUndefined } from 'util';

@InputType()
export class UpdateCategoryDto {
  @Field({ nullable: true })
  @Length(1, 100)
  @ApiModelProperty({
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  name?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  @ApiModelProperty({
    minLength: 1,
    maxLength: 255,
    required: false,
  })
  description?: string;
}
