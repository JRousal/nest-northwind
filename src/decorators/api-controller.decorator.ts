import 'reflect-metadata';
import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as Pluralize from 'pluralize';

interface ApiControllerDecoratorOptions {
  route?: string;
}

const toKebabCase = (value: string) => {
  console.log(value);
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const getDefaultRouteName = (className: string) => {
  let name = '';
  if (className.endsWith('Controller')) {
    const index = className.lastIndexOf('Controller');
    name = className.substring(0, index);
  } else {
    name = className;
  }

  if (Pluralize.isSingular(name)) {
    name = Pluralize(name);
  }

  return name;
};

// export const ApiController: ClassDecorator = () => (target: Function) => {};

export const ApiController = (
  options: ApiControllerDecoratorOptions = {},
): ClassDecorator => (target: Function) => {
  const routeName = options.route
    ? options.route
    : getDefaultRouteName(target.name);
  Controller(toKebabCase(routeName))(target);
  ApiUseTags(routeName)(target);
};
