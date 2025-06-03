import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSession } from './entities/payment-session.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction, PaymentSession])],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
