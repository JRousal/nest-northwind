import { Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

export const CreateAction = (): MethodDecorator => (
  target: object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor,
) => {
  Post()(target, propertyKey, propertyDescriptor);
  ApiCreatedResponse({})(target, propertyKey, propertyDescriptor);
  ApiBadRequestResponse({})(target, propertyKey, propertyDescriptor);
};
