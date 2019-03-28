/* tslint:disable:variable-name */

import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Is,
  IsEmail,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import ShoppingList from './shopping-list';

@Table({tableName: 'user', freezeTableName: true, schema: 'public' })
export default class User extends Model<User> {

  @AllowNull(false)
  @Is('custom', (v) => {
    const pattern = /^[\p{L}-]{1,20}$/u; // allowing unicode characters
    if (!v.match(pattern))
      throw new Error(`"${v}" not valid`);
  })
  @Column({type: DataType.STRING(20)})
  public given_name: string;

  @AllowNull(false)
  @Is('custom', (v) => {
    const pattern = /^[\p{L}\s]{1,30}$/u;
    if (!v.match(pattern))
      throw new Error(`"${v}" not valid`);
  })
  @Column({type: DataType.STRING(30)})
  public last_name: string;

  @AllowNull(false)
  @IsEmail
  @Column({type: DataType.STRING(254)})
  public email: string;

  @AllowNull(false)
  @Column({type: DataType.BOOLEAN})
  public email_verified: boolean;

  @Column({type: DataType.STRING(60)})
  public password: string;

  @HasMany(() => ShoppingList)
  public shoppingLists: ShoppingList;

  @CreatedAt
  public created_at: Date;

  @UpdatedAt
  public updated_at: Date;

  @DeletedAt
  public deleted_at: Date;
}
