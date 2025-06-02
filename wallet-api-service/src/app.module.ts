import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WalletController } from './controllers/wallet.controller';
import { ClientController } from './controllers/client.controller';
import { ProxyService } from './services/proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [WalletController, ClientController],
  providers: [ProxyService],
})
export class AppModule {}
