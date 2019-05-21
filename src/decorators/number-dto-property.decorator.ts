import { Field, Int } from 'type-graphql';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

interface NumberDtoPropertyOptions {
  required?: boolean;
  description?: string;
  minValue?: number;
  maxValue?: number;
  allowNaN?: boolean;
}

const defaultOptions: NumberDtoPropertyOptions = {
  description: '',
  maxValue: null,
  minValue: null,
  required: false,
  allowNaN: false,
};

const applyDefaultOptions = (opts: NumberDtoPropertyOptions = {}) => {
  const options = {} as NumberDtoPropertyOptions;
  Object.assign(options, defaultOptions);
  Object.assign(options, opts);
  return options;
};

export const NumberDtoProperty: PropertyDecorator = (
  opts?: NumberDtoPropertyOptions,
) => (target: any, key: string) => {
  const options = applyDefaultOptions(opts);

  // Validation
  IsNumber({ allowNaN: options.allowNaN });

  // GraphQL
  Field(() => Int, {
    nullable: !options.required,
    description: options.description,
  })(target, key);

  // Swagger
  ApiModelProperty()(target, key);
};
