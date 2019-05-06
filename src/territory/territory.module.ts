import { Module } from '@nestjs/common';
import { TerritoryService } from './territory.service';
import { TerritoryController } from './territory.controller';

@Module({
  providers: [TerritoryService],
  controllers: [TerritoryController]
})
export class TerritoryModule {}
