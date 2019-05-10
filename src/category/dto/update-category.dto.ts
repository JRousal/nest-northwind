import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@InputType()
export class UpdateCategoryDto {
  @Field({ nullable: true })
  @ApiModelProperty({ minLength: 1, maxLength: 100, required: false })
  @Length(1, 100)
  name?: string;

  @Field({ nullable: true })
  @ApiModelProperty({ minLength: 1, maxLength: 255, required: false })
  @Length(1, 255)
  description?: string;
}
