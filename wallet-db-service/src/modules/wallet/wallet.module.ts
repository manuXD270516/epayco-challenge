import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet/wallet.service';
import { WalletController } from './controllers/wallet/wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSession } from '../client/entities/payment-session.entity';
import { WalletTransaction } from '../client/entities/wallet-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction, PaymentSession])],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
