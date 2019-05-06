import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTerritoryService } from './employee-territory.service';

describe('EmployeeTerritoryService', () => {
  let service: EmployeeTerritoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTerritoryService],
    }).compile();

    service = module.get<EmployeeTerritoryService>(EmployeeTerritoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
