import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTerritoryController } from './employee-territory.controller';

describe('EmployeeTerritory Controller', () => {
  let controller: EmployeeTerritoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeTerritoryController],
    }).compile();

    controller = module.get<EmployeeTerritoryController>(EmployeeTerritoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
