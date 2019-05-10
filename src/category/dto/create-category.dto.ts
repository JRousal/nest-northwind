import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class CreateCategoryDto
 */
@InputType()
export default class CreateCategoryDto {
  /**
   *The name of the category
   *
   * @type {string}
   * @memberof CreateCategoryDto
   */
  @Field()
  @ApiModelProperty({ minLength: 1, maxLength: 100, required: true })
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  /**
   *The description of the category
   *
   * @type {string}
   * @memberof CreateCategoryDto
   */
  @Field()
  @ApiModelProperty({ minLength: 1, maxLength: 255, required: true })
  @IsNotEmpty()
  @Length(1, 255)
  description: string;
}
