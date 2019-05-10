import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@InputType()
export default class CreateCategoryDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiModelProperty({
    description: 'Cateogory name',
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiModelProperty({
    description: 'Category description',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  description: string;
}
