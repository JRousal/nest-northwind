import { Field } from 'type-graphql';
import { IsString, Length, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

interface StringDtoPropertyOptions {
  required?: boolean;
  description?: string;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

const defaultOptions: StringDtoPropertyOptions = {
  required: false,
  description: '',
  maxLength: 255,
  minLength: 0,
  regex: new RegExp(/.*?/),
};

const applyDefaultOptions = (opts: StringDtoPropertyOptions = {}) => {
  const options = {} as StringDtoPropertyOptions;
  Object.assign(options, defaultOptions);
  Object.assign(options, opts);
  return options;
};

export const StringDtoProperty = (
  opts: StringDtoPropertyOptions = {},
) => (target: any, key: string) => {
  const options = applyDefaultOptions(opts);

  // Validation
  IsString()(target, key);
  Length(options.minLength, options.maxLength)(target, key);
  Matches(options.regex)(target, key);

  // GraphQL
  Field(() => String, {
    nullable: !options.required,
    description: options.description,
  })(target, key);

  // Swagger
  ApiModelProperty({
    description: options.description,
    required: options.required,
    minLength: options.minLength,
    maxLength: options.maxLength,
  })(target, key);
};
