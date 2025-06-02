import { Controller, Post, Body } from "@nestjs/common";
import { RechargeDto, BalanceDto, StartPaymentDto, ConfirmPaymentDto } from "src/modules/wallet/dto/wallet.dtos";
import { WalletService } from "../services/wallet.service";

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('recharge')
  recharge(@Body() dto: RechargeDto) {
    return this.walletService.recharge(dto);
  }

  @Post('balance')
  getBalance(@Body() dto: BalanceDto) {
    return this.walletService.getBalance(dto);
  }

  @Post('pay')
  startPayment(@Body() dto: StartPaymentDto) {
    return this.walletService.startPayment(dto);
  }

  @Post('confirm')
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.walletService.confirmPayment(dto);
  }
}
