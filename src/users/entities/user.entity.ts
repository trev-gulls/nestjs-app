import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ allowNull: false, unique: true, validate: { isEmail: true } })
  email: string;

  @Column({ allowNull: false, unique: true, validate: { is: /^\w+$/ } })
  name: string;
}
