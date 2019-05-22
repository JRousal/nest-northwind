import { Column } from 'typeorm';

interface StringEntityPropertyOptions {
  required?: boolean;
  length?: number;
}

const defaultOptions: StringEntityPropertyOptions = {
  required: false,
  length: 255,
};

const applyDefaultOptions = (opts: StringEntityPropertyOptions = {}) => {
  const options = {} as StringEntityPropertyOptions;
  Object.assign(options, defaultOptions);
  Object.assign(options, opts);
  return options;
};

export const StringEntityProperty = (
  opts: StringEntityPropertyOptions = {},
): PropertyDecorator => (target: any, key: string) => {
  const options = applyDefaultOptions(opts);
  Column({ nullable: !options.required, length: options.length })(target, key);
};
