import { Controller, Post, Body } from '@nestjs/common';
import { ProxyService } from '../services/proxy.service';
import {
  RechargeDto,
  BalanceDto,
  StartPaymentDto,
  ConfirmPaymentDto,
} from '../common/dtos';

@Controller('wallet')
export class WalletController {
  constructor(private readonly proxy: ProxyService) {}

  @Post('recharge')
  recharge(@Body() dto: RechargeDto) {
    return this.proxy.forwardPost('/wallet/recharge', dto);
  }

  @Post('balance')
  balance(@Body() dto: BalanceDto) {
    return this.proxy.forwardPost('/wallet/balance', dto);
  }

  @Post('pay')
  pay(@Body() dto: StartPaymentDto) {
    return this.proxy.forwardPost('/wallet/pay', dto);
  }

  @Post('confirm')
  confirm(@Body() dto: ConfirmPaymentDto) {
    return this.proxy.forwardPost('/wallet/confirm', dto);
  }
}
