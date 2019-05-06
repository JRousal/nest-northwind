import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { ShipperModule } from './shipper/shipper.module';
import { SupplierModule } from './supplier/supplier.module';
import { TerritoryModule } from './territory/territory.module';
import { EmployeeTerritoryModule } from './employee-territory/employee-territory.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    CategoryModule,
    CustomerModule,
    EmployeeModule,
    OrderModule,
    ProductModule,
    RegionModule,
    ShipperModule,
    SupplierModule,
    TerritoryModule,
    EmployeeTerritoryModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
