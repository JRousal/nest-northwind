import { Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

interface GetAllActionDecoratorOptions {}

export const GetAllAction = (
  options: GetAllActionDecoratorOptions = {},
): MethodDecorator => (
  target: object,
  key: string,
  descriptor: PropertyDescriptor,
) => {
  Get()(target, key, descriptor);
  ApiOkResponse({ isArray: true })(target, key, descriptor);
};
