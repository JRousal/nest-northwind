import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StringEntityProperty } from 'src/decorators/string-entity-property.decorator';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @StringEntityProperty({length: 50, required: true})
  name: string;

  @StringEntityProperty()
  description: string;
}
