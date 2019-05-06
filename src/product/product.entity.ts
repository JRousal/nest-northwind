export class Product {
  id: number;
  name: string;
  supplierId?: number;
  categoryId?: number;
  quantityPerUnit: string;
  unitPrice?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued: boolean;
}
