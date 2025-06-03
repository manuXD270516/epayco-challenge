import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PaymentSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  token: string;

  @Column()
  isConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
