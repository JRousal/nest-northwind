import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const GetAction = (key: string): MethodDecorator => (
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor,
) => {
  Get(key)(target, propertyKey, propertyDescriptor);
  ApiOkResponse({})(target, propertyKey, propertyDescriptor);
  ApiNotFoundResponse({})(target, propertyKey, propertyDescriptor);
};
