import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
class User extends Model<User> {
  @Column
  userId!: number;

  @Column
  address!: string;

  @Column
  txnCount!: number;

  @Column
  @CreatedAt
  createdAt!: Date;

  @Column
  @UpdatedAt
  updatedAt!: Date;
}

export default User;
