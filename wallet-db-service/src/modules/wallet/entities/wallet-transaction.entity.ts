import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class WalletTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'RECHARGE' | 'PAYMENT';

  @CreateDateColumn()
  createdAt: Date;
}
