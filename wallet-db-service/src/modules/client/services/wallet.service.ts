import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RechargeDto, BalanceDto, StartPaymentDto, ConfirmPaymentDto } from "src/modules/wallet/dto/wallet.dtos";
import { Repository } from "typeorm";
import { PaymentSession } from "../entities/payment-session.entity";
import { WalletTransaction } from "../entities/wallet-transaction.entity";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletTransaction)
    private trxRepo: Repository<WalletTransaction>,
    @InjectRepository(PaymentSession)
    private sessionRepo: Repository<PaymentSession>,
  ) {}

  async recharge(dto: RechargeDto) {
    const trx = this.trxRepo.create({ ...dto, type: 'RECHARGE' });
    await this.trxRepo.save(trx);
    return { code: 'SUCCESS', message: 'Recarga exitosa' };
  }

  async getBalance(dto: BalanceDto) {
    const trx = await this.trxRepo.find({
      where: { document: dto.document, phone: dto.phone },
    });

    const balance = trx.reduce((sum, t) =>
      t.type === 'RECHARGE' ? sum + Number(t.amount) : sum - Number(t.amount), 0);

    return { code: 'SUCCESS', message: 'Saldo consultado', data: { balance } };
  }

  async startPayment(dto: StartPaymentDto) {
    const balanceResp = await this.getBalance(dto);
    if (balanceResp.data.balance < dto.amount) {
      return { code: 'ERROR', message: 'Saldo insuficiente' };
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const session = this.sessionRepo.create({ ...dto, token, isConfirmed: false });
    await this.sessionRepo.save(session);

    // Aquí iría lógica para enviar email
    console.log(`Simulando envío de token ${token} al correo`);

    return { code: 'SUCCESS', message: 'Token enviado', sessionId: session.id };
  }

  async confirmPayment(dto: ConfirmPaymentDto) {
    const session = await this.sessionRepo.findOne({ where: { id: dto.sessionId } });
    if (!session || session.token !== dto.token || session.isConfirmed) {
      return { code: 'ERROR', message: 'Token inválido o sesión caducada' };
    }

    session.isConfirmed = true;
    await this.sessionRepo.save(session);

    const trx = this.trxRepo.create({
      document: session.document,
      phone: session.phone,
      amount: session.amount,
      type: 'PAYMENT',
    });

    await this.trxRepo.save(trx);
    return { code: 'SUCCESS', message: 'Pago confirmado y realizado' };
  }
}
