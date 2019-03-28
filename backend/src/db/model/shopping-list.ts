/* tslint:disable:variable-name */

import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Is,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import User from './user';

@Table({tableName: 'shopping_list', freezeTableName: true, schema: 'public' })
export default class ShoppingList extends Model<ShoppingList> {

    @AllowNull(false)
    @Is(new RegExp(/^[\p{L}\p{N}0-9 .-]{1,40}$/, 'u'))
    @Column({type: DataType.STRING(40)})
    public name: string;

    @AllowNull(false)
    @Column({type: DataType.JSONB})
    public data: object;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    public user_id: number;

    @BelongsTo(() => User)
    public user: User;

    @CreatedAt
    public created_at: Date;

    @UpdatedAt
    public updated_at: Date;

    @DeletedAt
    public deleted_at: Date;
}
