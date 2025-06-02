import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ClientModule } from './modules/client/client.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientModule,
    WalletModule,
  ],
})
export class AppModule {}
