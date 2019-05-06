import { Module } from '@nestjs/common';
import { EmployeeTerritoryService } from './employee-territory.service';
import { EmployeeTerritoryController } from './employee-territory.controller';

@Module({
  providers: [EmployeeTerritoryService],
  controllers: [EmployeeTerritoryController]
})
export class EmployeeTerritoryModule {}
