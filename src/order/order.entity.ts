export class Order {
  id: number;
  customerId: number;
  employeeId?: number;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  shipperId?: number;
  freightCharge: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
}
