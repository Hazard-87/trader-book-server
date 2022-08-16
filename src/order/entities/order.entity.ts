export class Order {}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column()
  buy: 'long' | 'short';

  @Column()
  startDate: Date;

  @Column()
  startPrice: number;

  @Column()
  volume: number;

  @Column()
  endDate: Date;

  @Column()
  endPrice: number;

  @Column()
  commission: number;

  @Column()
  channel: number;
}